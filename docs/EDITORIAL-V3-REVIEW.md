# PROWORKS Editorial Product Experience V3

Review candidate only. Owner visual approval is pending. No merge or production deployment is authorised by this implementation.

## Protected-state audit

The checkout directory is still named `civolyn`, but its Git root and origin are the existing `ismailabs/proworks` repository. At audit, the only untracked work was the supplied `PROWORKS_Editorial_Product_Experience_Handoff/` directory. No `AGENTS.md` was present in the repository or its inspected ancestors. The older `PROWORKS-Complete-Codex-Handoff` directory was already absent and was not deleted or recreated.

- Production `main`: `04f3af27342bedb5f1aeffd75fc5a9452be43a43`, independently confirmed by the remote branch and the live `/release.json` on 17 October 2026.
- V2 [Draft PR #1](https://github.com/ismailabs/proworks/pull/1): open, draft, unmerged, head `2559bea06afa21b39840565d5188fa9cbae4d2c1` at audit. Its branch and PR are retained.
- V3: fresh `codex/proworks-editorial-product-v3` branch from verified `origin/main`. V2 was not merged. Reused changes are limited to the Inter dependency/license, configurable local evidence server, cross-browser configuration and interaction-capture test structure. V2 artwork, screenshots and its visual system are not the basis for V3.
- The live creator site returned HTTP 200 and contained `https://wa.me/601163265610`; the existing real studio and WhatsApp destinations are retained. Opening or verifying these links sent no message.
- GitHub quality workflows run verification and a local Worker bundle dry run. There is no production deployment command in the changed workflow. The production workflow remains manual and read-only.

## Supplied references actually inspected

Read the full master handoff and all Markdown in sections 00, 02, 03, 04, 05 and 06, plus tokens, routes, provenance and validation limitations. Inspected the local-preview index, all twelve route studies, their CSS and original SVGs. Opened all 48 route PNGs at original resolution, and the identity, component, three product-detail and four-scene motion boards. The 48 unchanged route references are retained in `design/editorial-v3/references/`, with SHA-256 identities in `reference-manifest.json`. The original supplied package remains present and ignored.

For **each row**, the inspected files are `desktop/<stem>-1440x1040.png`, `desktop/<stem>-full.png`, `mobile/<stem>-390x900.png`, and `mobile/<stem>-full.png` beneath the supplied `01-VISUAL-REFERENCES/` directory. These correspond directly to the committed copies and actual browser pairs.

| Page / reference stem     | Preserved route        | Desktop mapping                                                                                                                        | Mobile / full-page mapping                                                                                                  |
| ------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Home / `home`             | `/`                    | Ivory architectural cover, 55/45 composition, left statement, folded SVG and annotation; editorial three-perspective rail follows      | Copy and both CTAs precede the 325px art field; perspectives stack; existing deeper editorial content retained              |
| Platform / `platform`     | `/platform/`           | Full dark chapter, split title and explanation, central legibility disc and two orbital lines, three real product links                | Labels stay within the viewport with 44px targets; links and context remain available outside the drawing                   |
| Workflows / `workflows`   | `/products/workflows/` | Dark large-type chapter, 01–04 margin note, substantial four-column **working** state board in a forest/paper window                   | Two readable columns, one at 320px; proposal, consent, approval, status, history and reset continue below the specimen crop |
| Knowledge / `knowledge`   | `/products/knowledge/` | 40/60 editorial/source-library split, six real documents, search, native filters and disclosures, dark context band                    | Copy before the library; title/source text wraps; no aesthetic four-document substitution or fake keyboard shortcut         |
| Insights / `insights`     | `/products/insights/`  | Warm report chapter, fixture-derived fixed weekly cover figure, working period selector, metrics, seven actual bars and semantic table | Real controls and readable values take precedence over the miniature mock UI; all data and reset remain discoverable        |
| Technology / `technology` | `/technology/`         | Dark architecture chapter with four truthful boundaries, numbered vertical diagram, quiet editorial close                              | Stacked diagram retains descriptions; type measured to preserve the intended two-line headline at 390px                     |
| Experience / `experience` | `/experience/`         | Sculptural line cover and three interaction principles; original SVG, no continuous animation                                          | Copy and CTA precede 325px artwork; principles become readable rows; real native controls retained below                    |
| Compare / `compare`       | `/compare/`            | Large editorial opener and three lanes with dividers; sage centre lane; no prices                                                      | Three full-width paths; working choice finder and labelled scrollable table remain below                                    |
| About / `about`           | `/about/`              | Three-line concept story and symbolic Malaysian skyline, authorship caption and principle rail                                         | Story precedes 320px illustration; caption reflows; true concept/naming caveat retained below                               |
| Journal / `journal`       | `/journal/`            | Magazine lead, three numbered graphic covers, genuine titles, bylines, reading times and links                                         | Single-column articles; actual metadata replaces the specimen's schematic times and wording                                 |
| Guides / `guides`         | `/guides/`             | Quiet large-type help opener; **real** local search; numbered native answer disclosures                                                | 16px answer text and comfortable disclosure controls; all eight original answers, deep links and no-JS access retained      |
| Contact / `contact`       | `/contact/`            | Forest editorial close, three-line statement, real studio/WhatsApp actions and creator aside                                           | Stacked actions and creator block; original demo picker remains below; no enquiry form or false receipt                     |

## Functional and SEO protections

The runtime fixture JSON and three original article bodies are unchanged. Workflows still follows Intake → Prepare → Human review → Hand-off with named roles, reviewed-proposal checkbox, separate explicit approval, local history and reset. No automatic or external action was introduced. Knowledge preserves all six authored documents, categories, excerpts, sources, case-insensitive combined search, safe text rendering and empty recovery. Sources remain in native openable disclosures. Insights uses `[8,12,15,10,20,22,16]`, `[37,44,51,49]` and `[168,203,187]`; totals are 103/181/558, with separate review and duration snapshots. The cover's 103 is explicitly a weekly figure; the interactive report updates independently and labels its selected period.

All twelve routes and these articles remain:

- `/journal/mapping-a-repeatable-business-process/`
- `/journal/website-redesign-checklist-for-malaysian-smes/`
- `/journal/choosing-useful-dashboard-metrics/`

Historical `/products/flow/`, `/products/signal/`, `/design/`, `/company/` and `/support/` aliases remain in both slash forms. The separate legacy Worker additionally retains old-host HTML bookmark mappings and query-discard behavior. `public/_redirects`, `public/_headers`, both Worker sources/configs, canonical origin, preview-indexing logic and production workflow are unchanged. Metadata remains unique across 15 routes; honest WebPage/Article structured data, canonical URLs, 404 behavior and conditional sitemap remain. Default and branch previews are `noindex, follow`; production-mode local QA is explicitly distinguished from a deployment.

## Design and motion

Shared paper/ivory/forest/clay tokens, locally hosted Inter and OFL-licensed Noto Serif Display replace the blue V2 system. Only required Latin font files are served. The proposed three-stroke identity is an exploratory mark without a trademark-clearance claim. Local icon/social assets and existing conceptual diagrams follow the palette. Artwork is symbolic original SVG, never a screenshot standing in for controls or a claim about actual offices.

Below-fold entry translates visible sections by 16px over 550ms once; text never fades from zero opacity. Observer failure cannot hide content. Native navigation, focus, active/disabled controls and state messages carry meaning independently. Workflow borders/backgrounds provide short 180ms feedback alongside written statuses. Reduced motion disables nonessential transforms/transitions, including if the preference changes while the page is open. No scroll hijacking, continuous animation, WebGL, tracking or remote font provider was added.

## Discrepancy register

| Severity / disposition | Reference difference                                                                                       | Decision                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resolved / high        | Initial Technology and mobile Workflow headlines wrapped more than intended with the licensed display font | Measured actual glyph widths and adjusted route-specific sizes; no clipping or forced overflow                                                                |
| Resolved / high        | First CSS assembly exceeded the existing 45 KB gate                                                        | Replaced obsolete presentation rules with a smaller shared foundation; budget was not raised                                                                  |
| Resolved / high        | Initial inherited footer colour and small annotations failed contrast checks                               | Corrected foregrounds; extended mobile checks to real demo and FAQ surfaces                                                                                   |
| Intentional / medium   | Reference interface/body text often 7–15px                                                                 | Production body text is 16px; labels and metadata are generally 12–16px; real controls are at least 44px. Larger windows and longer pages are expected        |
| Intentional / medium   | Knowledge specimen shows four schematic rows, mislabels categories and includes an unimplemented ⌘K hint   | Actual six-document fixtures and source references retained; real filters/reset added; no non-working shortcut hint                                           |
| Intentional / medium   | Workflow specimen uses two decorative tasks per stage without its full approval process                    | Real stage/owner/proposal/consent/approval/history UI replaces those schematic tasks; hand-off cannot silently complete                                       |
| Intentional / medium   | Insights specimen bars do not match the fixture series and omits full controls                             | All actual bar values, period selector, definitions, accessible data and reset retained; no fabricated growth                                                 |
| Intentional / medium   | Prototype full pages are shorter than the existing site's content                                          | Existing useful page bodies, articles, contextual links and disclosures remain; shared notes use editorial dividers, not decorative filler cards              |
| Intentional / low      | Font rasterization and metrics differ from the authoring machine's locally resolved serif                  | Explicit licensed/self-hosted production font replaces environment-dependent local fallbacks; proportions and line breaks reviewed in actual browser captures |
| Intentional / low      | Reference desktop nav lacks the functional product disclosure; footer has little navigation                | Native Products disclosure and Escape behavior retained; all route and privacy links remain in the expanded footer                                            |
| Intentional / low      | Guides prototype search is a visual placeholder and lists four items                                       | Real local search across all eight original answers, empty recovery, clear/reset and native deep-linked disclosures                                           |
| Intentional / low      | Decorative numbers and small captions are very faint                                                       | Darkened to satisfy contrast while retaining their subordinate hierarchy                                                                                      |

No similarity percentage is asserted. Physical-device tests, a person using a native screen reader and browser-UI zoom are not implied by automated checks. Accessibility-tree inspection and CSS text enlargement are described as those specific forms of evidence.

## Review locally on Windows

From the repository directory, open `artifacts/editorial-v3/index.html` in a browser (double-click in File Explorer, or `Start-Process .\artifacts\editorial-v3\index.html`). It contains 24 reference/browser pairs, full-page expansions and interaction screenshots. Click an image for original resolution. All image paths work offline in the checkout; the references are also committed for CI reproducibility.

For an HTTP view of the gallery, run `node scripts/serve-editorial-review.mjs` and open `http://127.0.0.1:4322/`. That server exposes only review artifacts and retained reference images.

For the actual site: `npm ci`, `npm run build`, then `node scripts/serve.mjs`; open `http://127.0.0.1:4321/`. Default builds are noindex. To regenerate the browser gallery against that running server, run `node scripts/editorial-review.mjs`. The gallery is review evidence, not a production route. The GitHub Actions artifact contains an independently generated copy.

## Verification results

Final tested commands, coverage, performance runs, source revision, CI and protected-state rechecks are recorded below when delivery is complete. Failed intermediate checks are retained locally in the iteration logs; they are not presented as final passes.

- `npm run verify`: **72 Chromium tests passed** after the visual/accessibility fixes; Astro diagnostics had zero errors, warnings or hints. Ten width sweeps (320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920) cover all core pages; separate tests cover 844×390 landscape, CSS 200% text enlargement, keyboard/Escape/focus, reduced motion, no-JS content, original article links and all demo states.
- The final small improvements to guide deep-link recovery and the focusable Insights data region were followed by clean type/build/static checks and **2 targeted editorial tests passed**. Fresh CI runs the entire suite on the delivered head.
- `npm run format:check`: passed. Final static output: **15 unique titles/descriptions, 397 internal links, 126 asset references, 44,438 CSS bytes and 10,009 client-JavaScript bytes**. Existing 45 KB / 20 KB gates remain unchanged. Explicit and non-main branch preview noindex/canonical/robots/sitemap exclusions passed in the full verification run.
- Isolated local WebKit: **1 engine test passed**, covering all twelve routes and all three demos. Local Firefox fails at browser launch with `spawn UNKNOWN` on this Windows machine; it is not reported as a local pass. Linux CI installs and checks all three engines.
- `npx tsc -p worker/tsconfig.json` and `npx wrangler deploy --dry-run --outdir artifacts/editorial-v3/worker-dry-run`: passed; the latter is a local 0.83 KiB bundle and uploads nothing. Wrangler flags were checked against the installed 4.151.1 CLI and current official documentation. No Worker/DNS/domain mutation was performed. The Cloudflare connector requires reauthentication; no current provider build-trigger inspection through that connector is claimed.
- `node scripts/check-editorial-delivery.mjs`: 12 protected source files unchanged, all 48 committed references hash-verified, no findings in the custom high-confidence credential-pattern check. This is explicitly not a Gitleaks audit. All **93 supplied package checksums** were independently verified.
- One intermediate verification run overlapped two Playwright commands, causing an output-directory trace collision. That run also exposed two contrast issues. Both were repaired; final engine runs use separate output paths and execute sequentially. Intermediate logs remain locally available under ignored artifacts.

### Local mobile Lighthouse

Lighthouse 13.5.0, three fresh Chromium runs per route, simulated mobile throttling (150ms RTT, 1638.4 Kbps throughput, 4× CPU slowdown). Final runs were separate from browser testing. All nine final runs scored 100 for accessibility, best practices and SEO; every CLS measurement was zero. These are local measurements, not production or physical-device results.

| Route                                                   | Performance scores, all three runs | Median | LCP in ms, all runs | TBT in ms, all runs |
| ------------------------------------------------------- | ---------------------------------- | ------ | ------------------- | ------------------- |
| /                                                       | 77 / 100 / 100                     | 100    | 1729 / 1664 / 1666  | 1062 / 0 / 0        |
| /products/insights/                                     | 100 / 83 / 70                      | 83     | 1739 / 1844 / 1751  | 20 / 667 / 3261     |
| /journal/website-redesign-checklist-for-malaysian-smes/ | 100 / 97 / 100                     | 100    | 1668 / 1686 / 1669  | 20 / 179 / 0        |

Earlier exploratory Home runs scored 93 / 83 / 100, with TBT 317 / 616 / 0ms while other browser work overlapped. Those outliers are retained in `artifacts/editorial-v3/lighthouse/summary.json`; final measurements are in `lighthouse-final/summary.json`. The final article score of 97 is also retained, not averaged away or omitted.

A focused unchanged-source Insights investigation scored **83 / 77 / 89**, TBT **639 / 920 / 441ms**, LCP **1875 / 2086 / 1823ms**, and CLS 0 in all three runs. This confirms local variability remains; it is not dismissed as an overlapping-run artefact. A retained slow run attributes work to both the document and Lighthouse evaluation, which does not isolate a product-code cause. No performance pass threshold was invented or weakened. This performance limitation remains explicit for owner review; Linux CI performs an additional independent Lighthouse measurement. Full reports remain in `lighthouse-insights-investigation/`.
