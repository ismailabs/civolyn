import { spawnSync } from 'node:child_process';
const env = { ...process.env, SITE_INDEXABLE: 'true' };
for (const [file, args] of [
  ['node_modules/astro/bin/astro.mjs', ['check']],
  ['node_modules/astro/bin/astro.mjs', ['build']],
  ['scripts/stamp-build.mjs', []],
  ['scripts/verify-build.mjs', []],
  ['scripts/check-preview.mjs', []],
  ['node_modules/@playwright/test/cli.js', ['test']],
]) {
  const r = spawnSync(process.execPath, [file, ...args], {
    env,
    stdio: 'inherit',
  });
  if (r.status !== 0) process.exit(r.status || 1);
}
