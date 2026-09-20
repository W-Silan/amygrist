# Amy Grist website — recovery log

Updated: 20 September 2026. Read this first after an interruption, then `PROJECT-NOTES.md` and the supplied handover.

## User scope and constraints

Begin rebuilding the WordPress site in `/home/huachuma/astro-site/amygrist` as static Astro for Cloudflare Pages. Closely reproduce existing design/content. Always use original uploaded images, never thumbnails/scaled/generated derivatives as sources. Preserve all supplied sources. First complete shared design, header/navigation/footer, homepage and `/amy/`, compare desktop/mobile before expanding. Keep root-level blog URLs. Routine decisions are authorized. Record open questions and flag material conflicts. Commerce, newsletter and email providers remain undecided. Build/test locally; no deployment or DNS changes. User explicitly requested interruption-recovery logging; update this log at milestones and before stopping.

## Done

- Read parent `WORDPRESS-TO-ASTRO-BUILD-BRIEF.md` and all supplied project/architecture/design/migration documents and route inventory.
- Located sources under `amy-grist-astro-starter-docs/` (not at workspace root). No supplied files edited.
- Inspected desktop home/About and mobile home screenshots, plus exported page IDs 7/23, global footer 1225, slider/media/product metadata. Read live home/About through web tool to cross-check copy and slide ordering.
- Bootstrapped static Astro 7.3.2 (npm latest verified), Node 24.19.0, strict TypeScript, own package and lockfile, local Wrangler preview. No adapter or Pages Functions.
- Self-hosted licensed Fontsource fonts. Shared palette and typography in `src/styles/global.css`.
- Implemented `Header`, `Footer`, `Hero`, `Copy`, `Testimonials`, `BaseLayout`; routes `/`, `/amy/`, 404, empty preview sitemap, noindex robots/headers/meta.
- Extracted cleaned authoring copy to `src/data/home.json` and `amy.json`. One-time extraction script `scripts/extract-foundation.py` MUST NOT be rerun casually: overwrites curated files and working route status.
- Copied 15 original assets with checksum provenance at `migration/media-originals.json`. Astro generates responsive WebP.
- Working `ROUTE-INVENTORY.json` copied from immutable handover; all 27 blog URLs remain root-level. Home and About are marked `foundation-verified`.
- Initial type check: 0 errors, 0 warnings, one inline-script hint; hint now fixed with explicit `is:inline`. Initial build passed, generated responsive WebPs.
- Added README and PROJECT-NOTES with decisions, conflicts, pending integrations and cutover constraints.
- Added `scripts/verify.mjs`: Playwright/system Chrome + axe; screenshots at 375/768/1440 for both pages and menus, overflow, errors, canonical, images, menu Escape, testimonial, 404, local links, media checksums and root post URL checks. Results target `verification/`.

## Exact current state / next actions

The replica foundation is complete and verified. `npm ci`, `npm run check` and `npm run build` pass. Browser checks pass at 375, 768 and 1440 pixels for `/` and `/amy/`, including keyboard-operated menus, Escape handling, slider/testimonial controls, visible images, overflow, canonicals, local links and axe WCAG A/AA rules. The local Pages runtime returns 200 for both pages, a real 404, a 308 trailing-slash redirect, and the intended preview headers. Results and limitations are in `verification/REPORT.md`.

Resume with the remaining current menu pages, using the established components and original-image manifest pattern. Then build the blog collection with root-level post routes. Update this log after each coherent route group and before any interruption. Keep provider-dependent commerce, newsletter and contact behavior deferred.

## Known pending decisions and intentional limitations

See PROJECT-NOTES.md for full details. The user approved accessible colour adjustments and the current audit is clear. No mobile About screenshot was supplied. Newsletter CTA temporarily opens existing live `/meditation/`; no popup replacement. Unbuilt destinations stay on live WordPress. Resource purchase UI is deferred. The WhatsApp floating control shown in the About reference is not implemented because its intended scope/configuration is unconfirmed. Preview deliberately remains noindex with an empty sitemap until complete cutover. No deployment, DNS, email or remote messages were performed.

## Useful commands

```sh
cd /home/huachuma/astro-site/amygrist
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
npm run test:browser
npm run pages:preview -- --ip 127.0.0.1 --port 8788
```

Browser script supports `TEST_URL` for another local origin. Source handover and uploads must remain private archival input; do not copy full uploads to public (includes logs and protected commerce downloads).

### Browser milestone update

First full browser suite completed at all six route/width combinations: no overflow, JS errors, broken visible images, canonical errors, local link failures, or 404 failure; 15 image checksums and 27 root post paths validated. Axe found colour contrast failures (68/40 mobile, 83/52 desktop home/About) and two inline links distinguishable only by colour. User was asked asynchronously whether to preserve colours or adjust for AA; answer pending. Colour changes are deferred. Underlines have now been added to inline content links. Visual inspection caught a CSS specificity bug making the desktop mega-menu visible while marked hidden; fixed hidden selector and added a regression assertion. Workshop hero crop now uses exported top alignment. These changes require a new build/browser run. Product titles and correct live product URLs now restored.

### User decision: contrast

User explicitly answered “Adjust colours for WCAG AA contrast.” This supersedes preserving low-contrast colour combinations. Added text/link/button/ink/surface tokens, dark text on soft rose, darker rose training band, dark header gradient and caption backplates over photographs. Preserve hue/layout/content, but prioritize AA readability. Rerun axe for all viewports and open/scrolled menu states; fix remaining failures. No longer waiting for a palette answer.

### Foundation verification complete

Final browser run passed all six page/viewport combinations and all open-menu audits with zero axe violations. It found no horizontal overflow, browser errors, broken visible images, bad local links or canonical mismatch. The test also verified the 15 selected source files byte-for-byte against the preserved upload archive and confirmed all 27 post routes remain at the domain root. Product titles, prices and live product destinations now match the exports.

Final Cloudflare Pages local-runtime checks passed: `/` and `/amy/` return 200; a missing path returns 404; `/amy` returns a 308 to `/amy/`; headers include `X-Robots-Tag: noindex, nofollow` and `X-Content-Type-Options: nosniff`. A single throttled mobile lab sample (375×812, 4× CPU, 150 ms latency, 1.6 Mbps, cache disabled) measured LCP 708 ms / CLS 0.007 on home and LCP 692 ms / CLS 0.043 on About. These are local diagnostic samples, not field data or Lighthouse scores.

Clean `npm ci` completed with zero vulnerabilities. Final Astro check reports 0 errors, warnings and hints. Final static build produces the homepage, `/amy/`, `404.html` and preview sitemap. The foundation screenshots and JSON results are retained under `verification/`.

### Local review server

On 16 September 2026 the user confirmed they could view the built foundation locally at `http://127.0.0.1:4323/` and `http://127.0.0.1:4323/amy/`. It is being served from `dist/` with `python3 -m http.server 4323 --bind 127.0.0.1 --directory dist`. The other navigation links still lead to the live WordPress site because those routes have not yet been migrated. After an interruption or machine restart, rebuild with `npm run build` and rerun that server command if a local review URL is needed.

### Inner Council and streamlined page workflow

`/inner-council/` is migrated from WordPress page 235 and marked `foundation-verified`. It uses original media IDs 391, 390 and 389; their full uploads and checksums are recorded in the media manifest. Desktop and mobile captures are in `verification/`, and the route passed the existing browser/accessibility checks. The user clarified that `/innercouncil/` was a typing mistake, so no alias or redirect is retained.

The user asked to reduce per-page process after this migration took too long. For subsequent straightforward pages: inspect the source and relevant reference, resolve original assets, implement, run `npm run check` and `npm run build`, then perform one representative desktop and one mobile visual check. Batch the full multi-viewport browser, accessibility, Pages-runtime and performance suites after a useful group of routes or when a change affects shared behavior. Continue to do focused checks immediately for genuinely risky interaction, routing or asset changes.

### Integration Work

`/integration-work/` is migrated from WordPress page 29 and marked `foundation-verified`. The content, section order, hero wording and offering links reproduce the export and desktop reference. The hero uses the original 1500×890 upload `2020/05/amygrist_integrationwork.jpg` (media ID 130); its SHA-256 provenance is recorded in `migration/media-originals.json`, and Astro generates the responsive WebP files.

Added reusable `PageHero.astro` for single-image interior page heroes and a focused `scripts/capture-route.mjs` check for the reduced per-route workflow. `npm run check` reports 0 errors, warnings and hints, and `npm run build` passes. Focused 375 px and 1440 px checks returned 200 with no overflow, broken images or browser errors; captures are `verification/integration-work-375.png` and `verification/integration-work-1440.png`. Unbuilt offering destinations intentionally remain on the live WordPress site through the shared `href()` helper. No redirect was added. The local review server is running at `http://127.0.0.1:4323/integration-work/` and serves the latest `dist/` build.

### Heading font change

At the user's request, the site-wide heading font was changed from Ovo 400 to Fraunces 400. `@fontsource/ovo` was removed and replaced with the self-hosted `@fontsource/fraunces` 5.3.0 Latin font package. The shared `--heading` token applies the change across all routes. Astro check and build pass. Representative homepage checks at 375 px and 1440 px returned 200 with no overflow, broken images or browser errors; review captures are `verification/fraunces-home-375.png` and `verification/fraunces-home-1440.png`.

The user requested capitalized dropdown navigation labels. Dropdown links and group headings now use the navigation system's uppercase treatment on desktop and mobile.

The Offerings dropdown group titles now use a lighter rose (`#76303e`) plus modest letter spacing, separating them visually from the dark menu links on mobile. The colour retains a 4.52:1 contrast ratio against the soft rose menu background, meeting WCAG AA for normal text.

### Complete Meditation Series product pilot

The first product is mapped and implemented at `/shop/gma_complete_series/` using WordPress product 1213. A reusable `src/data/products.ts` record and `src/pages/shop/[slug].astro` route preserve its £35.95 price, product copy, policies, main image and two gallery images. Media IDs 1147 and 1148 were copied from the original 1080×1080 uploads and added to the checksum manifest; ID 1150 was already present. The homepage card now opens the local product route. The protected ZIP remains solely in the private handover archive and is not copied into the build.

The Buy it now button reads `PUBLIC_STRIPE_GMA_COMPLETE_SERIES_URL` at build time. It is disabled while the value is absent, so the preview cannot accidentally take payment. Full Stripe Payment Link, webhook, private R2 download, email, tax and testing requirements are in `migration/PRODUCT-PILOT.md`. Open content conflict: the export claims 8 MP3s but lists durations for only seven; Rebalance appears to be omitted, but its duration must be confirmed. Route status is `pilot-awaiting-stripe-and-fulfilment`.

Astro check and build pass. Focused product checks at 375 px and 1440 px returned 200 with no overflow, broken images or browser errors; captures are `verification/product-complete-series-375.png` and `verification/product-complete-series-1440.png`. A filesystem check confirms no ZIP or MP3 files exist under `src/`, `public/` or `dist/`. The local review server is running at `http://127.0.0.1:4323/shop/gma_complete_series/`.

### Inner Child Healing Workshop

`/inner-child/` is migrated from WordPress page 37 and marked `foundation-verified`. The route preserves the updated workshop copy, learning and healing sections, practitioner introduction, workshop format and inclusions, call to action, three featured participant quotes and all ten detailed participant testimonials in accessible disclosure controls. The shared `PageHero` now supports optional action links, and the reusable `QuoteCarousel` provides the three exported featured quotes.

The hero uses the original 1400×608 `2020/03/background-Image-long2.jpg` upload (media ID 122), recorded in the checksum manifest. No page-specific body images were present in the export. The original Fluent Forms form cannot be migrated until email delivery is selected, so the enquiry button temporarily opens the existing live contact page and the preview states this clearly. No booking or payment behaviour was invented.

Astro check and build pass. Focused 375 px and 1440 px checks returned 200 with no overflow, broken images or browser errors; captures are `verification/inner-child-375.png` and `verification/inner-child-1440.png`. No dedicated desktop or mobile reference screenshot was supplied for this route, so layout follows the exported row colours/order and the verified shared design system. The local review URL is `http://127.0.0.1:4323/inner-child/`.

The detailed testimonial disclosure bodies now use the full available row width with equal left and right indentation. Their fixed 1000 px maximum was removed, and the quotation text is consistently left aligned. After review, the body inset was increased to 48 px on desktop and 36 px on mobile so it begins inside the disclosure marker and header text position.

### Inner Child Mentoring

`/inner-child-mentoring/` is migrated from WordPress page 1027 and marked `foundation-verified`. It preserves the current exported copy, lists, section order, introductory quote and five closing testimonials. The hero uses the original 1400×608 `2020/03/background-Image-long2.jpg` upload (media ID 122), already recorded in the checksum manifest; the export contains no page-specific body images.

The original Fluent Forms enquiry form cannot be completed until the email provider is selected, so the call to action temporarily opens the existing live contact page and explains this in the preview. No dedicated reference screenshot was supplied for this route; its layout follows the exported row treatments and verified shared design system.

Astro check and build pass. Focused 375 px and 1440 px checks returned 200 with no overflow, broken images, browser console errors or page errors. Captures are `verification/inner-child-mentoring-375.png` and `verification/inner-child-mentoring-1440.png`. The local review URL is `http://127.0.0.1:4323/inner-child-mentoring/`.

### Mindset & Wellbeing Coaching

`/one-to-one-coaching/` is migrated from WordPress page 43 and marked `foundation-verified`. It preserves the current exported coaching copy, approach and benefits lists, Agnes Udoh testimonial, three-stage process, introductory call and working-together sections, four FAQs and discovery-call invitation. The implementation was visually compared with the supplied desktop reference; no mobile reference was supplied, so the responsive layout follows the established site conventions.

The hero uses original media ID 138, the 1500×889 `2020/05/amygrist_integrationonetoone.jpg`. The testimonial uses original media ID 1269, the 500×500 transparent `2024/05/Coaching_testimonial_Agnes.png`. Both files are copied byte-for-byte from the upload archive and recorded in `migration/media-originals.json`; Astro generates the responsive WebP output.

The exported Fluent Forms form ID 3 remains provider-dependent. The discovery-call call to action temporarily opens the existing live contact page and states this in the preview. Astro check and build pass. Focused 375 px and 1440 px checks returned 200 with no overflow, broken images, browser console errors or page errors. Captures are `verification/one-to-one-coaching-375.png` and `verification/one-to-one-coaching-1440.png`. The local review URL is `http://127.0.0.1:4323/one-to-one-coaching/`.

### Practitioner Training and Inner Child Reiki

`/become-a-practitioner/` is migrated from WordPress page 238 and marked `foundation-verified`. It preserves the current training pathway, commitments, inclusions, timing, FAQs, three-quote mentoring carousel and eight detailed practitioner testimonial disclosures. This page has no route-specific media. Its desktop layout was compared with the supplied `references/Desktop/practitioner.png`; no mobile screenshot was supplied. The exported Fluent Forms form ID 3 uses the established live contact fallback until an email provider is selected.

`/inner-child-reiki/` is migrated from WordPress page 486 and marked `foundation-verified`. It preserves the current Tibetan Reiki, Reiki support, distance healing, Inner Child Reiki Level 1, time, certification and multi-currency pricing content, plus the full FAQ section. Its hero uses the original 1400×1050 `2021/10/reiki_hands.jpg` upload (media ID 483), copied byte-for-byte and recorded in `migration/media-originals.json`; Astro generates responsive WebP output. The disabled testimonial row from WordPress remains omitted. No reference screenshot was supplied for this route. Fluent Forms ID 3 uses the same provider-dependent contact fallback.

Astro check reports 0 errors, warnings and hints, and the production build passes with both routes. Focused 375 px and 1440 px browser checks for both returned 200 with no overflow, broken images, browser console errors or page errors. Captures are `verification/become-a-practitioner-{375,1440}.png` and `verification/inner-child-reiki-{375,1440}.png`. Local review URLs are `http://127.0.0.1:4323/become-a-practitioner/` and `http://127.0.0.1:4323/inner-child-reiki/`.

### Contact email provider decision — 20 September 2026

The user selected Cloudflare Email Service for website form delivery, with `amygrist@gmail.com` as the fixed recipient. `/get-in-touch/` should therefore be implemented as a functional form rather than layout-only. Send from an address on the onboarded `amygrist.com` domain and set the visitor address as `Reply-To`; do not spoof the visitor address in `From`. Restrict the Cloudflare email binding or endpoint to the fixed destination. Dashboard work still required before live testing: onboard the sender domain, verify `amygrist@gmail.com` as a destination, and configure the Worker/Pages service binding. Add server-side validation, spam protection, rate limiting and an accessible success/error response. No deployment or Cloudflare account changes have been made.

### Inner Child Card Readings

`/inner-child-card-readings/` is migrated from WordPress page 307 and marked `foundation-verified`. It preserves the full current copy, the Inner Child insight and reading sections, Zoom session options, durations and prices (£50 single-card and £70 three-card), related Inner Child pathways, and both booking calls to action. Until the local `/get-in-touch/` form is implemented, booking links continue to use the established live contact fallback; Cloudflare Email Service and the fixed recipient `amygrist@gmail.com` are already selected for that future form.

The hero reuses original media ID 281, `2020/03/amygrist_intimate_setting_inner_child_workshop.jpg`. The body image uses media ID 315’s original 848×848 upload, `2020/07/amy_grist_inner_child_card_reading.jpg`, rather than its later WordPress `-e1595605146437` edited crop or any generated size. Its byte-for-byte checksum provenance is recorded in `migration/media-originals.json`, and Astro generates responsive WebP output. No dedicated desktop or mobile reference screenshot was supplied, so the layout follows the verified offering-page design system.

Astro check reports 0 errors, warnings and hints, and the production build passes with 12 pages. Focused 375 px and 1440 px browser checks returned 200 with no overflow, broken images, browser console errors or page errors. Captures are `verification/inner-child-card-readings-{375,1440}.png`. The local review URL is `http://127.0.0.1:4323/inner-child-card-readings/`.

### Coaching testimonial portrait adjustment

At the user’s request, the Agnes Udoh testimonial portrait on `/one-to-one-coaching/` was first enlarged from 46×46 px to 92×92 px, then doubled again to its final 184×184 px size. The Astro image output dimensions and rendered CSS dimensions were both updated to preserve sharpness. Astro check and build pass; refreshed 375 px and 1440 px focused captures show no overflow, broken images or browser errors. The original 500×500 PNG contains a 234×234 visible portrait surrounded by transparent pixels. The unchanged original is now positioned inside a 184×184 circular CSS viewport, leaving approximately 16–20 px around the visible portrait. The persistent review server was restarted on port 4324 after the final build.
