# Amy Grist — static Astro foundation

**Resuming after interruption:** read `WORK-LOG.md` first.

Initial replica: homepage, `/amy/`, shared header/navigation/footer and 404. The supplied handover and WordPress archive remain untouched under `amy-grist-astro-starter-docs/`.

## Local development

Use Node **24.19.0** (`nvm use`). From this directory:

```sh
npm ci
npm run check
npm run build
npm run dev
```

Production HTML preview: `npm run preview -- --host 127.0.0.1 --port 4321`.

Browser checks (system Chrome required): with preview running, `npm run test:browser`. Screenshots, layout checks and axe results are written to `verification/`. Use `TEST_URL` to select a different local server.

Cloudflare Pages runtime preview: `npm run pages:preview -- --ip 127.0.0.1 --port 8788` (equivalent to `npx wrangler pages dev dist`). No authentication or deployment is required. There are currently no request-time functions or secrets. Astro preview does not verify Pages headers/functions.

## Editing

- Shared site identity and navigation: `src/data/site.ts`.
- Shared colours/type/layout rules: `src/styles/global.css`.
- Copy: `src/data/home.json`, `src/data/amy.json` (clean HTML within section records).
- Unique layouts: `src/pages/index.astro`, `src/pages/amy.astro`.
- Original asset provenance: `migration/media-originals.json`.
- Working route status: `ROUTE-INVENTORY.json`; supplied inventory is immutable.

Do not rerun `scripts/extract-foundation.py` after editorial changes without reviewing its overwrite behaviour. It is retained as migration provenance only.

## Future Cloudflare configuration — not deployed

Build root: `amygrist` when using the parent workspace as repository root; otherwise `.`. Build command `npm run build`; output `dist`; `NODE_VERSION=24.19.0`. `wrangler.toml` supplies the static build output directory. No Astro Cloudflare adapter.

This preview is noindex and unbuilt links still go to the existing WordPress site. Before publishing: finish the route inventory, migrate links, choose and test form/commerce providers, confirm project/branch and domain, set production indexing and sitemap, verify deployed preview, plan DNS cutover and rollback. Keep existing WordPress hosting and DNS records available for rollback. Publishing and DNS changes require separate authorization.

See `PROJECT-NOTES.md` for open decisions and `verification/REPORT.md` for measured verification and limitations.
