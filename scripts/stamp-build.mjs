import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const production =
  process.env.SITE_INDEXABLE === 'true' &&
  (!process.env.WORKERS_CI_BRANCH ||
    process.env.WORKERS_CI_BRANCH === 'main') &&
  (process.env.CF_PAGES !== '1' || process.env.CF_PAGES_BRANCH === 'main');
const headers = (await fs.readFile('public/_headers', 'utf8')).replace(
  /\r\n/g,
  '\n',
);
await fs.writeFile(
  'dist/_headers',
  headers.replace(
    '/*\n',
    '/*\n  X-Robots-Tag: ' +
      (production ? 'index, follow' : 'noindex, follow') +
      '\n',
  ),
);
await fs.writeFile(
  'dist/release.json',
  JSON.stringify(
    {
      brand: 'PROWORKS',
      sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
        encoding: 'utf8',
      }).trim(),
      sourceDirty:
        execFileSync(
          'git',
          ['status', '--porcelain', '--untracked-files=normal'],
          {
            encoding: 'utf8',
          },
        ).trim().length > 0,
      indexable: production,
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  ),
);
console.log('Release metadata stamped; indexable=' + production);
