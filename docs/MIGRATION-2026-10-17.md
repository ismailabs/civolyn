# PROWORKS authenticated migration — 17 October 2026

Status: **in progress; production not yet verified**.

Windows Wrangler authentication is now accessible in this same local execution environment. `whoami` confirmed account `44214a829e2337ca50cf40e4cd827cba`. The connector still requires reauthentication, but the local CLI/API session works. Tokens remain in the standard Wrangler credential store and are never printed or committed.

## Authoritative preflight

- Source `6d07a1f744ba6e097a21985ccbb9ab8fe63b92ca` is clean on `codex/proworks-rebrand`; GitHub CI run `38999783201` passed on that revision. The existing renamed repository retains ID `1421054534` and all prior ancestry. Main remains `34b5027e9ac148964a6fe754fe7be89cbc91c9b1`.
- Both Workers Scripts and Services APIs currently list exactly two unrelated Workers. Neither `civolyn` nor `proworks` exists. Direct `civolyn` settings/deployments/subdomain reads return 404/code 10007. These observations supersede the earlier dashboard snapshot; their removal was not performed by this implementation.
- The zone `ismailstudio.my` is active and belongs to the expected account. Workers custom-domain inventory contains neither project hostname. The zone Workers-route inventory is empty. Both project hostnames fail public resolution before migration.
- OAuth lacks direct DNS-record API access (403), despite allowing zone identification and scoped Worker custom-domain operations. The migration uses exact-host custom-domain provisioning through Wrangler; it must not force an overwrite if Cloudflare detects a conflict. No apex, wildcard, mail or unrelated record change is authorised or planned.
- No original `civolyn` deployment exists to capture or roll back. The prior Git baseline and earlier public screenshots are preserved. The safe sequence is to create and verify PROWORKS first, then recreate only the authorised old hostname as a redirect Worker. There is no existing Worker build trigger to disable on either project. GitHub Actions currently verifies and dry-runs only; it does not deploy.
- Cloudflare Web Analytics API rejects this OAuth authentication scheme (405/code 10405). No authorised named analytics provider/property is currently usable. Existing frontend event attributes remain inert.

Raw timestamped provider and routing preflight receipts are kept under ignored `artifacts/migration/`. The final report must record exact build SHA, full Worker version IDs, domain bindings, TLS/HTTP results, production browser checks, all old-path single-hop 301s and rollback instructions. A local build or a GitHub push is not production proof.
