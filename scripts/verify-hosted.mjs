import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { publicDnsArgs, publicDnsAnswers } from './verification-dns.mjs';
const origin = 'https://proworks.ismailstudio.my';
const expected = process.env.EXPECTED_SHA;
assert.match(
  expected || '',
  /^[a-f0-9]{40}$/,
  'Set EXPECTED_SHA to the committed release revision.',
);
const indexable = process.env.VERIFY_INDEXABLE !== 'false';
const contracts = JSON.parse(
  await fs.readFile('src/data/page-design-contract.json'),
);
const articles = [
  'mapping-a-repeatable-business-process',
  'website-redesign-checklist-for-malaysian-smes',
  'choosing-useful-dashboard-metrics',
];
const routes = [
  ...contracts.map((p) => p.new),
  ...articles.map((s) => '/journal/' + s + '/'),
];
await fs.mkdir('artifacts/production/screenshots', { recursive: true });
const report = {
  time: new Date().toISOString(),
  origin,
  expectedSha: expected,
  indexable,
  routes: [],
  assets: [],
  demos: [],
  redirects: [],
  publicDnsAnswers,
};
const release = await fetch(origin + '/release.json').then((r) => r.json());
assert.equal(release.sourceCommit, expected);
assert.equal(
  release.sourceDirty,
  false,
  'Hosted release must come from a clean committed checkout.',
);
assert.equal(release.indexable, indexable);
report.release = release;
for (const route of routes) {
  const res = await fetch(origin + route, { redirect: 'manual' });
  assert.equal(res.status, 200, route);
  const html = await res.text();
  assert.ok(html.includes('href="' + origin + route + '"'));
  assert.match(
    html,
    new RegExp(
      'name="robots" content="' +
        (indexable ? 'index' : 'noindex') +
        ', follow"',
    ),
  );
  assert.equal(
    res.headers.get('x-robots-tag'),
    indexable ? 'index, follow' : 'noindex, follow',
  );
  assert.ok(
    res.headers.get('content-security-policy')?.includes("form-action 'none'"),
  );
  assert.doesNotMatch(html, /CIVOLYN|aggregateRating|SoftwareApplication/);
  for (const match of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
    const path = match[1];
    if (!path.startsWith('/') || path.startsWith('//') || path.endsWith('/'))
      continue;
    if (report.assets.some((a) => a.path === path)) continue;
    const asset = await fetch(origin + path);
    assert.equal(asset.status, 200, path);
    const hostedBytes = Buffer.from(await asset.arrayBuffer());
    const localBytes = await fs.readFile('dist' + path);
    const hash = createHash('sha256').update(hostedBytes).digest('hex');
    assert.equal(
      hash,
      createHash('sha256').update(localBytes).digest('hex'),
      path + ': hosted asset bytes',
    );
    report.assets.push({
      path,
      status: asset.status,
      sha256: hash,
      bytes: hostedBytes.length,
    });
  }
  const local = await fs.readFile('dist' + route + 'index.html');
  assert.equal(
    createHash('sha256').update(html).digest('hex'),
    createHash('sha256').update(local).digest('hex'),
    route + ': hosted build bytes',
  );
  report.routes.push({
    route,
    status: res.status,
    canonical: origin + route,
    robots: res.headers.get('x-robots-tag'),
  });
}
const missing = await fetch(origin + '/release-check-missing-812/', {
  redirect: 'manual',
});
assert.equal(missing.status, 404);
assert.equal(missing.headers.get('x-robots-tag'), 'noindex, follow');
assert.match(await missing.text(), /noindex, follow/);
const robots = await fetch(origin + '/robots.txt').then((r) => r.text());
assert.equal(robots.includes('Sitemap:'), indexable);
if (indexable) {
  const sitemap = await fetch(origin + '/sitemap-0.xml').then((r) => r.text());
  assert.equal((sitemap.match(/<loc>/g) || []).length, 15);
  for (const route of routes) assert.ok(sitemap.includes(origin + route));
}
const browser = await chromium.launch({ args: publicDnsArgs });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(r.url() + ': ' + r.status());
  });
  for (const [label, width, height] of [
    ['desktop', 1440, 1040],
    ['mobile', 390, 900],
  ]) {
    await page.setViewportSize({ width, height });
    for (const p of contracts) {
      await page.goto(origin + p.new);
      await page.evaluate(() => document.fonts.ready);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      await page.screenshot({
        path:
          'artifacts/production/screenshots/' +
          p.label.toLowerCase() +
          '-' +
          label +
          '.png',
        fullPage: true,
      });
    }
  }
  await page.goto(origin + '/products/workflows/');
  await page.locator('[data-flow-next]').click();
  await page.locator('[data-flow-next]').click();
  assert.ok(await page.locator('[data-flow-approve]').isDisabled());
  await page.locator('[data-flow-confirm]').check();
  await page.locator('[data-flow-approve]').click();
  await page.locator('[data-flow-next]').click();
  assert.equal(await page.locator('[data-flow] .complete').count(), 4);
  await page.locator('[data-flow-reset]').click();
  assert.equal(await page.locator('[data-flow] .complete').count(), 0);
  report.demos.push('workflow approval/completion/reset');
  await page.goto(origin + '/products/knowledge/');
  await page.getByRole('searchbox').fill('ONBOARDING');
  assert.equal(await page.locator('[data-document]:visible').count(), 1);
  await page.getByRole('searchbox').fill('unmatched-sample');
  assert.ok(await page.locator('[data-knowledge-empty]').isVisible());
  await page.locator('[data-knowledge-reset]').click();
  assert.equal(await page.locator('[data-document]:visible').count(), 6);
  report.demos.push('knowledge search/empty/reset');
  await page.goto(origin + '/products/insights/');
  for (const [period, total] of [
    ['week', '103'],
    ['month', '181'],
    ['quarter', '558'],
  ]) {
    await page.getByLabel('Period', { exact: true }).selectOption(period);
    assert.equal(
      await page.locator('[data-signal-total]').textContent(),
      total,
    );
    const sum = (
      await page.locator('[data-signal-table] td').allTextContents()
    ).reduce((a, b) => a + Number(b), 0);
    assert.equal(sum, Number(total));
  }
  report.demos.push('insights all periods/table parity');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
if (process.env.VERIFY_OLD_REDIRECTS === 'true') {
  for (const p of contracts) {
    for (const path of p.old === '/' ? ['/'] : [p.old, p.old.slice(0, -1)]) {
      const r = await fetch(
        'https://civolyn.ismailstudio.my' + path + '?next=discard',
        { redirect: 'manual' },
      );
      assert.equal(r.status, 301);
      assert.equal(r.headers.get('location'), origin + p.new);
      report.redirects.push({
        path,
        status: r.status,
        location: r.headers.get('location'),
      });
    }
  }
}
await fs.writeFile(
  'artifacts/production/verification.json',
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
