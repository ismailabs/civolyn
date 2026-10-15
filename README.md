# CIVOLYN

**Fictional concept · An ISMAIL portfolio project.**

CIVOLYN is an original 12-page enterprise software marketing website. Three imagined products — Flow, Knowledge and Signal — explore workflow automation, shared knowledge and operational reporting. It is a portfolio website, not a functioning software business.

Built for [ISMAIL](https://www.ismailstudio.my/). Repository: [ismailabs/civolyn](https://github.com/ismailabs/civolyn).

## Run locally

Use Node 24 (see `.node-version`) and npm. No credentials, database or AI API are required.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. To inspect the exact production output with the intended security headers and real 404 responses:

```sh
npm run build
node scripts/serve.mjs
```

This serves `http://127.0.0.1:4321`. `npm run preview` also offers the standard Astro preview. The QA server is local tooling, not a Cloudflare runtime dependency.

## Routes

| Page                     | URL                    |
| ------------------------ | ---------------------- |
| Home                     | `/`                    |
| Platform                 | `/platform/`           |
| Flow                     | `/products/flow/`      |
| Knowledge                | `/products/knowledge/` |
| Signal                   | `/products/signal/`    |
| Technology               | `/technology/`         |
| Design & Experience      | `/design/`             |
| Product Comparison       | `/compare/`            |
| Our Story                | `/company/`            |
| Journal                  | `/journal/`            |
| Support & FAQs           | `/support/`            |
| Contact / Explore a Demo | `/contact/`            |

There are exactly 12 indexable content pages. Journal essays use in-page anchors. A non-indexable `404.html`, `robots.txt` and XML sitemaps are utility output.

## What works

- Responsive navigation, keyboard-operated product disclosures and an Escape path that returns focus.
- Flow: a local four-step simulation, an explicit human approval, readable statuses and reset.
- Knowledge: search across six original sample documents, category filters, source snippets and empty-state recovery.
- Signal: week/month/quarter datasets, coordinated totals, labelled bars, explanatory notes and an accessible data table.
- Comparison: a three-choice starting-point finder and a scrollable semantic feature table.
- Native FAQ disclosures, journal anchors and demo destination selectors.
- Genuine external ISMAIL portfolio and WhatsApp enquiry links. There is no submitting contact form.

All demo data is illustrative. Nothing is sent to AI services, business integrations or a fictional sales team. State lives in browser memory and resets with a page refresh. No analytics, cookies or local storage are implemented.

## Stack and source

Astro static prerendering, strict TypeScript, custom layered CSS, native browser APIs and a small shared client script. There is no React, server adapter or application backend.

```text
src/pages/        12 primary pages, 404 and robots endpoint
src/layouts/      Shared document, metadata and site shell
src/components/   Navigation, product previews, workspace and reusable sections
src/data/site.ts  Route metadata, products, sample library, FAQs and real links
src/scripts/      Browser interactions
src/styles/       Design tokens, layout, responsive rules and local font faces
src/assets/       Optimised artwork master
public/          Responsive artwork, favicon, social image and Pages headers
scripts/         Static QA, local server, asset reproduction and Lighthouse runner
tests/           Playwright and axe browser checks
docs/            Deployment, assets, licences and acceptance evidence
```

To change content, edit the relevant `.astro` page or the shared data module. Keep the metadata registry aligned with the actual routes. Shared tokens are at the start of `global.css`. Product interaction state and example reporting datasets are in `src/scripts/site.ts`; the initial Signal table and chart must remain consistent with that data.

## Checks

```sh
npx playwright install chromium
npm run check           # Astro and TypeScript diagnostics
npm run build           # Static production output in dist/
npm run test:static     # Routes, metadata, sitemap, links, anchors and asset budgets
npm run test:preview    # Isolated noindex build with the production canonical
npm test                # Browser interactions, axe, responsive checks, screenshots
npm run verify          # All the checks above in order, stopping on failure
npm run test:performance # Lighthouse: run the local QA server first
npm run format:check     # Source formatting
```

The browser suite checks all 12 routes, all 10 specified widths (320 through 1920px), key keyboard paths, reduced motion, sample data interactions, console errors, asset responses, disclosures, real enquiry links and 404 handling. Screenshots and reports are written to ignored `artifacts/`, `test-results/` and `playwright-report/` directories. CI runs verification only; it does not deploy.

See [the acceptance record](docs/ACCEPTANCE.md) for actual results and evidence boundaries. Automated accessibility checks do not establish complete WCAG conformance. Lighthouse is a local lab measurement, not field Core Web Vitals or a measurement of real-user INP.

## Assets and licensing

The CIVOLYN mark, favicon, product interface compositions, diagrams and social vector are original project assets. The architectural image was created with the built-in image generator, then optimised into local WebP variants. The reference images were used as mood boards and are not shipped as website assets. See [asset provenance and the final generation prompt](docs/ASSETS.md).

Manrope Variable and Instrument Serif are bundled from Fontsource, served locally as WOFF2, and licensed under the SIL Open Font License. Copies are in `docs/licenses/`. Only the Latin variable sans and italic serif files are requested by the website. `npm run assets:brand` reproduces the responsive image variants, icons and social PNG from committed sources.

No general open-source licence is granted for this portfolio project. Dependency and font licences retain their own terms. The repository is public for portfolio inspection.

## Accessibility, SEO and privacy

Semantic landmarks, a skip link, native controls, visible focus, status announcements, labelled chart values and an equivalent data table are implemented. The content stays readable without JavaScript; local filter and state interactions require it. Scroll entrances respect reduced-motion preferences, and content is never permanently hidden if JavaScript does not run.

Each page has a unique title, description, canonical URL, Open Graph and Twitter metadata, and conservative `WebPage` structured data. Nothing describes CIVOLYN as a verified operating business or an available commercial software product.

The intended origin is `https://civolyn.ismailstudio.my`. Override the build-time `SITE_URL` with an HTTP(S) origin, without a path. Set `SITE_INDEXABLE=false` for previews. Non-main Cloudflare Pages branch builds automatically emit noindex metadata; production remains indexable. Canonicals continue to point at the configured production origin. The final origin and hosted response status must be verified when publishing.

`public/_headers` defines security headers for the future static Pages host. Styles permit inline declarations for the original interface visuals; scripts and fonts are same-origin. There are no third-party runtime requests in the site itself. A future host may process standard access logs.

## Real contact handling

The portfolio destination is `https://www.ismailstudio.my/`. The WhatsApp link, `https://wa.me/601163265610`, was verified in that public website’s HTML on 16 October 2026. Both are centrally maintained in `src/data/site.ts`. Recheck the public portfolio before changing the number. Opening a link does not send a message automatically.

## Cloudflare Pages — prepared, not deployed

Use GitHub repository `ismailabs/civolyn`, production branch `main`, build command `npm run build` and output directory `dist`. No adapter or Pages Functions are needed. No Cloudflare project, DNS record, nameserver or hosting setting was changed by this task.

The next action is to connect the repository through the Cloudflare Pages Git integration when deployment is authorised. Follow the [deployment guide](docs/CLOUDFLARE-PAGES.md), including canonical, HTTPS, preview indexing and authoritative DNS checks.

## Deliberate limitations

This project does not implement AI inference, authentication, persistence, integrations, file uploads, subscriptions, bookings, email or a support service. All company and product narratives are fictional. The live custom domain, hosted cache behaviour, DNS, HTTPS and field performance remain unverified until a later deployment. The recorded QA is local Chromium evidence; physical devices, assistive technology and other engines need separate evaluation before claiming comprehensive compatibility.
