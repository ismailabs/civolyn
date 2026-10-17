import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
for (const [label, vars] of [
  ['explicit', { SITE_INDEXABLE: 'false' }],
  [
    'worker-branch',
    { SITE_INDEXABLE: 'true', WORKERS_CI_BRANCH: 'feature-preview' },
  ],
]) {
  const out = 'artifacts/preview-' + label;
  const r = spawnSync(
    process.execPath,
    ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', out],
    {
      env: {
        ...process.env,
        SITE_URL: 'https://proworks.ismailstudio.my',
        ...vars,
      },
      encoding: 'utf8',
    },
  );
  if (r.status !== 0) {
    console.error(r.stdout, r.stderr);
    process.exit(r.status || 1);
  }
  const html = await fs.readFile(out + '/index.html', 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, follow"/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/proworks.ismailstudio.my\/"/,
  );
  assert.doesNotMatch(html, /rel="sitemap"/);
  assert.doesNotMatch(
    await fs.readFile(out + '/robots.txt', 'utf8'),
    /Sitemap:/,
  );
  await assert.rejects(fs.access(out + '/sitemap-0.xml'));
  console.log(
    label + ': preview noindex, canonical, robots and sitemap exclusion passed',
  );
}
