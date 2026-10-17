import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import contracts from '../src/data/page-design-contract.json' with { type: 'json' };

const origin = 'http://127.0.0.1:8787';
const indexable = process.env.VERIFY_INDEXABLE !== 'false';
const results = [];
const routes = [
  ...contracts.map((p) => p.new),
  '/journal/mapping-a-repeatable-business-process/',
  '/journal/website-redesign-checklist-for-malaysian-smes/',
  '/journal/choosing-useful-dashboard-metrics/',
];
for (const route of routes) {
  const res = await fetch(origin + route, { redirect: 'manual' });
  assert.equal(res.status, 200, route);
  assert.equal(
    res.headers.get('x-robots-tag'),
    indexable ? 'index, follow' : 'noindex, follow',
  );
  assert.ok(
    res.headers.get('content-security-policy')?.includes("form-action 'none'"),
  );
  assert.ok((await res.text()).includes('<main'));
  results.push({
    route,
    status: res.status,
    robots: res.headers.get('x-robots-tag'),
  });
}
for (const p of contracts.filter((p) => p.old !== p.new)) {
  for (const path of [p.old, p.old.slice(0, -1)]) {
    const res = await fetch(origin + path, { redirect: 'manual' });
    assert.equal(res.status, 301, path);
    assert.equal(res.headers.get('location'), p.new);
    results.push({ route: path, status: res.status, location: p.new });
  }
}
const head = await fetch(origin + '/platform/', { method: 'HEAD' });
assert.equal(head.status, 200);
assert.equal(await head.text(), '');
const missing = await fetch(origin + '/worker-check-missing-829/');
assert.equal(missing.status, 404);
assert.equal(missing.headers.get('x-robots-tag'), 'noindex, follow');
assert.match(await missing.text(), /noindex, follow/);
const post = await fetch(origin + '/', { method: 'POST' });
assert.equal(post.status, 405);
assert.equal(post.headers.get('allow'), 'GET, HEAD');
const icon = await fetch(origin + '/favicon.svg');
assert.equal(icon.status, 200);
assert.ok(icon.headers.get('content-type')?.includes('image/svg+xml'));
assert.match(await icon.text(), /<svg/);
const receipt = {
  observedAt: new Date().toISOString(),
  environment: 'Wrangler local workerd runtime; not deployed',
  origin,
  indexable,
  results,
  head: 200,
  missing: 404,
  missingRobots: 'noindex, follow',
  post: 405,
  svg: 200,
};
await fs.mkdir('artifacts/qa', { recursive: true });
await fs.writeFile(
  'artifacts/qa/worker-' + (indexable ? 'production' : 'preview') + '.json',
  JSON.stringify(receipt, null, 2),
);
console.log(JSON.stringify(receipt, null, 2));
