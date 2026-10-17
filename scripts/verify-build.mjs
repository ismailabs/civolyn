import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
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
  ],
  root = path.resolve('dist');
const titles = new Set(),
  descriptions = new Set();
let links = 0,
  assets = 0,
  jsBytes = 0,
  cssBytes = 0;
const origin = process.env.SITE_URL || 'https://proworks.ismailstudio.my';
const indexable = JSON.parse(await fs.readFile('dist/release.json')).indexable;
for (const route of routes) {
  const html = await fs.readFile(path.join(root, route, 'index.html'), 'utf8');
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    route + ': one H1',
  );
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1],
    description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title?.includes('PROWORKS'));
  assert.ok(!titles.has(title));
  titles.add(title);
  assert.ok(description);
  assert.ok(!descriptions.has(description));
  descriptions.add(description);
  assert.equal(
    html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
    new URL(route, origin).href,
  );
  assert.ok(html.includes('Fictional concept'));
  assert.ok(html.includes('Skip to content'));
  assert.match(
    html,
    new RegExp(
      '<meta name="robots" content="' +
        (indexable ? 'index' : 'noindex') +
        ', follow"',
    ),
  );
  assert.doesNotMatch(
    html,
    /CIVOLYN|SoftwareApplication|aggregateRating|"offers"/,
  );
  const schema = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(schema);
  assert.ok(['WebPage', 'Article'].includes(JSON.parse(schema)['@type']));
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  assert.ok(
    main.replace(/<[^>]*>/g, ' ').split(/\s+/).length > 220,
    route + ': substantial main content',
  );
  for (const m of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]+)"/g)) {
    const [pathname, hash] = m[1].split('#');
    const file = path.join(
      root,
      pathname.endsWith('/') ? pathname + 'index.html' : pathname,
    );
    await fs.access(file).catch(() => {
      throw Error(route + ': missing ' + m[1]);
    });
    if (hash) {
      const target = await fs.readFile(file, 'utf8');
      assert.ok(
        target.includes('id="' + hash + '"'),
        route + ': missing anchor ' + m[1],
      );
    }
    if (path.extname(file) === '.html') links++;
    else assets++;
  }
  for (const m of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(
      html.includes('id="' + m[1] + '"'),
      route + ': missing local anchor ' + m[1],
    );
}
if (indexable) {
  const sitemap = await fs.readFile('dist/sitemap-0.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 15);
  for (const route of routes)
    assert.ok(sitemap.includes(new URL(route, origin).href));
} else {
  await assert.rejects(fs.access('dist/sitemap-0.xml'));
}
assert.match(await fs.readFile('dist/404.html', 'utf8'), /noindex, follow/);
for (const file of await fs.readdir('dist/_astro')) {
  const stat = await fs.stat(path.join('dist/_astro', file));
  if (file.endsWith('.js')) jsBytes += stat.size;
  if (file.endsWith('.css')) cssBytes += stat.size;
}
assert.ok(jsBytes < 20000, 'JS budget: ' + jsBytes);
assert.ok(cssBytes < 45000, 'CSS budget: ' + cssBytes);
await fs.mkdir('artifacts/qa', { recursive: true });
const summary = {
  date: new Date().toISOString(),
  pages: 15,
  corePages: 12,
  articles: 3,
  indexable,
  uniqueTitles: titles.size,
  uniqueDescriptions: descriptions.size,
  checkedInternalLinks: links,
  checkedAssetReferences: assets,
  clientJavaScriptBytes: jsBytes,
  cssBytes,
};
await fs.writeFile(
  'artifacts/qa/static.json',
  JSON.stringify(summary, null, 2),
);
console.log(JSON.stringify(summary, null, 2));
