# Amy Grist — PROJECT-NOTES

## Purpose

This repository rebuilds the existing Amy Grist WordPress site as a maintainable static Astro website for Cloudflare Pages. The first delivery should closely reproduce the current public site while removing the WordPress, Salient and WPBakery runtime dependency. Content cleanup and larger design changes come after the replica is stable.

## Governing assumptions

- Static Astro output on Cloudflare Pages.
- No `@astrojs/cloudflare` adapter for the static architecture.
- Cloudflare Pages Functions live in project-root `functions/api/` only when request-time behaviour is required.
- Strict TypeScript, minimal dependencies, committed lockfile, and a pinned supported Node version.
- Current menu-linked pages are the first migration set.
- All exported WordPress material remains archival evidence even when a route is retired.
- Salient/WPBakery shortcodes are interpreted semantically; they are not reproduced as a compatibility layer.
- Existing public URLs are preserved where practical. Changed or retired URLs receive explicit, destination-specific redirects where appropriate.
- The raw WordPress JSON is never treated as the long-term authoring format.
- Blog/editorial content will use schema-validated Astro content collections.
- Unique pages may use `.astro` page files backed by cleaned data/content.
- Products are preserved as a distinct data/content model. Checkout and protected downloads are phase two.
- Newsletter is moving to another service.
- Existing email will be forwarded through Cloudflare Email Routing to Gmail.
- The current homepage is WordPress page ID 7.
- The current blog index is WordPress page ID 191.
- The global Salient footer is global section ID 1225.

## Content precedence

### Confirmed asset requirement — 15 September 2026

The user requires original uploaded images in all cases. WordPress-generated resized images, thumbnails, crops and scaled/optimized derivatives must not be used as build sources. Astro compression, responsive resizing and conversion to WebP are permitted when generated from the original upload. Resolve original filenames from media metadata; report missing originals rather than substituting derivatives. This explicit requirement overrides any earlier wording that merely prefers originals.

Reference screenshots are supplied in `references/Desktop/` (9 PNG files) and `references/Mobile/` (2 PNG files), checked on 15 September 2026. These are visual references, not replacement image assets.

### Source order

1. Current live/public WordPress content and the exported database records.
2. Project-specific migration decisions recorded here and in `ROUTE-INVENTORY.json`.
3. Screenshots supplied during visual verification.
4. Later editorial revisions explicitly requested for the Astro site.

If sources conflict, do not silently reconcile them. Record the discrepancy here.

## Current navigation

### About
- About Me → `/amy/`
- About The Inner Council → `/inner-council/`
- Integration Work → `/integration-work/`

### Offerings

#### Wellbeing
- Inner Child Healing Workshop → `/inner-child/`
- Inner Child Mentoring → `/inner-child-mentoring/`
- Mindset & Wellbeing Coaching → `/one-to-one-coaching/`

#### Training Programs
- Inner Child Practitioner Training → `/become-a-practitioner/`
- Inner Child Reiki Course 1 & 2 → `/inner-child-reiki/`

#### Resources
- Free Meditation Series → `/meditation/`
- Inner Child Card Readings → `/inner-child-card-readings/`
- Inner Child Resources → `/inner-child-resources/`
- Wellbeing Tools & Practices → `/wellbeing-tools-practices/`

### Top level
- Blog → `/blog/`
- Get in Touch → `/get-in-touch/`
- Shop → `/shop/`
  - Meditation Series category

## Migration phases

### Phase 1 — Replica foundation
- Astro foundation and build/deploy scripts
- design tokens and typography
- shared SEO
- header, desktop mega-menu, mobile navigation
- footer
- homepage
- one representative inner page
- visual comparison at 375px, 768px and 1440px

### Phase 2 — Current content
- remaining current menu-linked pages
- blog index and 27 posts
- blog categories/tags as required
- images and downloads
- redirects and 404

### Phase 3 — Interaction
- contact forms
- newsletter service integration/linking
- Cloudflare Email Routing documentation
- any embeds or interactive components

### Phase 4 — Shop
- select commerce/payment/download provider
- migrate 10 meditation products
- protect digital downloads
- preserve product/category URLs or provide explicit redirects
- remove obsolete WooCommerce-only account/basket/checkout routes when replacement behaviour is confirmed

### Phase 5 — Cleanup
- editorial/content cleanup
- retire legacy campaign pages
- performance/accessibility pass
- cutover and rollback documentation

## Known legacy/review material

Published WordPress does not equal current-site scope. Older campaign, utility and service pages remain preserved in the migration source. Examples include `circle-2022`, `masterclass-2022`, `offerings-2024-deep-desire`, MailPoet confirmation, old yoga/design/photography pages and WooCommerce utility routes. Their final status belongs in `ROUTE-INVENTORY.json`.

## Do not repeat previous structural mistakes

- Do not place reusable production components under `src/pages`.
- Do not keep design experiments or backup pages as routable files.
- Do not duplicate business copy between Markdown and Astro templates.
- Do not let individual pages own canonical/robots logic independently.
- Do not accumulate `!important` and page-specific CSS patches when a shared style owns the behaviour.
- Do not copy another project's form addresses, tokens, hostnames or Cloudflare bindings.
- Do not use Astro preview as proof that Pages Functions work.
- Do not claim deployment or email delivery has been verified until it actually has.

## Decisions still open

- Final commerce/payment/download service.
- Newsletter provider.
- Contact-form sending provider and verified sender.
- Whether any legacy pages should remain public.
- Whether current Google-hosted fonts are self-hosted from licensed files or replaced with another delivery method.
- Exact Git/Cloudflare Pages deployment workflow.
