# WordPress Source Exports

These files are the immutable migration source. Keep them outside normal Astro authoring.

Expected source set:

- `wppg_pages.json`
- `wppg_posts.json`
- `wppg_categories.json`
- `wppg_featured_image.json`
- `wppg_media_library.json`
- `wppg_media_meta.json`
- `wppg_menus.json`
- `wppg_navigation.json`
- `wppg_page_and_post_meta.json`
- `wppg_homepage.json`
- `wppg_homepage_postmeta.json`
- `wppg_sliders.json`
- `wppg_slider_meta.json`
- `wppg_slider_locations.json`
- `wppg_global.json`
- `wppg_global_meta.json`
- `wppg_products.json`
- `wppg_product_meta.json`
- `wppg_product_taxonomies.json`
- `wppg_salient_global.json`

## Rules

- Do not hand-edit these exports.
- Convert from them into clean Astro content/data.
- Preserve WordPress IDs during migration for traceability.
- Resolve media IDs to original assets before discarding shortcode syntax.
- Serialized WordPress/Salient values are source evidence, not production configuration.
- Never commit secrets discovered in WordPress options into the Astro repository.
