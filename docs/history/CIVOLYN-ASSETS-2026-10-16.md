# Original assets and provenance

> Historical CIVOLYN asset record. Current PROWORKS provenance is in `../ASSETS.md`.

The supplied CIVOLYN reference images were inspected as creative direction: warm ivory, cobalt, tactile architecture, selective editorial serif and original interface compositions. Reference screenshots and embedded wording are not used as page content or shipped as finished assets.

## Generated architectural artwork

Created using the built-in image-generation tool on 16 October 2026. The selected image was inspected, copied into the project and optimised. The project retains a WebP master at `src/assets/clarity-architecture.webp`; responsive 640, 960 and 1440px variants are in `public/images/`. The original unoptimised PNG is not a runtime dependency.

Final generation prompt:

> Use case: stylized-concept. Asset type: original editorial architectural artwork for CIVOLYN enterprise software portfolio website. Create a premium photographic 3D still life: a monumental sculptural cobalt blue open circular arch made from brushed anodized aluminum, resting on a warm ivory limestone plinth, subtle sage olive branch at far right, pale warm plaster architecture and open sky. Strong afternoon sun and precise beautiful shadow, sophisticated quiet modern architecture, tactile material, restrained composition. Landscape 3:2 ratio, object on right two thirds with clear negative space at left. Palette ivory #F7F6F2, cobalt #2048EC, near-black #111318, pale mist #DCE4FA. No text, logos, interfaces, screens, people or watermarks. This is supporting conceptual art, not a website mockup.

The artwork is conceptual, not a photograph of an actual CIVOLYN office. The homepage treats it as decorative. The company page supplies descriptive alternative text and an explicit original-study caption.

## Code-native assets

- Original open C mark and CIVOLYN wordmark: `Logo.astro` and `public/favicon.svg`.
- PNG favicon (32px) and Apple touch icon (180px), generated from the SVG.
- Social preview: original vector composition in `public/images/social-preview.svg`, rasterised to `public/social-preview.png` at 1200 × 630.
- Three product interface compositions in `ProductShelf.astro`, plus native interactive product previews.
- Original responsive workspace in `Workspace.astro`; the interface is HTML/CSS, not a screenshot.
- Conceptual technical architecture and design specimen are semantic HTML/CSS.
- Interface symbols are original simple typographic treatments; decorative symbols are hidden from assistive technology where appropriate.

Regenerate the reproducible assets with `npm run assets:brand`. This uses Sharp and does not call an image API. Keep the artwork master and SVG sources if changing sizes.

## Fonts

Manrope Variable (Latin, normal, one variable WOFF2) and Instrument Serif (Latin, 400 italic WOFF2), sourced through the Fontsource npm packages. SIL Open Font License copies are committed in `docs/licenses/`. Font files are bundled locally; the visitor does not contact Google Fonts or a CDN.

All product data, sample sources, journal articles and marketing copy are original fictional project content. There are no real customer names, testimonials, awards, fabricated certifications or commercial performance claims.
