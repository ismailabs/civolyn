# Design-to-browser comparison — 17 October 2026

All twelve desktop (1440 × 1040) and twelve mobile (390 × 900) references were inspected before coding. Actual Chromium captures exist for every core route, both full-page and viewport crops, under `artifacts/screenshots/`. Twenty-four left-reference/right-browser comparison images and desktop/mobile overview sheets are under `artifacts/visual-comparison/`. These are qualitative reviews, not a fabricated pixel-similarity score.

After deployment, all twelve pages were captured again through the actual custom HTTPS host at both sizes. A second set of 24 left-reference/right-production pairs, plus desktop/mobile overview sheets, is retained under `artifacts/production/comparisons/`. Both overview sheets were inspected. They preserve the reviewed layout, colour, typography and component decisions; full hosted captures and independent CI screenshots provide the page-level evidence. The adaptations below remain applicable. No pixel-perfect or automated similarity percentage is asserted.

## Observed refinements

The first implementation had narrow primary buttons, oversized preview chart height, smaller visual hierarchy, and several three/four-line headings. Refinement restored approximately 249/243-pixel desktop/mobile primary actions, the 376-pixel desktop preview rhythm, the navy panel treatment, 18-pixel cards, paper/cobalt palette, 88/72-pixel header rhythm, 92/24-pixel gutters at the reference sizes, and page-specific heading scales. Feature-card filler became useful original copy. No text is intentionally clipped.

| Page       | Desktop/mobile comparison and justified adaptation                                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home       | Retains split editorial hero, summary panel, three modules and navy bridge. Uses fixture total 103/review 9, not mockup 126/12. Adds an adjacent fictional notice.                                                         |
| Platform   | Retains the three-perspective proposition and reporting panel. Heading scale reduced to keep the full second line visible. Complete lifecycle and product links extend below the crop.                                     |
| Workflows  | Retains numbered stage rows and review highlight. Uses accurate stage names. The full working approval UI, owners, proposal and log live below the introductory composition.                                               |
| Knowledge  | Retains desktop library preview and source hierarchy. Mobile uses the same useful sample-library preview rather than three generic instruction rectangles; the actual searchable library follows below.                    |
| Insights   | Retains metric/bar composition with exact fixture values and visible period labels. Desktop heading is smaller; the long mobile sentence wraps rather than reproducing reference clipping.                                 |
| Technology | Retains the four-stage concept preview. Complete static/frontend boundaries, implementation sequence and original diagram replace unsupported infrastructure claims.                                                       |
| Experience | Retains editorial proposition and three-path desktop panel. Mobile carries the contextually relevant path panel instead of an unrelated dashboard; native control examples extend the page.                                |
| Compare    | Retains numbered product roles, feature modules and clear primary action. Adds a real choice finder and labelled scrollable comparison with a reset.                                                                       |
| About      | Retains the two-line story proposition and creator pathway panel. Mobile follows the meaningful desktop path panel rather than arbitrary metrics. Adds truthful creator attribution and naming-risk disclosure.            |
| Journal    | Retains source-list-style intro panel and thematic modules. Long copy uses a smaller scale; three original articles are actual routes, not dead mock links.                                                                |
| Guides     | Retains search/library-style preview and helpful modules. Full native FAQs, keyboard guidance and privacy explanations follow.                                                                                             |
| Contact    | Retains creator-first headline, three honest paths and primary portfolio action. Mobile uses those paths rather than fictional reporting figures. Real portfolio/WhatsApp links replace any suggestion of a PROWORKS form. |

## Shared adaptations

The mockups are authored crops and contain visibly clipped long headings, generic filler and differing illustrative figures. Semantic requirements and working fixture data take priority. Manrope is locally licensed and served; PIL/system-font raster text is not copied as an unlicensed binary. The original supplied geometric mark replaces the simple mockup P glyph.

The mobile fixed bottom disclosure is replaced by an adjacent hero notice plus a complete concept bridge/footer to avoid covering content or focus. The real pages continue beyond the mockup crop with substantive page-specific content. Working demos are separate complete accessible sections reached by the primary actions, so simplified illustration rows are not misrepresented as controls.

Checks include all ten required widths (320 through 1920), 844 × 390 landscape navigation, keyboard operation, 200% text enlargement, reduced motion and no-JavaScript content. Automated axe results and real-engine coverage are reported separately. No physical-device, manual screen-reader or formal WCAG certification claim is made.
