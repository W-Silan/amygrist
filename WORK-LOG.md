# Amy Grist website — recovery log

## Current recovery checkpoint — 1 October 2026

Recovered the project context in a replacement conversation after the prior conversation broke. The owner confirmed Amy Grist is the intended project. Working directory: `/mnt/2A88CB9088CB5949/astro-site/amygrist`. Existing tracked edits and untracked migration files are retained; do not reset to the older Git commit. The historical sections below describe earlier stages and may be superseded by later entries.

Current local implementation builds 67 pages, including 27 root-level articles, eight category archives, the main offering/resource pages, the free Sacred Space course, and the static Meditation Series catalog (nine product details). Latest preceding change renamed `/inner-child/` to `/inner-child-therapy/` with permanent redirects. Recent design/link/hero refinements are retained.

Mailoctopus is selected; newsletter popup/form integration remains pending. Stripe Payment Links are selected; payment URLs and protected fulfilment remain pending. Transaction/account routes remain excluded; static shop/catalog routes are in scope. The Reiki online product decision and final visual/launch checks remain open. Contact/feedback code and Worker configuration exist; this recovery did not verify live email delivery. Current deployment configuration is `wrangler.jsonc` with `src/worker.js`; older foundation-only Pages instructions are historical.

Recovery validation: `npm run check` passes with zero errors, warnings or hints; `npm run build` passes with 67 pages. Removed obsolete Shop submenu link markup that caused a TypeScript error, consistent with the direct Shop navigation decision. Added explicit `is:inline` to article JSON-LD to clear the Astro hint. Browser/visual and remote integration tests were not rerun. No deployment or DNS changes performed.

Continue from this checkpoint and the latest dated entries, `PROJECT-NOTES.md`, and `ROUTE-INVENTORY.json`. The broken conversation itself has not been recovered; context comes from preserved local records.


Updated: 30 September 2026. Read this first after an interruption, then `PROJECT-NOTES.md` and the supplied handover.

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

### Hero navigation gradient adjustment

At the user’s request, the pre-scroll header shading was softened. The former black gradient (`#000b` to `#0008` through 80% of the header) was replaced with a progressively fading brand-teal overlay at 62%, 38% and 14% opacity before reaching transparent. A subtle text shadow supports white navigation legibility over lighter hero areas and is removed for the solid, open-menu and scrolled header states. Astro check and build pass; focused homepage and coaching-route checks at 375 px and 1440 px show no overflow, broken images or browser errors. The dropdown panels explicitly remove the inherited shadow so their dark text stays clean on the soft-rose background. The persistent port 4324 preview was restarted with the new build.

### Contact navigation label

The main navigation label `Get in Touch` was shortened to `Contact` at the user’s request. The destination remains `/get-in-touch/` to preserve the existing route. Astro check and build pass, and the persistent port 4324 preview was restarted.


### Current-state audit - 30 September 2026

Repository HEAD before this audit was `416a3f1 Rename contact navigation label`. The shared foundation and ten current/core routes are marked `foundation-verified`: home, About, Inner Council, Integration Work, Inner Child Healing Workshop, Inner Child Mentoring, One-to-One Coaching, Practitioner Training, Inner Child Reiki and Inner Child Card Readings. The Complete Meditation Series product pilot also builds at `/shop/gma_complete_series/` and remains `pilot-awaiting-stripe-and-fulfilment`.

Six current-menu routes remain unstarted: `/blog/`, `/get-in-touch/`, `/inner-child-resources/`, `/meditation/`, `/shop/` and `/wellbeing-tools-practices/`. All 27 inventoried blog posts remain unstarted and must retain their root-level URLs. The remaining commerce routes/products are deferred pending Stripe, fulfilment, private-download and tax decisions.

The contact provider decision is recorded but not implemented: completed offering CTAs still use the live WordPress `/get-in-touch/` fallback, and several page notes still say the email provider is unselected. Build the local contact route next, using Cloudflare email delivery to the fixed recipient `amygrist@gmail.com`, then update those temporary notes/links.

Current verification on 30 September: `npm run check` passes with 0 errors, warnings and hints; `npm run build` passes and generates 12 HTML pages plus the sitemap. No local preview process was found during the audit. The only pre-existing uncommitted files are `package.json` and `package-lock.json`, changing Wrangler from pinned `4.132.0` to `^4.143.0`; this audit did not accept, revert or commit that dependency update.


### Contact route and Cloudflare email endpoint - 30 September 2026

At the user’s request, the new canonical contact route is `/contact/` rather than `/get-in-touch/`. WordPress page 853 is migrated and marked `foundation-verified`; the former production URL is recorded in `redirectFrom` and returns a 301 through `public/_redirects`. The header, About-page link and all completed offering/card-reading CTAs now use the local `/contact/` route.

The page reproduces the exported “Contact me” hero, contact form and confidentiality disclosure using the established design system. Its hero uses media ID 972’s original 2000×900 `2024/02/amygrist_gallery_background_001.jpg`; the original was copied byte-for-byte, recorded in the checksum manifest and processed responsively by Astro. No route-specific reference screenshot was supplied.

The form collects name, email, optional phone, enquiry type, message and explicit response consent. Its initial implementation used a direct Email binding; the later “Contact forms aligned with Inner Council” entry below records the current Cloudflare Email Sending API setup, `FORM_RECIPIENT`, required Turnstile, and rate limiter. No real email or dashboard change was made.

Astro check reports 0 errors, warnings and hints; the production build passes with 13 HTML pages. The Pages Function compiles under pinned Wrangler 4.145.0, and `npm audit` reports zero vulnerabilities. The local Pages runtime returned 200 for `/contact/`, a canonical of `https://amygrist.com/contact/`, 301 from `/get-in-touch/`, 405 for GET on the API, 400 for invalid input and a non-delivery success response for the honeypot. Focused 375px and 1440px checks found no overflow, broken images or browser errors, and both viewports returned zero axe WCAG A/AA/2.1 AA violations. Captures are `verification/contact-{375,1440}.png`.


### Contact forms aligned with Inner Council — 30 September 2026

The user confirmed that Amy’s forms should use the Inner Council setup with `FORM_RECIPIENT=amygrist@gmail.com`. Updated the Contact Pages Function from the direct Email binding to Cloudflare Email Sending API, using `forms@amygrist.com` as sender and the visitor address as `Reply-To`. Wrangler now defines `FORM_RECIPIENT`, account ID, allowed Turnstile hostnames and a 10-submissions-per-minute rate limit. Server-side Turnstile validation is required and checks the returned hostname. The Contact page disables submission in builds without `PUBLIC_TURNSTILE_SITE_KEY` and displays a configuration note.

The API token and Turnstile secret must be added as Worker secrets; the public Turnstile site key must be supplied at build time. Sender-domain onboarding and live email delivery remain pending. No D1 submission log/Control Room integration was added because Amy’s project has no such system. No message was sent.


### Contact delivery configuration correction — 30 September 2026

The user clarified Amy’s contact setup must remain independent from Inner Council. Amy’s Worker recipient is `amygrist@gmail.com`; the contact handler sender is `forms@amygrist.com`. No Inner Council sender or recipient should be used. The Cloudflare dashboard screenshot confirms the Amy account ID, Amy recipient, Turnstile settings and encrypted email API token secret are present. Local handler test with external calls mocked confirms the form payload uses Amy’s sender and recipient; `npm run build` passes. No live email was sent. Deployed the Amy-only sender configuration to `amy-grist.typeface.workers.dev` as version `0169eec1-a9f1-4917-844e-c2a30711cc1e`; Cloudflare confirmed `FORM_RECIPIENT=amygrist@gmail.com` and the Turnstile bindings. Live test after deployment: Cloudflare Worker tail logged one API delivery rejection (code 10204) at 22:38:09 UTC, followed by a POST at 22:38:12 UTC with no delivery-failure log. Browser/inbox outcome is awaiting user confirmation.


### Turnstile retry fix — 30 September 2026

After deploying the Amy-only sender, live logs showed the first form request passed Turnstile and reached email delivery (provider code 10204). A retry then failed spam validation because the page reset the single-use Turnstile token only after success. Moved `turnstile.reset()` to the submit handler’s `finally` block so it runs after success and failure. Build passed and the fix was deployed to `amy-grist.typeface.workers.dev` as version `5759af56-0d5c-47ca-8b44-a228146dbec0`. Sender and recipient remain `forms@amygrist.com` and `amygrist@gmail.com`. A fresh live form test is pending.

### Post-token-update form attempt — 30 September 2026

The user reports updating the API token and receiving the same browser error. The previous captured request passed Turnstile and reached email delivery, which returned code 10000; the next attempted retry was blocked by the consumed Turnstile token. The contact page now resets Turnstile in `finally`, and version `5759af56-0d5c-47ca-8b44-a228146dbec0` is deployed. A fresh tail is connected, but the latest token-update submission occurred before reconnection, so its provider response is not captured. Do not change Inner Council configuration.


### Contact form reduced to name and email — 30 September 2026

At the user’s request, `/contact/` now collects only name and email. The form retains Turnstile, rate limiting, timing validation and the honeypot. The endpoint sends Amy a fixed “please contact me” notification and uses the submitted email as `Reply-To`; it still sends from `forms@amygrist.com` to `amygrist@gmail.com`. The handler accepts the old first/last-name payload during cache transition. Astro build and a mocked handler test passed. Deployed to `amy-grist.typeface.workers.dev`, version `37229ec1-954e-4cdb-8d16-3ef1155cd662`. Email delivery remains unresolved separately from this UI change.


### Aligning diagnostics with the working form pattern — 1 October 2026

The user clarified that Inner Council sends successfully although its domain is absent from Email Routing, so the earlier suggestion to onboard amygrist.com under Email Routing was not established and must not be repeated as the fix. Local handlers for Inner Council, Threefold and Safe Pastures use the same Cloudflare REST send endpoint; the Amy handler already uses that endpoint and keeps its own sender (`forms@amygrist.com`) and destination (`amygrist@gmail.com`). Updated Amy's provider-error logging to retain Cloudflare's bounded error message alongside the numeric code, without logging form contents. Build passed and the diagnostic was deployed to `amy-grist.typeface.workers.dev` as version `beac0b2d-4cba-41e0-9c35-64099c35fe9f`. No Email Sending activation, DNS changes, or changes to another site's configuration.

### Persisting observability in Wrangler — 1 October 2026

The user noticed that Worker logs stopped updating after deploy. Confirmed Amy's `wrangler.jsonc` lacked an observability setting; the previous diagnostic deployment from this config could reset the dashboard-only toggle. Added explicit persistent invocation/custom logs in Wrangler so later `npm run deploy` deployments retain logging. Logs only; traces remain off. Deploy and confirm the configuration, then inspect the next form event.

### Requested redeploy — 1 October 2026

Ran `npm run deploy` after persisting observability in `wrangler.jsonc`. Astro built 13 pages successfully and Cloudflare deployed `amy-grist.typeface.workers.dev` as Worker version `3b668545-352c-47ed-bd82-81c9e8e61c9c`. The live email error remains to be confirmed by a new form submission and Worker log entry.

### Provider authentication error identified — 1 October 2026

The user supplied a 502 invocation record from Amy Worker version `658814ad-3ab1-43d8-baf6-b1d360a284f6`. The matching live tail at 09:02:45 local time logged `Cloudflare Email Sending rejected the request (code 10000: Authentication error)`. Earlier interpretation of numeric 10000 as a missing resource was wrong for this response; the provider message is decisive. The request reached Amy's Worker, passed form checks, and failed at the Cloudflare REST API authorization step. Amy's `CLOUDFLARE_ACCOUNT_ID` binding and request account ID are both `310afa4b7ee71a6444a245450e7a9065`. The runtime email API secret is present but cannot be retrieved in plaintext from Cloudflare. Check the Amy Worker secret value/type and its account permission; keep Amy sender/recipient independent. The user's 4G connection is not the cause of this API authentication response.

### Post-deploy form evidence — 1 October 2026

On deployed Worker version `3b668545-352c-47ed-bd82-81c9e8e61c9c`, a 09:04:49 form POST returned HTTP 400 before any email API attempt; the shared invocation record had a much smaller body than the earlier valid submit. A later 09:05:55 POST passed form validation and again reached Cloudflare's email REST API, which rejected it with `code 10000: Authentication error`. This confirms the remaining delivery failure is Amy's API credential or its account/permission scope, independent of the dashboard logging fix. The Worker secret is nonempty but its plaintext value cannot be read back from Cloudflare.

### Current sender rejection — 1 October 2026

A later POST to deployed Worker version `3b668545-352c-47ed-bd82-81c9e8e61c9c` returned HTTP 502. Its matching live tail at 09:26:29 logged `code 10204: email.sending.error.email.sender_not_configured`. This supersedes the earlier `code 10000: Authentication error` as the current provider response: the API accepted the current authentication far enough to reject Amy's `forms@amygrist.com` sender. The fixed recipient remains `amygrist@gmail.com`; form submission and Turnstile passed on this request. Do not change another project's sender or activate paid Email Sending to bypass this; determine what sender registration is required for `amygrist.com` on this Cloudflare account. Any Email Routing onboarding that changes MX must be reviewed against existing mail hosting before changing DNS.

### DNS comparison — 1 October 2026

The owner showed amygrist@gmail.com verified as a Cloudflare destination, alongside the verified Inner Council and Typeface Gmail recipients. Read-only public DNS: both domains use adi/chase Cloudflare nameservers and identical apex SPF (including _spf.mx.cloudflare.net). innercouncil.org MX: mail.innercouncil.org only; amygrist.com MX: mail.amygrist.com plus Jellyfish mx1/mx2 backups. Inner Council DMARC uses relaxed alignment; Amy DMARC uses strict alignment. These differences alone do not explain Cloudflare response 10204 sender_not_configured. No DNS, Worker or sender change. Paid Email Sending is not in use and should not be suggested as the fix.

### Temporary shared sender test — 1 October 2026

At the owners explicit request, changed only Amy contact handler sender from forms@amygrist.com to forms@innercouncil.org as a test of the Cloudflare 10204 sender_not_configured error. Amy recipient remains amygrist@gmail.com and Reply-To remains the visitor. Inner Council files/configuration were not changed. Astro build passed; deployed amy-grist Worker version 3b716292-67aa-4555-b3ee-843d076ccc03 to https://amy-grist.typeface.workers.dev. Live form delivery has not yet been tested. This temporarily shares the sender identity and should be reviewed after the test; do not infer that Amy domain sender configuration is resolved.

### Shared sender live form test — 1 October 2026

The owner submitted the live Amy contact form after Worker version 3b716292-67aa-4555-b3ee-843d076ccc03 and reported the success message: Thank you. Your message has been sent to Amy. This confirms the Worker completed its send API call successfully using forms@innercouncil.org as sender and amygrist@gmail.com as fixed recipient. Inbox receipt has not been separately confirmed. The original forms@amygrist.com sender remains rejected with provider code 10204 until its configuration is resolved; the shared sender is a temporary workaround.

### Full contact form restored — 1 October 2026

At the owners request, restored the previous /contact/ fields: first name, optional last name, email, optional phone, enquiry category, message and required consent. Restored matching server validation and detailed enquiry email body. Preserved the working sender forms@innercouncil.org, fixed recipient amygrist@gmail.com, provider error logging, and Turnstile reset in finally after both success and failure. npm run build, node --check and git diff --check passed. Deployed amy-grist Worker version 244a4dc5-4b27-4d28-ba36-5647fd0e9680 to https://amy-grist.typeface.workers.dev. Live submission with restored fields is pending.

### Amy article collection and key takeaways — 1 October 2026

Compared Inner Council’s ArticleLayout and archive card structure. Amy’s shared Astro article layout uses a featured-image hero, category/date/reading-time metadata, a Key Takeaways callout, article body and Amy author card. It deliberately has no Notes or Exercises components. All 27 exported posts contain Key Takeaways; migrated each post to its original root-level URL, with source body cleaned of WPBakery row/column/divider shortcodes, categories/tags, Genesis title/description and publication dates retained. Added a local `/blog/` archive with category filter and made Blog navigation local. Original featured uploads only were copied and hashed in `migration/article-originals.json`; filenames with WordPress `-scaled` variants use the unsuffixed original upload. Added repeatable `scripts/migrate-articles.py` and clean generated data in `src/data/articles.json`. `npm run build` passed and generated 41 static pages. No deployment. Desktop/mobile visual comparison remains pending.

### Design guide and route-scope update — 1 October 2026

Built a local `/design/` visual guide using Amy Grist’s existing CSS variables and page conventions, following the component structure of Inner Council’s design guide. It documents palette, type roles, colour combinations, sample elements and responsive spacing; it does not change global styles and uses CSS-only ornamentation, no substituted media. The user explicitly excluded `/meditation-series/` (WooCommerce category), `/masterclass-2022/`, `/circle-2022/`, `/offerings-2024-deep-desire/` (dated campaigns), and `/mailpoet-confirmation/` (MailPoet utility); those entries are marked excluded in the working inventory. The `/inner-child-reiki-offering/` signup form is missing from exports; user chose a clearly labelled enquiry link to `/contact/`. No deployment.
Build follow-up: corrected the new Astro page frontmatter and reran `npm run build`; all 42 static pages built successfully, including `/design/`. No deployment.

### Navigation-first priority and Meditation — 1 October 2026

Owner clarified that pages present in the navigation menu take priority. Built /meditation/ from WordPress page 424 and brought it into the local route allowlist. Hero uses original upload 430 (2021/02/amy_grist_meditation.jpg) copied unchanged; Astro handles responsive optimization. The unavailable WordPress MailPoet mini-course signup is labelled as unavailable in this preview and links to /contact/ for enquiries; no newsletter signup/provider was implemented. The next unbuilt navigation routes are /inner-child-resources/, /wellbeing-tools-practices/, and /shop/ (commerce remains open).

### Category archive SQL export received — 1 October 2026

Inspected the user-supplied t(1).json as WordPress export data only. It contains all 8 category descriptions, serialized Auto Description SEO metadata and category post counts. Preserved the raw export as migration/wppg-category-terms-export.json and normalized category titles, descriptions, SEO descriptions, paths, counts and indexability in migration/category-archives.json. Updated all 8 indexed /category/{slug}/ entries to ready-to-build. Navigation-menu pages remain the next build priority; category archives remain required URL-preservation scope after navigation routes.

Correction: added all 8 category archive URLs as inventory entries and marked them ready-to-build after inspecting the SQL export. Verified the SEO noindex flag is 0 for each category. These remain queued behind unbuilt navigation pages.
\n### Navigation pages: Inner Child Resources and Wellbeing Tools — 1 October 2026\n\nBuilt /inner-child-resources/ and /wellbeing-tools-practices/ as local routes and added both to the navigation route allowlist. The resources page includes source copy, original downloadable guide PDF from media attachment 1903, and a Cloudflare Pages redirect preserving the WordPress /download/1902/ link. Newsletter signup remains unavailable pending provider choice. The wellbeing page preserves the exported practices, prompts, six FAQs, offering and topic links; its hero uses original upload 1866 (Wellbeing-tools-and-practices-header.webp). Both original assets are checksum-recorded in migration/media-originals.json. `npm run build` passes; Astro generates responsive optimized variants from the original hero upload.\n

### Category navigation — 1 October 2026

Made category labels on blog cards and article headers link to their preserved WordPress category URLs. Added a visible category directory to /blog/ and implemented all eight indexable category archive routes from the supplied SQL export, with matched articles and original taxonomy descriptions. Verified with `npm run build`: 53 static pages built.


PDF URL confirmation — 1 October 2026

Confirmed the local guide PDF matches the supplied WordPress upload URL (SHA-256 4668ab8da293d516c88fdf54d9be9a8c0afe36ca461046523c0703027a89e6a0). Added a redirect from the exact /wp-content/uploads/2025/12/ source path to the unchanged local PDF.


### Inner Child Resources title motion — 1 October 2026

Disabled entrance animation, opacity changes and transforms on text in /inner-child-resources/ only. Added short animated underline rules to titles, with line colors selected for the title/background pairing: blush on the dark teal hero behind white type; teal on the light page background behind ink type; and rose on the pale-blush download panel behind ink type. Reduced-motion preference disables these animations through the existing global rule.


Category navigation markup fix — 1 October 2026

Fixed a variable-name collision on /blog/: category archive chips were empty because the article-filter string list shadowed the archive records. Rebuilt and checked the rendered chip labels and links against all eight category route files.


Global title underline system — 1 October 2026

Moved title underline colors, animation and reduced-motion handling into shared global styles. Added dark, light and blush surface variants; /inner-child-resources/ uses these shared classes for its hero and guide headings. Its no-text-entrance rule remains scoped to that page.


Design page title underline contrast tests — 1 October 2026

Added three title/background/underline specimens to /design/ with WCAG contrast ratios. The former blush line measured 2.52:1 on the lightest teal-gradient stop, so the shared dark-surface line token is now pale blush #fff4f2 (3.75:1); paper/teal is 8.82:1 and blush/rose is 3.81:1.


Design underline samples refinement — 1 October 2026

Reworked the title-underline contrast specimens into three side-by-side panels. Each panel now displays the actual stated surface: the resource hero teal gradient, warm-paper background, or soft-blush panel. At narrow widths the panels remain horizontal and scroll-snap rather than collapsing into a vertical list.


Sitewide title underline audit — 1 October 2026

Audited all Astro routes and shared components for hr.rule and bespoke title underline styles. Centralized line animation, reduced-motion behavior, lengths and color tokens in global.css. All existing hr.rule lines now use contextual global variants: pale blush on dark teal/rose, teal on soft-rose sections, rose on pale-blush enquiry/invitation panels, and teal on paper. Replaced the article key-takeaways bespoke aqua rule with the shared title utility. Removed local color/length overrides; retained spacing only.


Responsive blog category navigation — 1 October 2026

The blog archive now shows linked category buttons on desktop and a category-navigation dropdown at tablet and mobile widths. Both controls navigate to the preserved category archive URL; the dropdown’s “All articles” option returns to /blog/.


Navigation submenu spacing — 1 October 2026

Changed submenu link line-height from 1.3 to 1.2 and padding from 12px uniform to 12px 10px 10px, preserving extra top breathing room. Applies to desktop and mobile submenu links.


Navigation submenu padding adjustment — 1 October 2026

Added 0.2rem to submenu link top and left padding, retaining the established 10px right and bottom spacing.


Navigation dropdown surface — 1 October 2026

Changed the submenu panel surface to the existing warm-paper token var(--bg), separating it from the soft-rose navigation background. Text and hover colors remain unchanged.


Navigation dropdown corner radius — 1 October 2026

Rounded submenu panels to 25px and submenu-link hover/focus states to 15px.


About submenu width — 1 October 2026

Widened the About dropdown to 285px on desktop so “About The Inner Council” fits on one line. Other dropdowns and mobile navigation keep their existing widths.


About navigation label — 1 October 2026

Changed the About submenu item label from “About The Inner Council” to “The Inner Council”; destination remains /inner-council/.


About submenu width adjustment — 1 October 2026

Reduced the desktop About submenu width from 285px to 265px after shortening its second item label.


About submenu width adjustment — 1 October 2026

Reduced the desktop About submenu width by a further 20px, to 245px.


### Shop launch section: Meditation Series — 1 October 2026

Built /shop/ with a single Meditation Series collection panel, the retained WooCommerce category path /product-category/meditation-series/, and the existing product page at /shop/gma_complete_series/. Updated Shop menu links and href allowlist for local navigation. Product imagery comes from the mapped original upload in media manifest. Checkout remains a non-functional placeholder pending Stripe and fulfilment. The excluded /meditation-series/ path remains untouched.


### Checkout direction — 1 October 2026

Owner selected direct Stripe Payment Links from each product’s Buy it now button, with no cart/basket. The existing Complete Meditation Series product supports this pattern; the button remains inactive pending the URL and fulfilment setup.


### Meditation Series catalog expanded — 1 October 2026

Expanded the retained `/product-category/meditation-series/` page to show the Complete Collection first, then eight individual meditation products in a two-column desktop grid that stacks on mobile. The Shop nav now links directly to `/shop/`, with no dropdown; `/shop/` retains its Meditation Series collection panel. Added product records, source descriptions, prices, running times and reusable detail layouts at the existing `/shop/{slug}/` URLs. Copied six cover images from original uploads and checksum-recorded them; reused existing originals for the other two. Buy it now links remain disabled pending individual Stripe links and protected digital fulfilment. Local `npm run build` succeeds with 63 static pages; `git diff --check` passes. No deploy performed.


### Feedback page restored — 1 October 2026

Replaced the legacy Fluent Forms shortcode on `/feedback/` with a local name/email/feedback form. It reuses the existing `/api/contact` Worker delivery, Turnstile verification, honeypot, timing check and rate limiter; feedback messages have a distinct email subject and are sent to the configured Amy recipient. The form does not include newsletter signup. Updated route inventory and local href allowlist.


### Inner Child Reiki offering rebuilt — 1 October 2026

Rebuilt `/inner-child-reiki-offering/` from the Dec 2025 WordPress export, preserving training description, audience, Reiki/Inner Child learning content, certification details, course formats and the listed £180 group / £230 1:1 pricing. Replaced missing Fluent Forms signup with the already agreed contact-form link. Used the existing original Reiki hands image (media 483); source background attachment 3913 and inline photo attachment 1640 are absent from supplied originals. Source dates “to be confirmed for 2026” have passed, so page points visitors to Amy for current dates/availability. One source learning-outcome bullet is truncated mid-sentence and omitted instead of guessed. Added the local href allowlist and updated inventory. No deployment.


### Newsletter provider selected — 1 October 2026

Owner confirmed Amy will continue collecting newsletter signups through Mailoctopus. Updated project notes: provider choice is resolved; integration is pending the target form/list and Mailoctopus embed/API details. Existing signup CTAs remain clearly unavailable/enquiry-only until connected and tested.


### Personal Yoga page restored — 1 October 2026

Owner asked to restore `/personal-yoga/` although it is not in navigation. Rebuilt from WordPress page 55: Yoga in my Life, current offerings, the three student testimonies and Sri Aurobindo reading links. Recreated its slider as the shared PageHero, using the unsuffixed original upload 110 (`amy_grist_yoga2.jpg`) copied and checksum-recorded in `migration/media-originals.json`. Contact CTAs point to local `/contact/`. Route allowlist and inventory updated; it remains absent from navigation.


### Newsletter popup visual reference received — 1 October 2026

Owner supplied a screenshot of the live Green Popups modal. Recorded its static circular design, rose border, white interior, page overlay, course cover, visible copy, name/email fields and signup CTA in project notes. No entrance animation requested. Existing homepage trigger ID is `#lepopup-Meditation-Mailgroup-Signup`. Astro popup implementation, matching the original cover asset, and Mailoctopus connection remain outstanding.

### Sacred Space Meditation Course restored — 1 October 2026

Rebuilt `/sacred-space-meditation-course/` from WordPress page 362. Restored its course introduction, booklet cover and downloadable workbook, meditative-space guidance, three guided audio sessions with the full exported transcripts, and feedback link. Copied the three MP3s and original workbook PDF byte-for-byte from the supplied uploads; SHA-256 checks are recorded in `migration/media-originals.json`. Used original media attachment 419 for the hero/booklet. Added this route to the local href allowlist and Resources navigation; the homepage and Meditation page free-course links now lead here. The free course content is available locally; newsletter signup awaits Amy’s Mailoctopus form details and the page directs visitors to Contact in the meantime. No deployment.

### WooCommerce and account route scope revised — 1 October 2026

Owner clarified that WooCommerce commerce and account routes are not being replicated. Marked `/shop/`, `/product-category/meditation-series/`, all product routes, `/basket/`, `/checkout/`, `/my-account/`, `/payme/` and `/purchase-now/` excluded in the route inventory. Removed the local shop routes, product teasers, Shop navigation and bag icon. Preserved the retired route-page implementations under `migration/excluded-commerce-pages/` for recovery. `/product/inner-child-reiki-1-online-course/` remains on hold while Amy is asked whether it should be treated differently. No redirects or deployment.

### Additional legacy pages excluded — 1 October 2026

Owner confirmed `/visual-expression/`, `/yoga-sessions/` and `/photography/` will not be migrated. Marked each route excluded in the inventory. No pages or redirects were created and no deployment was made.

### Responsive blog category selector — 1 October 2026

At tablet and mobile widths, hid the visible “Browse categories” label while retaining its accessible label for assistive technology, and made the category dropdown fill its container. Desktop category buttons remain unchanged.

### Shop navigation retained on live site — 1 October 2026

Restored the Shop navigation item and basket icon after checking the header. They link to Amy’s existing live WordPress `/shop/` and `/basket/` routes through the fallback URL resolver; neither commerce route is generated locally. No other main navigation entries were missing. No deployment.

### Shop and Meditation Series pages restored — 1 October 2026

Corrected the previous scope interpretation: `/shop/`, `/product-category/meditation-series/` and the nine Meditation Series product details remain in scope as locally built static catalog pages. Restored their Astro routes and the homepage product teaser section; restored Shop navigation as a local link. Only transactional/account routes (`/basket/`, `/checkout/`, `/my-account/`, `/payme/`, `/purchase-now/`) remain excluded. Stripe purchase links and protected fulfilment are still pending. `/product/inner-child-reiki-1-online-course/` remains awaiting Amy’s input. No deployment.

### Global title underline thickness — 1 October 2026

Reduced both shared animated title line styles (`.rule` and `.title-underline::after`) from 3px to 2px. Other unrelated 3px elements, such as focus outlines and borders, are unchanged.

### Sitewide link styling and design guide — 1 October 2026

Changed links to use colour rather than underlines, with a distinct hover/focus colour across paper, blush, rose and teal surfaces. Removed local page/component rules that forced underlines. Added a four-surface link sample guide to `/design/` with WCAG AA normal-text contrast ratios for default and hover colours. Buttons and their hover treatment remain unchanged.

### Design page top spacing — 1 October 2026

Added extra top padding before the first palette column to keep its heading and copy clear of the fixed header, with a smaller adjustment on narrow screens.

### Design hero spacing — 1 October 2026

Shifted the `/design/` hero copy lower to add breathing room below the fixed navigation; narrowed the adjustment on mobile.

### Design hero spacing refinement — 1 October 2026

Added a little more space above the `/design/` hero copy on desktop and mobile at owner request.

### Link weight refinement — 1 October 2026

Raised global hyperlink weight to 400 so inline links are easier to distinguish from the 300-weight body copy, retaining the contrast-tested color hover/focus states.

### Blush link color on rose — 1 October 2026

Changed links on the rose surface to pale blush (#fff4f2), with aqua (#ccffff) on hover/focus. Both states pass WCAG AA normal-text contrast; the standard soft blush (#e3a6a1) is documented as failing at 2.42:1 on rose.

### Homepage slider controls removed — 1 October 2026

Removed the visible previous/next/count/pause controls from the homepage hero at owner request. The slideshow still rotates automatically, respects reduced-motion preference and pauses when focused. Shared Hero control handling is now optional.

### Inner Child Therapy route renamed — 1 October 2026

Renamed the local workshop route to `/inner-child-therapy/`, updated internal links/navigation references, and added 301 redirects from `/inner-child/` with and without a trailing slash. Preserved the source URL in the route inventory. No deployment.


### Routes excluded by owner — 1 October 2026

Owner confirmed `/shop/inner-child-reiki-1-online-course/` and `/guided-meditation/` will not be migrated. Marked the corresponding product source route (`/product/inner-child-reiki-1-online-course/`) and `/guided-meditation/` as excluded in `ROUTE-INVENTORY.json`; no local route or redirect was added.
