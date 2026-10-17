import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const baseline = '04f3af27342bedb5f1aeffd75fc5a9452be43a43';
const protectedFiles = [
  'src/data/demo-fixtures.json',
  'public/_redirects',
  'public/_headers',
  'worker/index.ts',
  'worker/legacy-redirect.ts',
  'wrangler.jsonc',
  'wrangler.legacy.jsonc',
  'astro.config.mjs',
  '.github/workflows/production-quality.yml',
  ...[
    'mapping-a-repeatable-business-process',
    'website-redesign-checklist-for-malaysian-smes',
    'choosing-useful-dashboard-metrics',
  ].map((slug) => `src/pages/journal/${slug}.md`),
];
for (const file of protectedFiles) {
  const original = execFileSync('git', ['show', `${baseline}:${file}`]);
  const current = await fs.readFile(file);
  assert.equal(
    current.toString('utf8').replaceAll('\r\n', '\n'),
    original.toString('utf8').replaceAll('\r\n', '\n'),
    'Protected source changed: ' + file,
  );
}
const manifest = JSON.parse(
  await fs.readFile('design/editorial-v3/reference-manifest.json'),
);
assert.equal(manifest.length, 48);
for (const reference of manifest) {
  const content = await fs.readFile(
    'design/editorial-v3/references/' + reference.file,
  );
  assert.equal(
    crypto.createHash('sha256').update(content).digest('hex'),
    reference.sha256,
    reference.file,
  );
}
const files = [
  ...new Set([
    ...git('diff', '--name-only', baseline).split('\n'),
    ...git('ls-files', '--others', '--exclude-standard').split('\n'),
    ...git('diff', '--cached', '--name-only').split('\n'),
  ]),
].filter(Boolean);
const findings = [];
const secretRules = [
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  /(?:github_pat_|ghp_|gho_)[A-Za-z0-9_]{25,}/,
  /sk-(?:proj-)?[A-Za-z0-9_-]{35,}/,
  /AKIA[0-9A-Z]{16}/,
  /(?:api[_-]?key|api[_-]?token|client[_-]?secret)\s*[=:]\s*["'][A-Za-z0-9_/-]{28,}["']/i,
];
let checkedTextFiles = 0;
for (const file of files) {
  assert.ok(
    !/(^|\/)(node_modules|dist|\.wrangler|\.env)(\/|$)/.test(file),
    'Forbidden publication path: ' + file,
  );
  if (!/\.(?:astro|css|ts|js|mjs|json|md|yml|yaml|svg|txt)$/.test(file))
    continue;
  const text = await fs.readFile(file, 'utf8');
  checkedTextFiles++;
  secretRules.forEach((rule, index) => {
    if (rule.test(text)) findings.push({ file, rule: index + 1 });
  });
  if (file.startsWith('artifacts/editorial-v3/'))
    assert.ok(
      !/C:[\\/]Users[\\/]/i.test(text),
      'Machine path in evidence: ' + file,
    );
}
assert.deepEqual(
  findings,
  [],
  'Potential secrets found; values are deliberately not printed',
);
const receipt = {
  observedAt: new Date().toISOString(),
  branch: git('branch', '--show-current'),
  baseline,
  protectedFiles,
  referencesVerified: manifest.length,
  checkedTextFiles,
  scanner:
    'Custom high-confidence credential-pattern check of changed/new publication text; not a Gitleaks audit',
  findings,
};
await fs.mkdir('artifacts/editorial-v3', { recursive: true });
await fs.writeFile(
  'artifacts/editorial-v3/delivery-check.json',
  JSON.stringify(receipt, null, 2) + '\n',
);
console.log(
  JSON.stringify({
    protectedFilesUnchanged: protectedFiles.length,
    referencesVerified: manifest.length,
    checkedTextFiles,
    secretFindings: findings.length,
  }),
);
