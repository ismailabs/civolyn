import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
// Build separately so the normal production preview and browser evidence stay intact.
const build = spawnSync(
  process.execPath,
  [
    'node_modules/astro/bin/astro.mjs',
    'build',
    '--outDir',
    'artifacts/preview-build',
  ],
  {
    env: {
      ...process.env,
      SITE_URL: 'https://civolyn.ismailstudio.my',
      SITE_INDEXABLE: 'false',
      CF_PAGES: '1',
      CF_PAGES_BRANCH: 'review-example',
    },
    encoding: 'utf8',
  },
);
if (build.status !== 0) {
  console.error(build.stdout, build.stderr);
  process.exit(build.status || 1);
}
const html = await fs.readFile('artifacts/preview-build/index.html', 'utf8');
assert.match(html, /<meta name="robots" content="noindex, follow"/);
assert.match(
  html,
  /<link rel="canonical" href="https:\/\/civolyn.ismailstudio.my\/"/,
);
console.log(
  'Preview build: noindex metadata and stable production canonical verified.',
);
