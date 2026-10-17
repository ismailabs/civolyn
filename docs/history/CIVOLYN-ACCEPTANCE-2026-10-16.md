# CIVOLYN local acceptance record

> Historical evidence for the prior CIVOLYN implementation only. Superseded for PROWORKS by `../RELEASE-REPORT.md`; none of these results establish the current rebrand or production deployment.

Recorded 16 October 2026 (Asia/Kuala_Lumpur). This record covers the actual local implementation and testing. GitHub publication is independently checked after the final commit. No Cloudflare deployment, domain attachment, DNS change or nameserver change is part of this delivery.

## Implemented scope

- Exactly 12 primary indexable content pages, with the approved routes. The additional 404 is a non-indexable utility page. Journal articles stay within one route using anchors.
- Original responsive brand system, open C logo, wordmark, SVG/PNG icons, social preview, generated architectural artwork and local responsive WebP variants.
- Three distinct product interface compositions and working local Flow, Knowledge and Signal previews.
- Comparison controls, native FAQ disclosures, journal navigation, local preview selectors, accessible desktop/mobile navigation, reduced-motion handling and explicit focus states.
- Fictional-project disclosure on Home, Footer and Contact, plus explicit boundaries on each product page. No invented customer proof, real infrastructure claims, prices or submitting enquiries.
- Real ISMAIL portfolio links and a WhatsApp destination verified in the public portfolio HTML. No message or real enquiry was submitted.
- Unique metadata, configurable canonicals, XML sitemap, robots, accurate WebPage structured data and production social metadata.
- Static Cloudflare Pages-compatible output, a deployment guide and a verification-only GitHub Actions workflow.

## Reproducibility and commands

Environment: Windows, Node 24.19.0, npm 11.17.0, Astro 7.4.0, TypeScript 6.0.3, Playwright 1.64.1, headless Chromium 156.0.8078.4. Dependency versions are recorded in the lockfile.

| Check                                               | Actual result                                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Dependency installation, including a clean `npm ci` | Passed; clean install completed in about five minutes in the Windows workspace                                                  |
| `npm audit` / clean-install audit                   | Zero reported vulnerabilities at the time of validation                                                                         |
| `npm run check`                                     | 37 files checked; 0 errors, 0 warnings, 0 hints                                                                                 |
| `npm run build`                                     | Static output completed; 12 primary pages plus 404, robots and sitemap utilities                                                |
| `npm run test:static`                               | 12 unique titles and descriptions; 313 internal link references and 86 asset references checked; sitemap has exactly 12 entries |
| Client output budgets                               | 7,578 bytes of JavaScript; 64,933 bytes of CSS before transport compression                                                     |
| `npm run verify` after clean install                | Passed, including all 57 browser tests                                                                                          |
| `npm run test:preview`                              | Separate preview build emitted noindex metadata while retaining the intended production canonical                               |
| Gitleaks v8.30.1 staged scan                        | No leaks found; scanner downloaded from its official release and checksum verified                                              |

The final staged whitespace and history scans are repeated at the publication gate. Dependencies, builds, diagnostic artifacts, environment files and scanner binaries are excluded from the commit; `.env.example` contains only public configuration examples.

## Browser and accessibility evidence

- All 12 pages returned 200 and loaded their assets without observed page or console errors.
- Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA rules reported zero violations across the 12 pages. Explicit heading checks also passed.
- Every page was checked at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px: 120 page/width combinations, with no page-level horizontal overflow.
- All 12 pages were captured at 1440px desktop and 390px mobile: 24 full-page screenshots. Representative full pages and overview sheets were visually inspected.
- Keyboard checks covered skip navigation, mobile disclosure navigation, Escape/focus return, Flow approval, native FAQs and normal controls.
- A short 844 × 390 landscape viewport preserved menu visibility, scrolling bounds and working product navigation.
- Dark-surface focus outlines were checked against their actual background: contrast at least 3:1, with an outline at least 2px wide.
- Reduced-motion behaviour, a 640 CSS-pixel zoom-equivalent layout, and readable no-JavaScript content/mobile navigation were checked.
- Knowledge search, category filtering, source expansion, empty results and reset passed. Signal period changes kept the totals, labelled chart and table consistent. Flow passed all four stages, human review and reset. Comparison and contact selectors changed the correct destinations.
- Unknown routes returned a real 404 through the local QA server; 404 metadata was noindex.

Early checks caught font/CSP mismatches, contrast and labelling problems, missing heading context and test selectors that needed narrower semantic scope. These were resolved. An early diagnostic run accidentally included generated Playwright report JavaScript; generated reports are now explicitly excluded from source diagnostics.

Concurrent browser runs also hit timeouts in multi-page batches. Their traces were retained under ignored local artifacts. The final configuration uses one local browser worker, two in CI, zero retries and the normal 30-second test timeout. Screenshot tests are separate per page and viewport. The unchanged functional assertions passed in the final run.

The first GitHub Actions Linux run identified a contrast edge case during opacity-based scroll entrances. The entrance effect now moves text while retaining full opacity, preserving readable contrast throughout the transition. The accessibility assertions remain unchanged.

## Performance measurements

Lighthouse 13.5.0 was run against the built site on the local QA server using its mobile lab configuration. Three post-tuning samples were captured for each representative route. These are local simulated-throttling results on Windows, served over local HTTP without production CDN transport compression. This benchmark was captured after headline tuning and before the final scroll-opacity accessibility correction.

| Route   | Median performance score (range) | Median LCP | Highest CLS | Median TBT |
| ------- | -------------------------------- | ---------- | ----------- | ---------- |
| Home    | 98 (79–99)                       | 2.131 s    | 0           | 58 ms      |
| Signal  | 98 (96–99)                       | 1.548 s    | 0.0003      | 147 ms     |
| Journal | 99 (94–99)                       | 1.818 s    | 0.0413      | 0 ms       |

Accessibility, SEO and best-practices scores were 100 in every benchmark sample. All nine benchmark LCP measurements were below 2.5 seconds; the highest was 2.459 seconds. No Lighthouse runtime errors were reported.

There was meaningful local performance variation. Earlier samples ranged from 61 to 99 for Home and 74 to 97 for Signal. The homepage's explicitly authored headline now uses normal wrapping, avoiding unnecessary text balancing. The post-tuning homepage samples were 79, 98 and 99; the first still recorded 822 ms of total blocking time. This is retained as a limitation of the measured experience, not presented as a uniformly perfect score. The results do not establish a causal explanation for every slow sample.

The original Windows Chrome launcher failed to start. The performance script now launches an owned Playwright Chromium instance and lets Lighthouse attach through a temporary local debugging port. This produced actual Lighthouse reports; no performance score was inferred from bundle size or browser smoke tests.

The complete raw benchmark reports are in `artifacts/lighthouse-final-1/`, `artifacts/lighthouse-final-2/` and `artifacts/lighthouse-final-3/`. Earlier reports are retained separately. Repeat measurements on the eventual hosted site and real devices before making a field performance claim. TBT is a lab metric and does not establish real-user INP.

## Evidence boundaries

These are local Chromium and automated-rule results, not a formal WCAG certification or a complete physical-device/assistive-technology assessment. Other browser engines and real assistive technology were not independently evaluated. The narrow viewport checks are layout evidence, not a claim of testing every device.

The previews are deterministic browser-only examples. There is no AI inference, authentication, database, document upload, real integration, subscription, booking or message delivery. No private business data was used.

Hosted response headers, actual Cloudflare routing/caching, DNS, certificate issuance, the live canonical domain and real-user Core Web Vitals must be verified during a separately authorised deployment. Lighthouse lab values do not establish field INP.

## Local evidence locations

These are intentionally ignored and remain available in the implementation workspace:

- `artifacts/screenshots/` — all 24 page captures.
- `artifacts/desktop-overview.png` and `artifacts/mobile-overview.png` — overview sheets used in the visual review.
- `artifacts/parallel-run-diagnostics/` and `artifacts/serial-run-diagnostics/` — earlier timeout diagnostics.
- `artifacts/lighthouse-*/` — measured performance runs and raw Lighthouse JSON.
- `artifacts/gitleaks-staged.json` — redacted staged secret-scan result.
- `playwright-report/` — final browser report, regenerated by `npm test`.

See [asset provenance](ASSETS.md) and the [future Pages deployment guide](CLOUDFLARE-PAGES.md) for maintenance and publication details.
