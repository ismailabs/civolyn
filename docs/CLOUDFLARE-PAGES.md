# Future Cloudflare Pages deployment

**Preparation only. No deployment or DNS change has been performed.** The repository produces a static `dist/` directory. This guide is for a later, separately authorised publication.

## Connect the existing repository

In Cloudflare, open Workers & Pages, create an application, select **Pages**, then **Import an existing Git repository**. Authorise GitHub access to the existing `ismailabs/civolyn` repository. Do not create a replacement repository or select a Worker server deployment.

Use these settings:

| Setting           | Value                                                                            |
| ----------------- | -------------------------------------------------------------------------------- |
| Repository        | `ismailabs/civolyn`                                                              |
| Production branch | `main`                                                                           |
| Framework preset  | Astro (static), or None with the settings below                                  |
| Root directory    | Repository root                                                                  |
| Build command     | `npm run build`                                                                  |
| Output directory  | `dist`                                                                           |
| Node version      | 24, consistent with `.node-version` (or set `NODE_VERSION=24`)                   |
| `SITE_URL`        | `https://civolyn.ismailstudio.my`                                                |
| `SITE_INDEXABLE`  | `true` for final production, `false` while validating an initial unlaunched host |

No API keys, database, server adapter, `wrangler` command or Pages Functions are required. Do not run an automatic deployment from the GitHub Actions quality workflow; it only verifies source quality.

After connecting the Git integration, subsequent pushes to `main` ordinarily build and publish production. Other branch/PR deployments follow the Pages preview settings. Review those settings deliberately before connecting the repository: a future push will have external consequences once Git integration is enabled.

## Validate the first `pages.dev` deployment

Before attaching a custom domain, check the build log, deployed commit and output path. Visit the assigned `pages.dev` hostname and test all 12 routes, a deliberately missing route, local product interactions, menu behaviour, assets and enquiry destinations.

Check the browser console, content security headers, font loading and response codes. The project ships `404.html` so Pages should return a genuine 404 for missing paths instead of treating the site as a single-page app. Verify that on the actual host.

Keep `SITE_INDEXABLE=false` during initial validation if the intended domain is not active. `SITE_URL` should remain the intended canonical production origin. Cloudflare preview branch builds use noindex metadata automatically when `CF_PAGES_BRANCH` differs from `main`; a main-branch `pages.dev` host needs the explicit initial noindex setting until launch.

Do not block crawlers from reading a noindex directive with a conflicting robots disallow. Consider Cloudflare Access protection for private previews. Once the custom domain is active, configure a deliberate redirect from the production `pages.dev` hostname to the custom hostname if appropriate. Canonicals alone are a hint, not an access control.

## Attach `civolyn.ismailstudio.my` later

1. Determine the domain’s authoritative nameservers. The registrar and the authoritative DNS provider may be different services.
2. In the correct Pages project, choose **Custom domains → Set up a domain** and enter `civolyn.ismailstudio.my`. Associate the hostname with the project before making a standalone DNS change.
3. If the authoritative zone is already managed by the same Cloudflare account, follow the dashboard’s proposed DNS record and confirm its exact target. Review for an existing conflicting record before changing anything.
4. If DNS is external, follow Pages’ custom-subdomain process and add the required CNAME at the authoritative provider. The target is the assigned `<project>.pages.dev` hostname, without a scheme or URL path. Do not infer the project hostname from this guide.
5. Adding a subdomain does not inherently require moving the apex domain or changing nameservers. Preserve existing website, mail and other records. An apex-domain migration would be a separate decision.
6. Wait for Pages domain verification and certificate issuance, then test HTTPS directly. Check CAA restrictions or conflicting Access/redirect rules if verification stalls; do not change unrelated records speculatively.

The exact steps depend on the live authoritative zone, account permissions and Cloudflare configuration. None of those have been audited or modified for this local delivery.

## Final publication checks

- Confirm `SITE_URL` matches the final HTTPS origin and rebuild with `SITE_INDEXABLE=true` only when the final host is ready to be indexed.
- Inspect canonical and social-image URLs, `robots.txt`, `sitemap-index.xml` and all 12 entries in `sitemap-0.xml`.
- Confirm final production emits `index, follow`, while previews and the 404 remain non-indexable as intended.
- Verify HTTPS, redirects, trailing slash URLs, real 404 responses, headers, local fonts and all image variants.
- Repeat browser and accessibility checks against the actual public host. Measure hosted performance separately from local Lighthouse.
- Recheck the real ISMAIL and WhatsApp destinations before public launch. The WhatsApp destination was verified from the public portfolio on 16 October 2026.

## Build failure or DNS issue?

If the build fails before a deployment exists, inspect the Pages build log, Node version, npm lockfile, command and `dist` path. Reproduce with `npm ci && npm run build`. DNS cannot fix a failing build.

If the build succeeds but the `pages.dev` hostname fails, inspect the deployment/output and Cloudflare service status. If `pages.dev` works but the custom domain fails, inspect custom-domain association, authoritative DNS records, certificate status, CAA and conflicting domain rules. Check the actual response before changing configuration.

## Rollback

In Pages **Deployments**, select a previously successful production deployment and use its actions menu to roll back. Preview deployments are not production rollback targets. Then fix the source in a normal new Git commit. Review automatic deployments so a new push does not immediately republish the problem. Do not force-push or rewrite Git history to perform a hosting rollback.

## Official references checked for this guide

- [Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Build image and Node version overrides](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Debugging Pages](https://developers.cloudflare.com/pages/configuration/debugging-pages/)
- [Production rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)

The referenced Astro documentation also covers SSR. This project uses static output, so do not add the Cloudflare SSR adapter merely to serve these files.
