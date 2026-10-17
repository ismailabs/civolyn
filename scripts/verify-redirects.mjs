import './verification-dns.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import contracts from '../src/data/page-design-contract.json' with { type: 'json' };
const oldOrigin = 'https://civolyn.ismailstudio.my';
const newOrigin = 'https://proworks.ismailstudio.my';
const results = [];
for (const p of contracts) {
  const variants =
    p.old === '/'
      ? ['/', '/index.html']
      : [
          p.old,
          p.old.slice(0, -1),
          p.old + 'index.html',
          p.old.slice(0, -1) + '.html',
        ];
  for (const path of variants) {
    const response = await fetch(
      oldOrigin + path + '?next=https://example.invalid/&private=discard',
      { redirect: 'manual' },
    );
    assert.equal(response.status, 301, path);
    assert.equal(response.headers.get('location'), newOrigin + p.new, path);
    results.push({
      path,
      status: response.status,
      location: response.headers.get('location'),
    });
  }
  const target = await fetch(newOrigin + p.new, { redirect: 'manual' });
  assert.equal(
    target.status,
    200,
    p.new + ': destination must not redirect again',
  );
}
const missing = await fetch(oldOrigin + '/no-successor-for-this-page/', {
  redirect: 'manual',
});
assert.equal(missing.status, 404);
assert.equal(missing.headers.get('x-robots-tag'), 'noindex, follow');
const head = await fetch(oldOrigin + '/platform/', {
  method: 'HEAD',
  redirect: 'manual',
});
assert.equal(head.status, 301);
assert.equal(await head.text(), '');
const post = await fetch(oldOrigin + '/', {
  method: 'POST',
  redirect: 'manual',
});
assert.equal(post.status, 405);
const report = {
  observedAt: new Date().toISOString(),
  method:
    'Live HTTPS with certificate validation; manual redirects; query-discard probes',
  results,
  destinationRoutes: 12,
  destinationStatus: 200,
  missing: 404,
  head: 301,
  post: 405,
};
await fs.mkdir('artifacts/production', { recursive: true });
await fs.writeFile(
  'artifacts/production/redirects.json',
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify({ ...report, results: results.length }, null, 2));
