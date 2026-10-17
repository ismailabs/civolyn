# Editorial Product Experience / supplied V3 reference revision

`routes.json` is the unchanged supplied visual route inventory. `references/` retains all 48 original viewport and full-page PNGs. `reference-manifest.json` records their SHA-256 identities and dimensions are validated during actual browser capture. All 48 images were individually opened at original resolution before implementation, alongside the brand/component/interface/motion boards and full written handoff.

Original illustrative SVG studies are incorporated in `public/images/editorial-v3/`. The supplied package remains retained and ignored in the checkout. Its static HTML is a visual specimen, not the application's behavioral source of truth. Runtime pages use semantic Astro components, the existing authored content and actual local demo fixtures.

See `docs/EDITORIAL-V3-REVIEW.md` for the route mapping, intentional functional/readability adaptations and release boundary. Actual browser evidence is in `artifacts/editorial-v3/`, never served as product UI.
