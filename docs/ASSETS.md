# PROWORKS asset provenance

The complete PROWORKS handoff was read before coding. All 12 desktop and 12 mobile authored references, three product-interface references, three concept boards and the production SVGs were inspected. Authored mockups are visual references, never deployed as page screenshots or presented as implementation evidence. Generated concept-board statistics, prices and claims were not copied.

The supplied original mark, wordmark, dark lockup and favicon are retained under `public/images/brand/`; the supplied social image is `public/social-preview.png`. Original architecture diagrams are under `public/images/diagrams/` and used with adjacent explanations and text alternatives. The geometric mark is used in the live header and footer. Favicon PNG variants are rasterised from the supplied SVG with Sharp; no system font binary was copied.

Page panels, cards, charts and product controls are HTML/CSS, not flattened reference images. Their figures come from `src/data/demo-fixtures.json`, with explicit illustrative labels. Old unused CIVOLYN social and architectural runtime assets were removed. The historical asset record remains under `docs/history/`.

Typography uses the existing locally served Manrope variable font with its OFL licence in `docs/licenses/`. The original Instrument Serif dependency and licence remain available, but the chosen Quiet Cobalt interface does not depend on a downloaded system font. Logo SVG text uses a generic Arial/sans-serif fallback. No remote font, stock-image or asset CDN request is needed.

## Editorial V3 review revision

The supplied original folded architecture, kinetic line, Malaysian silhouette and geometry studies are retained as local SVGs in `public/images/editorial-v3/`; no external brand artwork or customer photography is used. Page references and SHA-256 identities are in `design/editorial-v3/`. The proposed three-stroke mark remains an identity study without trademark clearance. New icon and social-preview SVG sources are in `public/images/brand/`; `npm run assets:brand` regenerates their raster exports. Existing conceptual diagrams retain their labels and use the editorial palette.

Inter Variable 5.3.0 and Noto Serif Display 5.3.0 are self-hosted through Fontsource, with OFL texts in `docs/licenses/inter-OFL.txt` and `docs/licenses/noto-serif-display-OFL.txt`. No font binaries came from the handoff or inspiration websites. Noto Serif Display regular Latin is used for headings; actual measurements informed responsive line breaks.
