# Cloudflare Worker operations and rollback

The production origin is [proworks.ismailstudio.my](https://proworks.ismailstudio.my/), served by Worker `proworks` in account `44214a829e2337ca50cf40e4cd827cba`. The old hostname is attached to the separate `civolyn` redirect Worker. Both configurations are scoped to their exact hostname; workers.dev and version-preview URLs are disabled. No Cloudflare Pages project is used.

## Observed migration state

On the resumed authenticated run, Workers Scripts and Services APIs showed neither project Worker. Their domain bindings and zone routes were also absent, and both names failed public resolution. This superseded the earlier snapshot of a live static-assets CIVOLYN Worker. Its removal was external to this implementation; no full original deployment remained to capture or roll back. Initial receipts are preserved under `artifacts/migration/` and the historical pre-deployment report.

PROWORKS was created and qualified noindex on its exact custom HTTPS domain. After checking fifteen routes, source/asset hashes, headers, true 404, all three demos and twenty-four browser captures, the indexable build was deployed and checked again. Main was fast-forwarded normally only after the new production checks passed. The old hostname was then recreated as a redirect Worker and tested independently. Current final revision/version identities are in the release report, production evidence and public `/release.json`.

Cloudflare Custom Domains provisioned the two exact hostname bindings, DNS and certificates. OAuth did not permit direct DNS-record enumeration (403), and no direct DNS write was performed. No apex, mail, wildcard, nameserver or zone-wide setting was changed. The two unrelated Workers' modification timestamps were unchanged at the post-cutover check.

## Source and deployment triggers

The repository was renamed in place to `ismailabs/proworks`; ID `1421054534` and prior ancestry are preserved. `main` contains the validated rebrand. GitHub Actions runs build/static/browser/type checks and a deployment dry run; it does not perform production deployment. GitHub repository webhooks were empty.

A stale GitHub Pages legacy/Jekyll trigger on main was found after integration. It had no custom domain, an errored status and a public 404. Its configuration was recorded, then that unused Pages site was disabled (DELETE 204, subsequent settings GET 404). No repository content or history was removed. The original setting could be restored through the Pages API with `build_type: legacy`, source `main` at `/`, but it is not the intended hosting path.

No Cloudflare Git integration was created during CLI deployment. The Builds API requires permission beyond the working OAuth session (403), so no claim of a successful Builds API inventory is made. The new Worker was created by Wrangler; no old Worker remained attached to an old trigger. Deployment remains an explicit reviewed CLI operation.

## Repeatable release

Use this existing checkout, Node 24 and the locked dependencies. Authenticate locally with Wrangler; the user's Windows login was verified accessible to this same execution environment. Do not copy credential files into source or logs.

1. Fetch and inspect main, confirm a clean checkout and passing quality CI. Run `npm run verify`, Worker TypeScript and dry run as appropriate to changed files.
2. Build with `SITE_URL=https://proworks.ismailstudio.my` and explicit `SITE_INDEXABLE=true`. A default build is noindex; non-main Worker CI builds are also noindex. `release.json` records commit, dirty state and indexability; hosted verification rejects dirty builds.
3. Deploy using `node node_modules/wrangler/bin/wrangler.js deploy` from the clean committed checkout. Confirm the returned full Worker version and custom domain. Never accept an unexpected DNS/domain ownership overwrite.
4. Set `EXPECTED_SHA` to the intended commit and run `node scripts/verify-hosted.mjs`. It verifies fifteen routes, hosted/local byte identity, referenced asset hashes, canonical/robots/sitemap/CSP, true 404, three demo flows and desktop/mobile screenshots.
5. Run `node scripts/verify-redirects.mjs` to verify all 46 old slash/HTML variants, direct destination 200s, discarded queries, HEAD, missing 404 and POST rejection. The redirect configuration is `wrangler.legacy.jsonc`; it must remain a separate deployment.

For a newly introduced domain, qualify a noindex build first with `VERIFY_INDEXABLE=false`, then promote and repeat with `VERIFY_INDEXABLE=true`. Preserve both receipts. Never activate an old-host redirect before the new production gate passes.

## Verification environment

The local network's router resolver retained NXDOMAIN after public DNS propagated. Public Cloudflare and Google resolvers independently returned the real target addresses. `VERIFY_PUBLIC_DNS=true` enables a verification-only helper for these two project hostnames; Node and Chromium use current public answers while preserving hostname, SNI and certificate validation. No system DNS or hosts file is changed. Use it only when the ordinary resolver is stale, and disclose it in results.

For the full browser suite against production, set `TEST_ORIGIN` to the new origin and `SCREENSHOT_DIR=artifacts/production/screenshots`. `PLAYWRIGHT_JSON_OUTPUT_NAME` and `PLAYWRIGHT_HTML_OUTPUT_DIR` can keep hosted evidence separate. If using the DNS helper, preload `scripts/verification-dns.mjs` with Node's `--import` option as well as setting `VERIFY_PUBLIC_DNS=true` so Playwright's API request process receives the same resolver behaviour.

The Worker adds HTML-only `Cache-Control: no-transform` to prevent provider-wide automatic analytics injection. This corrected a real hosted CSP error while leaving unrelated analytics configuration untouched. Static immutable asset caching remains intact. No named analytics provider is configured; see [analytics](ANALYTICS.md).

## Rollback

The first fully verified indexable PROWORKS version is `8017a39b-b9b5-402c-b75d-39c8c035cf1e`, built from clean commit `ba73a46fbcfa8d5e735aeac2840ef59aaf523db9`. Its qualified noindex predecessor is `cfc6b7e8-a02f-4be2-8eb1-1ea0b1a2d17f`. Both are retained by the provider. Use `wrangler rollback <verified-version-id> --message <reason>` to restore a known version, then repeat live checks; the final report may identify a newer verified version.

The verified old redirect version is `033b1c2e-e59f-41aa-bebb-d1d891589f8d`. Roll it back independently through `wrangler rollback --config wrangler.legacy.jsonc <version-id>` if a later redirect revision regresses. The original pre-migration CIVOLYN version no longer existed at preflight, so restoring it is not a supported rollback claim. To serve old content again would require a separately reviewed build from the preserved Git baseline.

Retain the two project custom domains and redirects. Do not remove or reassign unrelated resources. Record any new rollback/version observations rather than relying on these IDs indefinitely.
