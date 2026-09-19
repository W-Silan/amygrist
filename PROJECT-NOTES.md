# Amy Grist — implementation notes

## Foundation delivery, 16 September 2026

The supplied `amy-grist-astro-starter-docs/` is preserved in place, including all handover documents, exports, screenshots and uploads. The parent `WORDPRESS-TO-ASTRO-BUILD-BRIEF.md` governs the implementation. This file records new decisions; it does not replace archival notes.

Implemented: shared typography and colour tokens, desktop dropdown/mega-menu, mobile navigation, transparent and scrolled header states, footer from global section 1225, homepage from page 7, `/amy/` from page 23, central metadata and a real 404 page. Four homepage slides and all three testimonials are retained. Hero playback respects reduced motion and has pause/previous/next controls; testimonials advance manually.

Astro 7.3.2 was the current stable npm release at bootstrap. Node is pinned to 24.19.0. Output is static, with no Cloudflare adapter. Licensed Fontsource Latin WOFF2 fonts are bundled locally: Poppins 300/300 italic/500, Fraunces 400, Josefin Sans 400. Fontsource packages include their font licences. No runtime Google Fonts requests.

`src/data/home.json` and `amy.json` are cleaned, editable copy. Layout ownership stays in Astro components/pages. `scripts/extract-foundation.py` is a one-time extraction record, not a build dependency; rerunning overwrites curated content and working inventory. Raw exports are not read by the production build. `migration/media-originals.json` records attachment IDs, original paths, resolution decisions and checksums. Every imported image is copied byte-for-byte from the resolved original. No thumbnail, `-scaled` or resized derivative is a source. Astro generates WebP sizes from those originals.

## Explicit conflict handling and temporary choices

- The handover architecture sketch suggests `src/pages/blog/[...slug].astro`, but the inventory and user require root-level blog URLs. The inventory wins: future post generation belongs at `src/pages/[slug].astro`, with validation against page slug collisions. All 27 original post URLs remain unchanged in the working inventory. Posts are not yet built.
- Screenshot headers appear partway down full-page captures (a sticky-header capture artefact). Recreated as an ordinary fixed top header with transparent/solid states, not embedded at that position in the document.
- The desktop and mobile homepage screenshots show different active hero/testimonial slides. Retain all exported slides in exported order, compare equivalent frames, and do not treat a captured frame as the only homepage image.
- Newsletter popup syntax `#lepopup-Meditation-Mailgroup-Signup` cannot function without WordPress. The visible CTA temporarily links to the existing live `/meditation/` page. No new signup collection, delivery or success claim is implemented.
- Resource images, descriptions and prices are preserved, but no local Add to Basket or checkout is implemented. Resource links temporarily open the existing shop. No commerce provider has been chosen.
- All unbuilt navigation/content destinations temporarily remain absolute links to the current website. This keeps the foundation usable without fake local pages. Before cutover, migrate/localise each according to the inventory. No blanket redirect is installed.
- The exports contain older `sseo_*` metadata alongside newer `_genesis_*` values. The latter matches current visible copy and live page titles; use the newer descriptions and titles for the two foundation pages.
- Preview is intentionally noindex in shared metadata, static headers and robots.txt. Sitemap is empty because no routes are indexable yet. Production indexing must be changed centrally as part of the approved cutover, together with sitemap membership. Never publish this foundation as the complete migration.

## Still open

- Stripe Payment Links are the expected checkout entry point. The protected download architecture, transactional email, tax handling and fate of account/basket/checkout and Pay Me remain open. The Complete Meditation Series pilot and required inputs are mapped in `migration/PRODUCT-PILOT.md`.
- Newsletter provider and migration of the existing signup flow.
- Contact email provider, verified sender, recipient, Turnstile decision and delivery tests. No Pages Functions are implemented yet.
- Cloudflare Email Routing forwarding details remain a separate future task; no email/DNS changes made.
- Legacy/review route decisions; category/tag archive and pagination scope.
- Final Git/Cloudflare project and publishing workflow. Wrangler name is a local provisional value; no project has been created or deployed.
- User approved adjusting text/button colours for WCAG AA contrast on 16 September 2026. Brand background/accent tokens retained; accessible text/link/button/surface tokens added. White text over soft rose is now dark teal; the training banner rose is slightly darker. Transparent header and hero captions have dark backplates for reliable contrast over photographs. Final audit results belong in `verification/REPORT.md`.
- `/amy/` has no supplied mobile screenshot. Its mobile layout is checked for readability, layout and interactions, extrapolating the provided mobile homepage conventions.
- A WhatsApp floating control appears in the desktop About reference but is absent from the documented global footer. Its intended site-wide scope is unconfirmed; defer adding it pending review of current contact configuration.

## Next work

Review `verification/REPORT.md` and the captured foundation views before expanding. Continue current menu pages, then implement the blog collection and root-level post routes. Keep uncertain legacy and commerce routes pending instead of publishing empty placeholders.
