# Migration Plan

## Source corpus

The preserved WordPress extraction currently includes:

- 35 published pages
- 27 published blog posts
- 10 published products
- 188 media-library records
- 21 navigation records
- 18 slider-location assignments
- page/post metadata
- featured-image mappings
- blog categories/tags
- product metadata and taxonomies
- Nectar slider records and metadata
- Salient global footer and metadata
- Salient Redux/theme configuration
- homepage source and homepage metadata

Database: `typedyvg_wp321`  
Prefix: `wppg_`

## Migration rule

Keep `migration/source/wordpress-json/` as immutable source evidence. Build cleaned Astro content from it. Do not edit the raw exports to make the new site easier to build.

## Work sequence

### 1. Bootstrap
- create Astro project
- static output
- strict TypeScript
- pin Node
- install minimal dependencies
- add Wrangler dev dependency if Pages Functions are used
- add `npm run check`, `npm run build`, Pages runtime preview
- create Cloudflare-compatible `_headers` / `_redirects` placeholders

### 2. Design foundation
- implement `DESIGN-SYSTEM.md`
- acquire original logo assets
- decide font delivery
- build global CSS/reset/typography
- build Button and Divider primitives

### 3. Site chrome
- recreate current centred-menu header
- desktop mega-menu
- accessible mobile navigation below ~1000px
- transparent/white-logo state where appropriate
- scrolling solid-header state
- Instagram link
- recreate global footer section 1225

### 4. Homepage
Source: page ID 7.
- migrate `home` Nectar slider
- reproduce current section ordering
- preserve content and links
- replace WPBakery layout with semantic components
- compare against desktop/mobile reference screenshots

### 5. Representative inner page
Use `/amy/` unless a different route proves more representative.
- reproduce hero/slider
- migrate prose hierarchy
- verify colour sections, spacing, headings, buttons
- use this pass to fix shared component ownership

### 6. Current public pages
Convert the menu-linked routes listed in `PROJECT-NOTES.md`.

### 7. Blog
- transform 27 posts to collection entries
- preserve existing slugs
- preserve category/tag relationships
- resolve featured images
- build `/blog/`
- build article route
- decide which taxonomy archive routes remain public
- preserve useful existing metadata

### 8. Legacy decisions
Work through every `review` or `review-retire` entry in `ROUTE-INVENTORY.json`.
Each receives exactly one outcome:
- migrate
- redirect
- intentional removal

### 9. Forms/newsletter
- choose provider
- establish verified sender/recipient
- implement Pages Function
- Turnstile if required
- test Pages runtime locally and deployed preview
- record provider acceptance separately from inbox delivery

### 10. Shop
Do not recreate WooCommerce infrastructure by default.
- choose payment/download provider
- preserve 10 product records
- preserve pricing and product copy
- preserve product images
- secure actual ZIP/MP3 delivery
- map old product/category URLs
- decide fate of Basket/Checkout/My Account

### 11. Verification
- clean `npm ci`
- `npm run check`
- `npm run build`
- Pages Functions check/runtime preview
- route inventory complete
- no broken internal links/assets
- 375 / 768 / 1440 visual checks
- keyboard navigation
- 404 status
- sitemap/robots/canonical inspection
- representative mobile accessibility/performance checks

## Cutover

Do not change production DNS until:
- preview is accepted
- redirects are tested
- forms are tested
- missing routes are accounted for
- rollback path is documented

Cloudflare Email Routing for the existing address is a separate cutover item from the website deployment.
