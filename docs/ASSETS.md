# PROWORKS asset provenance

The complete PROWORKS handoff was read before coding. All 12 desktop and 12 mobile authored references, three product-interface references, three concept boards and the production SVGs were inspected. Authored mockups are visual references, never deployed as page screenshots or presented as implementation evidence. Generated concept-board statistics, prices and claims were not copied.

The supplied original mark, wordmark, dark lockup and favicon are retained under `public/images/brand/`; the supplied social image is `public/social-preview.png`. Original architecture diagrams are under `public/images/diagrams/` and used with adjacent explanations and text alternatives. The geometric mark is used in the live header and footer. Favicon PNG variants are rasterised from the supplied SVG with Sharp; no system font binary was copied.

Page panels, cards, charts and product controls are HTML/CSS, not flattened reference images. Their figures come from `src/data/demo-fixtures.json`, with explicit illustrative labels. Old unused CIVOLYN social and architectural runtime assets were removed. The historical asset record remains under `docs/history/`.

Typography uses the existing locally served Manrope variable font with its OFL licence in `docs/licenses/`. The original Instrument Serif dependency and licence remain available, but the chosen Quiet Cobalt interface does not depend on a downloaded system font. Logo SVG text uses a generic Arial/sans-serif fallback. No remote font, stock-image or asset CDN request is needed.

## Visual fidelity v2 — 17 October 2026

The v2 interface uses self-hosted Inter Variable 5.3.0 from `@fontsource-variable/inter`, distributed under OFL-1.1; the bundled licence is `docs/licenses/inter-OFL.txt`. The earlier paragraph records the prior typography. Manrope and Instrument Serif are retained as dependencies but are no longer loaded by the v2 pages.

`src/components/Skyline.astro` is an original native SVG illustration authored for the pale About composition: geometric buildings, decorative window pattern and stylised twin towers. It uses no raster crops or photographic source.

`public/images/editorial/abstract-blue.webp` and `malaysian-skyline.webp` are WebP optimisations of the two user-supplied original programmatic illustrations in `PROWORKS-Visual-Design-Reference-Package/05-visual-assets/`. Their provenance file identifies them as original illustrations. They are not photographs. No collage crop, speculative exploration, stock photo or external CDN asset is used.

`public/images/editorial/malaysian-workplace.webp` is a new original AI-generated editorial image, made with the built-in image-generation tool for this project on 17 October 2026. Original output: `C:/Users/moham/.codex/generated_images/01a14921-f7dd-7070-8f01-9c432fe8bb67/exec-2dcb77f0-e607-4b56-b1d5-3725b6e1847c.png` (1536×1024). It was inspected and converted to WebP quality 84. It is explicitly captioned as a fictional scene, with no customer/employee attribution. The source remains preserved at its generated path.

Final generation prompt: "Use case: photorealistic-natural. Asset type: supporting editorial photograph for a fictional Malaysian small-business software portfolio website. Create one high-resolution landscape 3:2 candid documentary-style image of three adult Malaysian coworkers around a modest small studio desk reviewing a paper process map, one laptop, notebooks, natural daylight from a large window, tropical greenery and understated Malaysian shophouse architecture outside. Warm human atmosphere with restrained cool blue interior accents, ordinary casual professional clothes, believable anatomy and hands, premium editorial composition, photographic realism. No text, logos, brands, watermarks, readable documents or readable screens. These are entirely fictional illustrative people and must not resemble public figures. Keep everyone in the middle of frame with usable edges for responsive cropping. Output one single photograph, no collage or UI."
