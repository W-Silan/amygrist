# Foundation verification report

Date: 16 September 2026

## Result

The shared design system, header/navigation, footer, homepage and `/amy/` foundation pass the current local acceptance checks. The source WordPress archive and handover remain unchanged. No deployment or DNS changes were made.

## Visual comparison

Captured views are available for both pages at 375, 768 and 1440 pixels, together with open navigation states, in this directory. They were compared with the supplied desktop homepage/About screenshots and mobile homepage screenshot.

The section order, content, responsive stacking, image subjects/crops, centred navigation, mega-menu grouping, mobile navigation, colour bands, resource cards and footer follow the references. All four exported homepage slides remain available; comparison screenshots deliberately select the workshop frame on desktop and one-to-one frame on smaller widths to match the supplied captures more closely. The About hero uses the original exported image and top focal alignment.

The supplied screenshot palette failed WCAG text contrast. With user approval, accessible tokens now keep the rose/teal identity while using darker rose text, dark teal text on soft rose, darker button/rose surfaces, and dark translucent backplates where white text overlays photographs. This is the main intentional visual difference from the source.

The desktop references capture the sticky header partway down long screenshots. The Astro implementation uses its actual browser behavior: transparent over the hero, fixed at the top, then soft rose and reduced on scroll. `/amy/` has no supplied mobile reference, so its mobile layout follows the verified homepage conventions.

## Automated browser checks

`npm run test:browser` checks `/` and `/amy/` at 375, 768 and 1440 pixels using Chrome. All six combinations passed:

- no horizontal overflow or browser script errors;
- exactly one H1 and the expected production canonical;
- no broken visible images;
- keyboard-opened desktop/mobile navigation, visible submenu, Escape closure and correct ARIA state;
- slider and testimonial controls;
- local links and real 404 behavior;
- zero axe violations for the page and open header/menu under WCAG A, AA and 2.1 AA tags.

The check also confirms the 15 selected image files match the archived original uploads by SHA-256 and that all 27 inventoried blog post URLs remain root-level. Detailed output is in `browser-results.json`.

## Cloudflare Pages runtime

`wrangler pages dev dist` passed the following checks:

| Request | Result |
| --- | --- |
| `/` | 200 |
| `/amy/` | 200 |
| missing route | 404 |
| `/amy` | 308 to `/amy/` |
| `robots.txt` and `sitemap.xml` | 200 |

The preview applies `X-Robots-Tag: noindex, nofollow`, `X-Content-Type-Options: nosniff` and the configured referrer policy. Preview indexing is intentionally disabled until the full route inventory and cutover are ready.

One local diagnostic sample used a 375×812 viewport, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and disabled cache:

| Page | LCP | CLS | Transferred | Requests |
| --- | ---: | ---: | ---: | ---: |
| `/` | 708 ms | 0.007 | 125,887 bytes | 10 |
| `/amy/` | 692 ms | 0.043 | 122,043 bytes | 9 |

These are local laboratory samples, not Lighthouse scores or field measurements. Detailed output is in `runtime-results.json`.

## Build checks

- Clean `npm ci`: passed, zero reported vulnerabilities.
- `npm run check`: passed with 0 errors, warnings and hints.
- `npm run build`: passed; static output generated in `dist/`.

## Deferred work

Unbuilt navigation links continue to the live WordPress site during this foundation preview. Newsletter signup, contact delivery and commerce remain deferred until providers are selected. The sitemap stays empty and the whole preview stays noindex. The remaining current menu pages, blog collection and root-level post routes are the next migration stage.

## Focused route verification: Integration Work

`/integration-work/` passed the reduced route check at 375 px and 1440 px: HTTP 200, no horizontal overflow, broken images, browser console errors or page errors. Visual captures are `integration-work-375.png` and `integration-work-1440.png`. Astro check and production build also pass. The broader accessibility, runtime and performance suites remain batched until the next coherent route group.

## Focused route verification: Complete Meditation Series pilot

`/shop/gma_complete_series/` passed the reduced route check at 375 px and 1440 px: HTTP 200, no horizontal overflow, broken images, browser console errors or page errors. Visual captures are `product-complete-series-375.png` and `product-complete-series-1440.png`. Astro check and production build pass. No ZIP or MP3 files are present in the source, public or built site trees; the protected product archive remains private.

## Focused route verification: Inner Child Healing Workshop

`/inner-child/` passed the reduced route check at 375 px and 1440 px: HTTP 200, no horizontal overflow, broken images, browser console errors or page errors. Visual captures are `inner-child-375.png` and `inner-child-1440.png`. Astro check and production build pass. No route-specific reference screenshot was supplied; the review used the exported structure and established shared design system.

## Focused route verification: Inner Child Mentoring

`/inner-child-mentoring/` passed the reduced route check at 375 px and 1440 px: HTTP 200, no horizontal overflow, broken images, browser console errors or page errors. Visual captures are `inner-child-mentoring-375.png` and `inner-child-mentoring-1440.png`. Astro check and production build pass. No route-specific reference screenshot was supplied; the review used the exported structure and established shared design system.

## Focused route verification: Mindset & Wellbeing Coaching

`/one-to-one-coaching/` passed the reduced route check at 375 px and 1440 px: HTTP 200, no horizontal overflow, broken images, browser console errors or page errors. Visual captures are `one-to-one-coaching-375.png` and `one-to-one-coaching-1440.png`. Astro check and production build pass. The desktop capture was compared with the supplied `references/Desktop/one-to-one.png`; no mobile route reference was supplied.

## Focused route verification: Practitioner Training and Inner Child Reiki

`/become-a-practitioner/` and `/inner-child-reiki/` passed the reduced route check at 375 px and 1440 px: HTTP 200, no horizontal overflow, broken images, browser console errors or page errors. Visual captures use each route slug followed by `-375.png` and `-1440.png`. Astro check and production build pass. The practitioner route was compared with its supplied desktop reference. Reiki had no supplied route reference and was reviewed against the export and shared design system.
