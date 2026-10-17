# Cloudflare Worker migration and rollback

## Observed baseline

The authenticated dashboard identifies `civolyn` as a static-assets Worker, linked to custom domain `civolyn.ismailstudio.my`. The visible deployment prefix is `da9f048c`; this is not a full deployment ID or a confirmed Git SHA. Workers.dev is disabled. The dashboard shows no runtime data bindings, compatibility date 2026-10-12, and flag `global_fetch_strictly_public`.

Builds target `ismailabs/civolyn`, production branch main, `npm run build`, `npx wrangler deploy`, root /. No build variables were displayed. The UI warns the Git integration is disconnected. No old build setting, Worker, custom domain or DNS record has yet been changed by the implementation step.

Public HTTP baseline: all twelve old core routes returned 200 with matching old canonicals; old desktop/mobile screenshots and header receipts are in `artifacts/baseline/`. The local initial source was commit `34b5027e9ac148964a6fe754fe7be89cbc91c9b1`.

## New Worker

`wrangler.jsonc` targets `proworks`, static `dist/`, forced trailing slashes, a real 404 page, an ASSETS binding and a small streaming response handler. It preserves static asset headers and sets noindex on 404. Workers.dev and version preview URLs are disabled. No unrelated bindings, account resources or paid services are configured.

Default builds are noindex. Explicit production mode uses `SITE_INDEXABLE=true`; `SITE_URL` remains the target HTTPS origin. `release.json` records the build commit, whether source was dirty, and indexability. Hosted verification rejects a dirty source build; rebuild from the clean committed checkout before deployment. The current release report determines what was actually deployed.

## Safe release sequence

1. Reinspect account, target Worker name, custom domains and exact DNS records. Do not overwrite a conflicting resource.
2. Preserve the old deployment/version and build configuration. Disable the old project's automatic builds before advancing the renamed repository main branch.
3. Commit/push reviewed source normally. Rename the same GitHub repository in place, verify stable repository ID/history and update origin. Never force push.
4. Build noindex from the committed source. Deploy the new Worker with the exact intended custom domain after checking conflicts. Cloudflare Custom Domains can manage its own relevant DNS/certificate; do not copy an AAAA placeholder blindly.
5. Run `scripts/verify-hosted.mjs` with `EXPECTED_SHA` and `VERIFY_INDEXABLE=false` for the staging host. Check all routes, bytes, assets, HTTPS, headers, 404, demos and mobile.
6. Rebuild indexable from the same committed source, redeploy and repeat hosted verification with `VERIFY_INDEXABLE=true`.
7. Only after the preceding production checks pass, deploy the scoped `wrangler.legacy.jsonc` old-host handler and repeat hosted checks with `VERIFY_OLD_REDIRECTS=true`.

The old handler maps all twelve old URLs directly, including the five changed slugs, slash forms and HTML bookmarks. Arbitrary query strings are discarded; unexpected hostnames are rejected; unknown paths return 404. Its local test does not establish active hosted redirects.

## Rollback

Before changes, capture the full actual old version/deployment ID through the authenticated provider. If the new host fails, leave the old host serving its preserved content. Do not activate redirects. If a later regression occurs, roll back PROWORKS to its last verified Worker deployment; if old redirects must be reversed, restore the captured pre-cutover CIVOLYN version using Cloudflare deployment controls. Restore only a DNS/binding value actually changed by this release, using the recorded prior value. No nameserver, apex, mail or unrelated resource changes are part of this task.

## Authentication boundary

The connector repeatedly returned `UNAUTHORIZED` / “This app connection requires reauthentication.” Wrangler remained unauthenticated after expired OAuth callbacks. The user then reported that they were unable to authorise the valid scoped prompt. There is no working authenticated API/CLI session for deployment, bindings, DNS or old-build control. No further approval is needed for the authorised migration; usable platform authentication is missing.

The existing repository was renamed in place to `ismailabs/proworks`, retaining repository ID `1421054534`. Its origin was updated. The rebrand is delivered on `codex/proworks-rebrand`; main is deliberately retained at the original commit until old Worker builds can be controlled and production can be verified. No Worker, build setting, domain or DNS record was mutated. Source, dry runs and local workerd tests are not deployed production proof. See the release report for exact delivery evidence.
