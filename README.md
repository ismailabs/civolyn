# PROWORKS

A fictional SaaS portfolio concept by [ISMAIL](https://www.ismailstudio.my/), implemented in the existing CIVOLYN Astro repository. The product business is fictional; the website and three local demos are working frontend implementations. No subscriptions, customer accounts, live AI, uploads or external automations are offered.

Release status and current evidence: [release report](docs/RELEASE-REPORT.md). Repository history is preserved. PROWORKS has not been trademark-cleared; the acknowledged naming/confusion risk is documented in [decisions](docs/DECISIONS.md).

## Run locally

Node 24 and npm are used. Install dependencies with `npm ci`. Run `npm run dev` for development. A default `npm run build` is deliberately **noindex**. To inspect a local production-mode build in PowerShell:

```powershell
$env:SITE_INDEXABLE='true'
npm run build
node scripts/serve.mjs
```

Open the printed HTTP URL. No browser demo sends a request or stores input. The default canonical origin is `https://proworks.ismailstudio.my`; a canonical URL alone does not establish a deployed production host.

## Pages and demos

The twelve core routes are `/`, `/platform/`, `/products/workflows/`, `/products/knowledge/`, `/products/insights/`, `/technology/`, `/experience/`, `/compare/`, `/about/`, `/journal/`, `/guides/`, and `/contact/`. Three original, reviewed articles live below `/journal/`.

- Workflows: four deterministic stages, named owner roles, a reviewed-proposal checkbox, explicit approval, activity history and reset. A double click cannot skip a stage.
- Knowledge: six original local documents, case-insensitive title/category/excerpt search, category filters, source disclosures, empty recovery and reset. User input is never inserted as HTML.
- Insights: week/month/quarter fixtures drive totals, bars, chart descriptions, status text and equivalent tables. Completed totals are 103 / 181 / 558. Snapshot review counts and illustrative median days are separately defined.

Navigation, sample documents, initial dashboard data, FAQs and explanatory content remain usable without JavaScript. Controls requiring scripting are hidden with a visible explanation. `src/data/` is the source of truth; historical fixture copies in the supplied handoff are not runtime dependencies.

## Verification

`npm run verify` performs type checking, a local production-mode build, static metadata/link/asset/budget assertions, two independent preview-indexing checks, and Chromium browser tests. `npm run test:performance` measures three representative routes three times with mobile Lighthouse while the local QA server is running.

Additional checks: `npx tsc -p worker/tsconfig.json`, `npx wrangler deploy --dry-run`, and `npm run format:check`. Set `CROSS_BROWSER=1` for the Firefox/WebKit smoke projects. Actual available engine coverage and failures belong in the release report, not inferred from configuration.

Real screenshots for every core page at 1440 and 390 pixels are generated under ignored `artifacts/screenshots/`. Reference/browser comparisons and the page-by-page adaptations are described in [visual QA](docs/VISUAL-QA.md). Generated browser evidence is uploaded by GitHub Actions; it is not committed as source.

## Hosting and privacy

Production uses Cloudflare **Worker** `proworks` at [proworks.ismailstudio.my](https://proworks.ismailstudio.my/), with static Astro assets and a small handler that preserves true 404 responses and sets their noindex header. The old CIVOLYN hostname uses a separate path-mapped redirect Worker, activated after new production verification. See [Worker migration and rollback](docs/CLOUDFLARE-WORKER.md) and the current [release report](docs/RELEASE-REPORT.md) for actual evidence and revision identities. GitHub Actions verifies and dry-runs; production deployment is an explicit Wrangler operation.

No analytics provider is currently configured and no named events are emitted. Event attributes describe intended integration points only. See [analytics decision](docs/ANALYTICS.md). A click to ISMAIL or WhatsApp is not an enquiry or a sent message.

Original handoff images, concept-board text and historical CIVOLYN QA are not production evidence. The supplied handoff folder and generated build/test output are ignored; selected original production assets and reviewed content are incorporated into source.
