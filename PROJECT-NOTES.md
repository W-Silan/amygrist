# Amy Grist — implementation notes

## Foundation delivery, 16 September 2026

The supplied `amy-grist-astro-starter-docs/` is preserved in place, including all handover documents, exports, screenshots and uploads. The parent `WORDPRESS-TO-ASTRO-BUILD-BRIEF.md` governs the implementation. This file records new decisions; it does not replace archival notes.

Implemented: shared typography and colour tokens, desktop dropdown/mega-menu, mobile navigation, transparent and scrolled header states, footer from global section 1225, homepage from page 7, `/amy/` from page 23, central metadata and a real 404 page. Four homepage slides and all three testimonials are retained. Hero playback respects reduced motion and has pause/previous/next controls; testimonials advance manually.

Astro 7.3.2 was the current stable npm release at bootstrap. Node is pinned to 24.19.0. Output is static, with no Cloudflare adapter. Licensed Fontsource Latin WOFF2 fonts are bundled locally: Poppins 300/300 italic/500, Fraunces 400, Josefin Sans 400. Fontsource packages include their font licences. No runtime Google Fonts requests.

`src/data/home.json` and `amy.json` are cleaned, editable copy. Layout ownership stays in Astro components/pages. `scripts/extract-foundation.py` is a one-time extraction record, not a build dependency; rerunning overwrites curated content and working inventory. Raw exports are not read by the production build. `migration/media-originals.json` records attachment IDs, original paths, resolution decisions and checksums. Every imported image is copied byte-for-byte from the resolved original. No thumbnail, `-scaled` or resized derivative is a source. Astro generates WebP sizes from those originals.

## Explicit conflict handling and temporary choices

- The handover architecture sketch suggests `src/pages/blog/[...slug].astro`, but the inventory and user require root-level blog URLs. The inventory wins: future post generation belongs at `src/pages/[slug].astro`, with validation against page slug collisions. All 27 original post URLs remain unchanged in the working inventory and now render through `src/pages/[slug].astro`. The local `/blog/` archive lists and filters all migrated posts.
- Screenshot headers appear partway down full-page captures (a sticky-header capture artefact). Recreated as an ordinary fixed top header with transparent/solid states, not embedded at that position in the document.
- The desktop and mobile homepage screenshots show different active hero/testimonial slides. Retain all exported slides in exported order, compare equivalent frames, and do not treat a captured frame as the only homepage image.
- The WordPress newsletter popup/shortcode is not portable. Mailoctopus is now the selected newsletter provider; local signup forms and delivery are not yet connected. Until the Mailoctopus form/list integration is supplied and tested, signup CTAs must not claim to collect subscriptions.
- Resource images, descriptions and prices are preserved, but no local Add to Basket or checkout is implemented. Resource links temporarily open the existing shop. No commerce provider has been chosen.
- All unbuilt navigation/content destinations temporarily remain absolute links to the current website. This keeps the foundation usable without fake local pages. Before cutover, migrate/localise each according to the inventory. No blanket redirect is installed.
- The exports contain older `sseo_*` metadata alongside newer `_genesis_*` values. The latter matches current visible copy and live page titles; use the newer descriptions and titles for the two foundation pages.
- Preview is intentionally noindex in shared metadata, static headers and robots.txt. Sitemap is empty because no routes are indexable yet. Production indexing must be changed centrally as part of the approved cutover, together with sitemap membership. Never publish this foundation as the complete migration.

## Still open

- Stripe Payment Links are the expected checkout entry point. The protected download architecture, transactional email, tax handling and fate of account/basket/checkout and Pay Me remain open. The Complete Meditation Series pilot and required inputs are mapped in `migration/PRODUCT-PILOT.md`.
- Mailoctopus is selected for the newsletter. The existing signup flow still needs a Mailoctopus form/list target and embed or API integration details before collection is enabled.
- Contact delivery mirrors the working Inner Council REST email-send pattern; keep Amy recipient independent; the sender is temporarily shared by owner request. `/contact/` sends to the fixed `FORM_RECIPIENT=amygrist@gmail.com`, from `forms@innercouncil.org`, with the visitor email as reply-to. Turnstile and a 10-per-minute rate limiter are required. Configure `CLOUDFLARE_EMAIL_API_TOKEN` and `TURNSTILE_SECRET_KEY` as Worker secrets, set `PUBLIC_TURNSTILE_SITE_KEY` at build time, and verify the sender/domain before live delivery.
- Cloudflare Email Routing forwarding details remain a separate future task; no email/DNS changes made.
- Legacy/review route decisions; category/tag archive and pagination scope.
- Final Git/Cloudflare project and publishing workflow. Wrangler name is a local provisional value; no project has been created or deployed.
- User approved adjusting text/button colours for WCAG AA contrast on 16 September 2026. Brand background/accent tokens retained; accessible text/link/button/surface tokens added. White text over soft rose is now dark teal; the training banner rose is slightly darker. Transparent header and hero captions have dark backplates for reliable contrast over photographs. Final audit results belong in `verification/REPORT.md`.
- `/amy/` has no supplied mobile screenshot. Its mobile layout is checked for readability, layout and interactions, extrapolating the provided mobile homepage conventions.
- A WhatsApp floating control appears in the desktop About reference but is absent from the documented global footer. Its intended site-wide scope is unconfirmed; defer adding it pending review of current contact configuration.

## Next work

Review `verification/REPORT.md` and the captured foundation views before expanding. Review `/blog/` and representative desktop/mobile article routes against the supplied references before marking the article migration visually verified. Keep uncertain legacy and commerce routes pending instead of publishing empty placeholders.

## Contact form delivery decision — 20 September 2026

Contact and enquiry forms mirror the working Inner Council REST email-send pattern, but deliver only to `FORM_RECIPIENT=amygrist@gmail.com`. `/contact/` and `functions/api/contact.js` are implemented. Messages use `forms@innercouncil.org` as sender and the visitor email as `Reply-To`. The endpoint validates fields server-side, checks same-origin requests, uses a timing trap and honeypot, requires Turnstile with hostname validation, applies a 10-per-minute Cloudflare rate limit, and returns accessible success/failure messages. Configure `CLOUDFLARE_EMAIL_API_TOKEN` and `TURNSTILE_SECRET_KEY` as Worker secrets and `PUBLIC_TURNSTILE_SITE_KEY` as a build-time variable. Keep Amy verified destination independent from Inner Council; the sender is temporarily shared by owner request; do not activate Email Sending as a troubleshooting step.

## Articles — 1 October 2026

Migrated all 27 published WordPress posts to static Astro pages at their preserved root-level URLs. The shared article layout follows Inner Council’s featured-image hero, category/date/reading-time metadata, key takeaways near the start, readable body and author profile structure. Amy’s layout intentionally omits Inner Council’s Notes and Exercises components. Key Takeaways were extracted from each source post, and source content was cleaned of WPBakery layout shortcodes. The `/blog/` archive lists all articles and filters by category. Original featured uploads are recorded in `migration/article-originals.json`; no WordPress thumbnail, resized derivative or `-scaled` file is used as an image source. `scripts/migrate-articles.py` regenerates article data and asset copies from the preserved exports. A local Astro build generated 41 static pages successfully. Visual desktop/mobile comparison is still pending.

## Design route and exclusions — 1 October 2026

`/design/` is implemented as a private visual reference guide following the Inner Council design page structure and Amy Grist’s established design tokens. WooCommerce `/meditation-series/`, dated campaigns `/masterclass-2022/`, `/circle-2022/`, `/offerings-2024-deep-desire/`, and `/mailpoet-confirmation/` are explicitly excluded by owner request.

## Category archive source data received — 1 October 2026

The owner supplied the SQL export for category terms. All 8 category descriptions and term SEO metadata are now saved in migration/category-archives.json; the original export is preserved in migration/wppg-category-terms-export.json. Keep each original /category/{slug}/ URL. Current export metadata records these terms as indexable. Build archives after higher-priority navigation pages; the /blog/ topic filter does not replace them.

## Navigation pages added — 1 October 2026

/inner-child-resources/ and /wellbeing-tools-practices/ are implemented locally. Original guide PDF attachment 1903 is copied unchanged and linked through a redirect from the WordPress /download/1902/ URL. Newsletter signup remains open pending provider selection. The Wellbeing Tools hero uses original upload 1866, never a WordPress derivative.\n

## Category archives — 1 October 2026

All eight indexable WordPress category archive routes are implemented at their original /category/{slug}/ URLs. Category directory links on /blog/, article card labels and article header labels navigate to these archives. Archive pages filter the migrated static article collection by the preserved WordPress term names.


## Shop: Meditation Series — 1 October 2026

The local /shop/ index currently features the Meditation Series collection only. The WooCommerce category URL /product-category/meditation-series/ is implemented locally and links to /shop/gma_complete_series/. That product path remains unchanged. The older /meditation-series/ WordPress page/category remains excluded per owner instruction. Stripe checkout and protected digital fulfilment are still pending; no purchase flow is activated.


## Checkout direction — 1 October 2026

Stripe Payment Links are the selected checkout pattern. Product purchase buttons link directly to Stripe through “Buy it now”; there will be no cart/basket. Buttons remain inactive until the links and secure digital fulfilment are ready.


## Shop catalog — 1 October 2026

The shop navigation links straight to `/shop/`; no Shop submenu. The existing Shop page opens the Meditation Series collection. `/product-category/meditation-series/` puts the Complete Collection first, then all eight individual audios in two columns on desktop and one column on smaller screens. All nine `/shop/{slug}/` detail routes build locally. Per-product Stripe Payment Links are the planned Buy it now path; no cart, links inactive pending Stripe URLs and protected download fulfilment. See `migration/PRODUCT-PILOT.md` for source conflict and fulfilment notes.


## Feedback form — 1 October 2026

`/feedback/` is restored as a name, email and message form. It submits through the existing protected form Worker and routes feedback to Amy’s configured recipient; this is not a mailing list signup.


## Inner Child Reiki offering — 1 October 2026

`/inner-child-reiki-offering/` is rebuilt from source. Signup links to `/contact/` because the original Fluent Form was not exported. Source date text for 2026 is stale; ask Amy for upcoming dates/current availability. The original WordPress page’s image attachments were unavailable in the supplied upload archive, so the page uses the existing original Reiki hands asset; no WordPress resized derivative was used. A source bullet ends mid-sentence and was omitted.


## Newsletter provider decision — 1 October 2026

Amy will continue offering newsletter signups through Mailoctopus. The WordPress popup/shortcode will not be carried over; signup forms must be connected to Amy’s Mailoctopus audience and tested before claiming a subscription was collected. Integration details (form or embed, target list/audience and any required fields/tags) are still needed.


## Personal Yoga — 1 October 2026

`/personal-yoga/` is restored locally at owner request, without adding it to navigation. Source bio, offering description, student testimonials and Integral Yoga reading recommendation are retained. Its hero uses original upload 110; enquiries point to `/contact/`.


## Newsletter popup visual reference — 1 October 2026

Owner supplied a screenshot of the live Green Popups modal. The visual direction is a stationary centered circular signup panel with a thick rose border, white interior, close control, dimmed teal page overlay, course-cover image, signup headline/copy, name and email fields, rose signup button, newsletter note and Amy Grist URL. Recreate without entrance animation. The existing homepage trigger is `#lepopup-Meditation-Mailgroup-Signup` (“Get Your Free Mini-Course”). The popup itself and its form are not yet implemented in Astro. Mailoctopus is the chosen provider; its form/list integration details are still pending. The original cover-art asset used in the live popup has not yet been matched to a supplied original upload.

## Sacred Space Meditation Course — 1 October 2026

`/sacred-space-meditation-course/` is restored with three original MP3 sessions and their complete transcripts, the original workbook PDF, the original booklet image (media 419), and the source guidance and feedback CTA. It is linked from the Resources submenu, homepage free-course CTA and `/meditation/`. Mailoctopus signup fields/form details remain outstanding; the page is transparent that signup is not connected yet and offers Contact as the interim path. The route is built locally; do not deploy without instruction.

## Commerce route scope — 1 October 2026

The local static catalog is in scope: `/shop/`, `/product-category/meditation-series/` and nine `/shop/{slug}/` Meditation Series product detail pages. Shop remains in the local navigation. Basket, checkout, account, PayMe and purchase-now transaction/account routes are excluded; the header basket icon links to the existing live WordPress basket. Stripe Payment Links and protected fulfilment remain pending. `/product/inner-child-reiki-1-online-course/` and `/guided-meditation/` are excluded by owner decision (1 October 2026).

## Article Markdown conversion — 7 October 2026

The 27 migrated articles now have individual Markdown files under `src/content/articles/`, with validated frontmatter for editorial metadata and the cleaned article body preserved in each file. Astro’s content collection renders these files for article routes, the blog archive and category archives. `src/data/articles.json` remains as the preserved generated migration source, and `scripts/migrate-articles.py` now regenerates both JSON and Markdown outputs.

Article SEO was audited at the same time: all 27 articles have non-empty SEO titles, descriptions between 115 and 160 characters, canonical URLs, Open Graph metadata, article dates/authorship and Article JSON-LD. Archive cards now use separate short, friendly `excerpt` frontmatter written for readers; they no longer reuse the SEO description. Preview remains intentionally `noindex` with an empty sitemap until production cutover is authorized.

## Internal link audit — 7 October 2026

Localized Amy Grist links in the homepage and About copy, including the featured psychologist article, and mapped the former `/inner-child/` links to `/inner-child-therapy/`. The built site audit checked 2,213 local hrefs across 67 pages with no unexpected missing targets. The remaining missing filesystem targets are intentional redirects or excluded live commerce routes (`/basket/`, `/payme/`) and the preserved `/download/1902/` and `/get-in-touch/` redirects.

The navigation allowlist was then corrected to include `/inner-child-resources/` and `/wellbeing-tools-practices/`. Both routes were built locally already; their menu links now resolve locally instead of to the live domain.
