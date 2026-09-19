# Astro Architecture

## Runtime target

- Astro: current stable release at project start.
- Output: `static`.
- Hosting: Cloudflare Pages.
- Pages Functions: project-root `functions/api/`.
- Node: pin one supported version in `.nvmrc` and/or `package.json` engines.
- Package manager: npm with committed `package-lock.json`.
- TypeScript: strict.

## Proposed repository

```text
/
├─ astro.config.mjs
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ wrangler.toml
├─ .nvmrc
├─ PROJECT-NOTES.md
├─ ROUTE-INVENTORY.json
├─ MIGRATION-PLAN.md
├─ DESIGN-SYSTEM.md
├─ functions/
│  └─ api/
│     └─ contact.ts             # when form provider is chosen
├─ migration/
│  └─ source/
│     └─ wordpress-json/        # archival exports; not an authoring source
├─ public/
│  ├─ _headers
│  ├─ _redirects
│  ├─ favicon.*
│  └─ downloads/                # unchanged public files only where appropriate
└─ src/
   ├─ assets/
   │  ├─ images/
   │  └─ fonts/
   ├─ components/
   │  ├─ global/
   │  │  ├─ Header.astro
   │  │  ├─ DesktopNav.astro
   │  │  ├─ MobileNav.astro
   │  │  ├─ Footer.astro
   │  │  └─ SeoHead.astro
   │  ├─ sections/
   │  │  ├─ HeroSlider.astro
   │  │  ├─ ContentSection.astro
   │  │  ├─ QuoteSection.astro
   │  │  ├─ CallToAction.astro
   │  │  └─ ResourceCards.astro
   │  ├─ blog/
   │  │  ├─ BlogCard.astro
   │  │  ├─ BlogMeta.astro
   │  │  └─ CategoryNav.astro
   │  └─ ui/
   │     ├─ Button.astro
   │     ├─ Divider.astro
   │     └─ Icon.astro
   ├─ content/
   │  ├─ blog/
   │  ├─ services/              # use only if service pages prove suitably repetitive
   │  └─ products/              # phase two
   ├─ data/
   │  ├─ navigation.ts
   │  ├─ site.ts
   │  └─ redirects.ts
   ├─ layouts/
   │  ├─ BaseLayout.astro
   │  ├─ PageLayout.astro
   │  └─ BlogPostLayout.astro
   ├─ pages/
   │  ├─ index.astro
   │  ├─ blog/
   │  │  ├─ index.astro
   │  │  └─ [...slug].astro
   │  ├─ 404.astro
   │  └─ ...current unique routes
   └─ styles/
      ├─ tokens.css
      ├─ global.css
      └─ typography.css
```

## Content ownership

### Shared configuration
`src/data/site.ts`
- production origin
- site title/name
- social accounts
- contact/public identity fields
- default SEO
- global image defaults

`src/data/navigation.ts`
- one navigation tree for desktop/mobile
- explicit mega-menu grouping
- no duplicated hard-coded menu structures

### Blog
Use a loader-based Astro content collection with schema validation. Preserve:
- title
- slug
- publish/modified dates where useful
- excerpt/description
- categories
- tags
- featured image
- canonical/SEO overrides when present
- source WordPress ID for traceability

### Unique pages
Use `.astro` route files plus imported clean content/data when the layout is genuinely bespoke. Do not force all WPBakery layouts into one giant schema.

### Products
Preserve data separately now. Build product routes only after the replacement commerce/download architecture is selected.

## WordPress conversion policy

Map intent, not plugin syntax.

| WordPress/Salient | Astro |
| --- | --- |
| `vc_row` | semantic section / layout wrapper |
| `vc_column` | grid/flex column |
| `vc_column_text` | clean HTML/Markdown content |
| `vc_custom_heading` | semantic heading component/styles |
| `divider` | spacing or divider component |
| `nectar_btn` | shared Button component |
| `nectar_slider` | HeroSlider fed from migrated slide data |
| Salient global section | shared component (footer) |
| WordPress menu | `navigation.ts` |
| Featured image ID | resolved original asset |
| generated WP image crops | regenerate responsively in Astro |

## Images

- Always use the original uploaded image as the source, as explicitly required by the user on 15 September 2026. Do not use WordPress-generated thumbnails, resized crops, `-scaled` versions or plugin-generated optimized copies as source images.
- Resolve originals using attachment metadata, including `original_image` when present, and the supplied uploads. Do not assume `_wp_attached_file` always identifies the original: it may point to a WordPress-scaled derivative. Preserve a mapping from media ID to original upload path.
- Astro may generate responsive sizes, compression and WebP output from those originals. Reproduce the displayed crop through layout/image settings while retaining the original source.
- If an original is missing or ambiguous, record the affected asset and resolve it before using that image; do not silently substitute a derivative. Preserve the archival uploads unchanged.
- Put optimizable images in `src/assets/images`.
- Use Astro `Image`/`Picture` and meaningful `sizes`.
- Preserve focal crop behaviour at mobile/tablet/desktop.
- Do not lazy-load the principal above-the-fold image.
- `public/` is for unchanged files, not the default image folder.

## Browser JavaScript

Default to static HTML. Use small Astro-processed scripts for:
- mobile navigation
- accessible dropdown/mega-menu behaviour
- hero slider only if motion/rotation is retained
- accordions
- form state

Avoid framework islands unless interaction complexity actually requires them.

## SEO ownership

`BaseLayout`/`SeoHead` owns:
- `<title>`
- description
- canonical
- robots
- Open Graph/Twitter metadata
- language
- structured data hooks

No page should emit a second independent robots/canonical implementation.

Set Astro `site` to `https://amygrist.com`.

## Required scripts

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro build",
    "preview": "astro preview",
    "pages:preview": "wrangler pages dev dist"
  }
}
```

## Acceptance gate before scaling pages

Do not bulk-convert the site until these are complete and visually compared:
1. global tokens/typography
2. header + mega-menu + mobile nav
3. footer
4. homepage
5. one representative inner page
6. responsive checks at 375 / 768 / 1440px
