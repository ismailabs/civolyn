# PROWORKS visual reconstruction — review candidate

Implementation date: 17 October 2026, Malaysia time. Feature branch: `codex/proworks-visual-fidelity-v2`. Baseline: `04f3af27342bedb5f1aeffd75fc5a9452be43a43`.

Status: implemented locally; release held for the user's visual approval. No merge, deployment, DNS change, Worker modification or CIVOLYN redirect change is authorised by this work.

## Scope and source protection

All twelve primary routes retain their full below-fold journeys. The three Journal article files and URLs, four workflow stages, separate review confirmation and approval, owners/history/reset, six searchable sourced documents, three Insights fixtures (103/181/558), accessible tables, comparison finder, FAQ deep links, contact demo picker, real ISMAIL/WhatsApp destinations, privacy boundary and 404/redirect behavior remain.

The actual repository remote is `https://github.com/ismailabs/proworks.git`; the checkout directory still has its historical `civolyn` name. No other checkout was edited. `PROWORKS-Complete-Codex-Handoff/` was absent at the initial audit and was not deleted or recreated. Its existing ignore rule remains. The supplied visual package is retained untouched; all 50 supplied SHA256 hashes matched. The package itself stays untracked. Small exact route-reference copies under `design/reference-v2/` make CI comparisons reproducible without bundling speculative concept explorations.

## Implementation

The floating white header, sky/paper fields, navy product chrome, electric blue actions, typography, card geometry and desktop/mobile spacing follow the new references. Each page uses its appropriate composition: overview, product pathway, four-column stage board, source library, report, architecture stack, illustrated skyline, three-product comparison, editorial articles, guide resources or genuine external contact choices. Runtime panels use HTML, CSS, inline SVG icons and the existing fixtures. Full page screenshots are never runtime assets.

Typography uses a locally hosted Inter variable Latin font, with its OFL licence in `docs/licenses/inter-OFL.txt`, as specified by the reference package. This follows [Fontsource's variable-font workflow](https://fontsource.org/docs/getting-started/variable) and [Inter's licence record](https://fontsource.org/fonts/inter/about). Original Manrope and Instrument Serif dependencies/licences remain available. The original supplied PROWORKS SVG mark remains in the header/footer, despite the artboards' schematic blue icon.

The two supplied original illustrations are locally optimised WebP assets. A new AI-generated editorial workplace image appears below the Experience hero and carries an explicit fictional-scene caption. It represents no real customers or team. See `docs/ASSETS.md` for its prompt, provenance and saved paths.

## Visual comparison method

`node scripts/visual-fidelity.mjs before` captures the immutable baseline served on localhost:4322. `node scripts/visual-fidelity.mjs after` captures the current build on localhost:4321. Both use Chromium, reduced motion, a light colour scheme and loaded local fonts at 1440×1040 and 390×900. Viewport and full-page screenshots are separate. Each final route has an exact-size reference/browser pair and a 50% reference overlay. The overview boards are convenience indexes; the full-size pairs govern review. No numeric fidelity percentage is asserted.

Evidence is under `artifacts/visual-fidelity-v2/`: `before/`, `iteration-1/`, `after/`, `comparisons/after/`, `states/`, overview boards and machine-readable test results. `scripts/visual-fidelity.mjs` reproduces the final comparisons from the committed reference copies in CI. Baseline screenshots were taken from a preserved pre-edit build, never reconstructed from changed source.

## Discrepancy register

| Severity       | Finding                                                                                   | Resolution / deliberate adaptation                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Major, fixed   | Original plain full-width header and short grey hero lacked the supplied composition      | Floating 69px desktop / 59px mobile header, sky fields and reference-sized split hero                                                                |
| Major, fixed   | First-pass heading wrapping differed on Technology, Experience, Workflows and Guides      | Inter proportions, route-specific desktop sizes and explicit mobile line breaks                                                                      |
| Major, fixed   | Workflow preview was a vertical step list                                                 | Four visible columns on desktop, readable 2×2 mobile board; full working approval demo retained below                                                |
| Major, fixed   | Mobile CTA lacked the reference's second action                                           | Full-width primary and white companion actions, each with at least 44px target height                                                                |
| Major, fixed   | Preview chrome text inherited dark ink during legacy CSS consolidation                    | Explicit white text; regression rechecked with axe                                                                                                   |
| Major, fixed   | Duplicate presentation rules exceeded the existing 45KB CSS gate                          | Remove superseded legacy declarations; preserve the gate                                                                                             |
| Major, adapted | Several drawing-only labels and eight dashboard bars differ from authoritative fixtures   | Use seven actual weekly values, real source titles, real article titles and real routes; no fabricated values                                        |
| Major, adapted | Mobile Journal/Guides drawings reuse fictional document lists                             | Use actual article links and FAQ links, retaining compact responsive resource rows                                                                   |
| Major, fixed   | About reference requires a pale city illustration distinct from the supplied dark skyline | Author an original SVG city/twin-tower illustration and creator card; keep the supplied standalone dark illustration on Experience; no artboard crop |
| Minor, adapted | Desktop header drawing uses five direct product links                                     | Preserve the working Products disclosure and Guides access; add desktop Knowledge/Insights shortcuts                                                 |
| Minor, adapted | Original SVG mark differs from schematic reference pixels                                 | Keep the authoritative original SVG, as explicitly required                                                                                          |
| Minor, adapted | Real page bodies and longer source descriptions need more space than drawings             | Retain all source content, natural card height, accessible type, logical reflow and full-page evidence                                               |

## Verification

Final measured results, test totals, performance medians and browser limits are recorded in `docs/evidence/visual-fidelity-v2.json`. Tests cover semantic structure and assets on 12 core pages + 3 articles, WCAG axe checks, widths 320/360/375/390/430/768/1024/1280/1440/1920, 844×390 navigation, 200% text enlargement, keyboard/Escape/focus, no JavaScript, reduced motion, no transmitted searches/analytics, actual approval and reset, document filters/empty states, coherent report periods/tables, comparison/contact selectors, legacy aliases, 404, metadata, canonical and noindex preview builds.

Browser evidence is a local automated simulation. Physical-device and assistive-technology user testing are not claimed. A 200% text-enlargement/reflow test is not a measurement of every browser's native zoom UI. Lighthouse scores describe the local build and its configured mobile throttling, not production traffic.

## Release boundary

User visual approval: pending. Production deployment: not performed. Production branch was not advanced by implementation. The release candidate must be reviewed via the attached screenshots/local preview before authorising a merge or production deployment. Keep the production-quality gate and independent hosted checks for that later release. No automatic analytics, forms, SaaS accounts, paid plans or external data providers were added.
