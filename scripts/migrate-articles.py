#!/usr/bin/env python3
"""Generate clean Astro article data/assets from the preserved WordPress exports."""
from __future__ import annotations

import hashlib
import html
import json
import re
import shutil
from datetime import datetime
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]
EXPORTS = ROOT / "amy-grist-astro-starter-docs" / "exports"
UPLOADS = ROOT / "amy-grist-astro-starter-docs" / "uploads"
ARTICLE_ASSETS = ROOT / "src" / "assets" / "articles"
ARTICLE_CONTENT = ROOT / "src" / "content" / "articles"
DATA_PATH = ROOT / "src" / "data" / "articles.json"
MANIFEST_PATH = ROOT / "migration" / "article-originals.json"


def table(name: str) -> list[dict]:
    return json.loads((EXPORTS / name).read_text(encoding="utf-8"))[2]["data"]


def metadata_map(rows: list[dict], id_key: str) -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {}
    for row in rows:
        result.setdefault(row[id_key], {})[row["meta_key"]] = row["meta_value"]
    return result


def original_upload(attachment_id: str, media_meta: dict[str, dict[str, str]]) -> tuple[Path, str]:
    metadata = media_meta.get(attachment_id, {})
    relative = metadata.get("_wp_attached_file")
    if not relative:
        raise ValueError(f"Attachment {attachment_id} has no original upload path")
    candidate = UPLOADS / relative
    # WordPress may replace very large uploads with a -scaled file. The export
    # includes the original beside it; choose that upload when available.
    if candidate.stem.endswith("-scaled"):
        unscaled = candidate.with_name(candidate.stem[:-7] + candidate.suffix)
        if unscaled.is_file():
            candidate = unscaled
        else:
            raise ValueError(f"Original upload missing for scaled attachment {attachment_id}: {relative}")
    if not candidate.is_file():
        raise ValueError(f"Original upload missing for attachment {attachment_id}: {candidate}")
    return candidate, candidate.relative_to(UPLOADS).as_posix()


def format_date(value: str) -> tuple[str, str]:
    parsed = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
    return parsed.isoformat(timespec="seconds") + "+00:00", parsed.strftime("%-d %B %Y")


def convert_button(match: re.Match[str]) -> str:
    shortcode = match.group(0)
    attrs = dict(re.findall(r'([A-Za-z_]+)="([^"]*)"', shortcode))
    label = html.escape(attrs.get("text") or attrs.get("link_text") or "Find out more")
    href = html.escape(attrs.get("url") or "", quote=True)
    if not href:
        return ""
    return f'<p class="article-inline-cta"><a href="{href}">{label}</a></p>'


def clean_fragment(value: str) -> str:
    value = re.sub(r"<!--.*?-->", "", value, flags=re.S)
    value = re.sub(r"<(script|style)\b[^>]*>.*?</\1\s*>", "", value, flags=re.I | re.S)
    value = re.sub(r'\sstyle="[^"]*"', "", value, flags=re.I)
    value = re.sub(r'\saria-level="[^"]*"', "", value, flags=re.I)
    value = re.sub(r'\sclass="(?:wpb_[^"]*|align[^"]*)"', "", value, flags=re.I)
    value = re.sub(r'\s(?:data-[\w-]+|id)="[^"]*"', "", value, flags=re.I)
    value = re.sub(r"\s+", " ", value)
    value = re.sub(r">\s+<", "><", value)
    return value.strip()


def localize_internal_links(value: str) -> str:
    def replace(match: re.Match[str]) -> str:
        raw = html.unescape(match.group(2))
        parsed = urlsplit(raw)
        if parsed.hostname and parsed.hostname.lower() in {"amygrist.com", "www.amygrist.com"}:
            raw = urlunsplit(("", "", parsed.path or "/", parsed.query, parsed.fragment))
            raw = html.escape(raw, quote=True)
        return f'{match.group(1)}="{raw}"'
    return re.sub(r'\b(href)="([^"]+)"', replace, value, flags=re.I)


def article_body(source: str) -> tuple[str, list[str]]:
    takeaway_pattern = re.compile(
        r"<h[2-6][^>]*>\s*Key Takeaways\s*</h[2-6]>(?:\s|\[[^\]]+\])*<ul\b[^>]*>(.*?)</ul>",
        re.I | re.S,
    )
    match = takeaway_pattern.search(source)
    if not match:
        raise ValueError("Published article does not contain a Key Takeaways list")
    items = [
        clean_fragment(item)
        for item in re.findall(r"<li\b[^>]*>(.*?)</li>", match.group(1), flags=re.I | re.S)
    ]
    if not items:
        raise ValueError("Key Takeaways heading has no list items")
    source = source[:match.start()] + source[match.end():]
    source = re.sub(r"\[nectar_(?:btn|cta)\b[^\]]*\]", convert_button, source, flags=re.I)
    source = re.sub(r"\[(?:/?vc_[^\]]*|divider[^\]]*)\]", "", source, flags=re.I)
    # Discard theme-only control shortcodes while retaining their surrounding copy.
    source = re.sub(r"\[[^\]]+\]", "", source)
    body = clean_fragment(source)
    body = localize_internal_links(body)
    return body, items


def words(html_content: str) -> int:
    text = re.sub(r"<[^>]+>", " ", html_content)
    text = html.unescape(text)
    return len(re.findall(r"\b[\w’'-]+\b", text))


def excerpt(html_content: str) -> str:
    match = re.search(r"<p(?:\s[^>]*)?>(.*?)</p>", html_content, flags=re.I | re.S)
    value = html.unescape(re.sub(r"<[^>]+>", "", match.group(1) if match else ""))
    value = re.sub(r"\s+", " ", value).strip()
    return value if len(value) <= 220 else value[:217].rsplit(" ", 1)[0] + "…"


def main() -> None:
    posts = table("wppg_posts.json")
    post_meta = metadata_map(table("wppg_page_and_post_meta.json"), "post_id")
    media_meta = metadata_map(table("wppg_media_meta.json"), "attachment_id")
    taxonomy = table("wppg_categories.json")
    route_inventory = json.loads((ROOT / "ROUTE-INVENTORY.json").read_text(encoding="utf-8"))
    inventory_posts = {
        item["slug"]: item
        for item in route_inventory["entries"]
        if item.get("sourceType") == "post" and item.get("status") == "blog-migrate"
    }
    categories: dict[str, dict[str, list[str]]] = {}
    for item in taxonomy:
        if item.get("taxonomy") not in {"category", "post_tag"}:
            continue
        categories.setdefault(item["post_id"], {"categories": [], "tags": []})
        key = "categories" if item["taxonomy"] == "category" else "tags"
        label = html.unescape(item["term_name"])
        if label not in categories[item["post_id"]][key]:
            categories[item["post_id"]][key].append(label)

    ARTICLE_ASSETS.mkdir(parents=True, exist_ok=True)
    ARTICLE_CONTENT.mkdir(parents=True, exist_ok=True)
    output = []
    manifest = []
    for post in posts:
        if post.get("post_status") != "publish":
            continue
        slug = post["slug"]
        route = inventory_posts.get(slug)
        if not route:
            raise ValueError(f"No blog-migrate route inventory entry for {slug}")
        thumb_id = post_meta.get(post["ID"], {}).get("_thumbnail_id")
        if not thumb_id:
            raise ValueError(f"Missing featured image ID for {slug}")
        source_image, source_relative = original_upload(thumb_id, media_meta)
        asset_name = f"{slug}{source_image.suffix.lower()}"
        target_image = ARTICLE_ASSETS / asset_name
        shutil.copy2(source_image, target_image)
        image_hash = hashlib.sha256(target_image.read_bytes()).hexdigest()

        body, takeaways = article_body(post["post_content"])
        metadata = post_meta.get(post["ID"], {})
        title = html.unescape(post["post_title"])
        seo_title = html.unescape(metadata.get("_genesis_title") or title)
        description = html.unescape(metadata.get("_genesis_description") or post.get("post_excerpt") or "")
        published, display_date = format_date(post["post_date"])
        modified, _ = format_date(post["post_modified"])
        media_title = html.unescape(media_meta.get(thumb_id, {}).get("_wp_attachment_image_alt", "")).strip()
        if not media_title:
            media_title = source_image.stem.replace("_", " ").replace("-", " ")
        reading_minutes = max(1, round(words(body) / 200 + 0.5))

        output.append({
            "id": post["ID"],
            "title": title,
            "slug": slug,
            "path": f"/{slug}/",
            "datePublished": published,
            "dateModified": modified,
            "displayDate": display_date,
            "author": "Amy Grist",
            "readingTime": f"{reading_minutes} min read",
            "featuredImage": asset_name,
            "featuredImageAlt": media_title,
            "categories": categories.get(post["ID"], {}).get("categories", []),
            "tags": categories.get(post["ID"], {}).get("tags", []),
            "keyTakeaways": takeaways,
            "bodyHtml": body,
            "seo": {
                "title": seo_title,
                "description": description,
            },
        })
        def frontmatter_value(value: object) -> str:
            return json.dumps(value, ensure_ascii=False)

        existing_article = ARTICLE_CONTENT / f"{slug}.md"
        existing_match = re.search(r"^excerpt:\s*(.+)$", existing_article.read_text(encoding="utf-8"), flags=re.M) if existing_article.is_file() else None
        card_excerpt = json.loads(existing_match.group(1)) if existing_match else excerpt(body)
        frontmatter = "\n".join([
            "---",
            f"id: {frontmatter_value(post['ID'])}",
            f"title: {frontmatter_value(title)}",
            f"slug: {frontmatter_value(slug)}",
            f"path: {frontmatter_value(f'/{slug}/')}",
            f"datePublished: {frontmatter_value(published)}",
            f"dateModified: {frontmatter_value(modified)}",
            f"displayDate: {frontmatter_value(display_date)}",
            f"author: {frontmatter_value('Amy Grist')}",
            f"readingTime: {frontmatter_value(f'{reading_minutes} min read')}",
            f"featuredImage: {frontmatter_value(asset_name)}",
            f"featuredImageAlt: {frontmatter_value(media_title)}",
            f"categories: {frontmatter_value(categories.get(post['ID'], {}).get('categories', []))}",
            f"tags: {frontmatter_value(categories.get(post['ID'], {}).get('tags', []))}",
            f"keyTakeaways: {frontmatter_value(takeaways)}",
            f"excerpt: {frontmatter_value(card_excerpt)}",
            f"seoTitle: {frontmatter_value(seo_title)}",
            f"seoDescription: {frontmatter_value(description)}",
            "---",
            "",
        ])
        (ARTICLE_CONTENT / f"{slug}.md").write_text(frontmatter + body + "\n", encoding="utf-8")
        manifest.append({
            "postId": post["ID"],
            "slug": slug,
            "attachmentId": thumb_id,
            "source": source_relative,
            "asset": f"src/assets/articles/{asset_name}",
            "sha256": image_hash,
            "resolution": "Resolved to uploaded original; WordPress generated/scaled derivatives are not used as sources.",
        })
        route["migrationStatus"] = "implemented"
        route["notes"] = "Migrated to the Amy article layout with source key takeaways, taxonomy, SEO metadata and original featured image."

    if len(output) != len(inventory_posts):
        raise ValueError(f"Expected {len(inventory_posts)} published routes, generated {len(output)}")
    DATA_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + chr(10), encoding="utf-8")
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + chr(10), encoding="utf-8")
    (ROOT / "ROUTE-INVENTORY.json").write_text(json.dumps(route_inventory, ensure_ascii=False, indent=2) + chr(10), encoding="utf-8")
    print(f"Generated {len(output)} articles and copied {len(manifest)} original featured uploads.")


if __name__ == "__main__":
    main()
