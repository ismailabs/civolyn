import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const routes = [
  '/',
  '/platform/',
  '/products/flow/',
  '/products/knowledge/',
  '/products/signal/',
  '/technology/',
  '/design/',
  '/compare/',
  '/company/',
  '/journal/',
  '/support/',
  '/contact/',
];
const titles = new Set();
const descriptions = new Set();
let links = 0;
let assets = 0;
let jsBytes = 0;
let cssBytes = 0;
for (const route of routes) {
  const html = await fs.readFile(path.join(root, route, 'index.html'), 'utf8');
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${route}: one h1`,
  );
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title, `${route}: title`);
  assert.ok(!titles.has(title), 'unique titles');
  titles.add(title);
  const description = html.match(
    /<meta name="description" content="([^"]+)"/,
  )?.[1];
  assert.ok(description, `${route}: description`);
  assert.ok(!descriptions.has(description), 'unique descriptions');
  descriptions.add(description);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(
    canonical,
    new URL(route, process.env.SITE_URL || 'https://civolyn.ismailstudio.my')
      .href,
  );
  assert.match(html, /Fictional concept/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /og:image/);
  assert.match(html, /Skip to content/);
  for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]+)"/g)) {
    const [pathname, hash] = match[1].split('#');
    const file = path.join(
      root,
      pathname.endsWith('/') ? pathname + 'index.html' : pathname,
    );
    await fs.access(file).catch(() => {
      throw new Error(`${route}: missing ${match[1]}`);
    });
    if (hash) {
      const target = await fs.readFile(file, 'utf8');
      assert.ok(
        target.includes(`id="${hash}"`),
        `${route}: missing anchor ${match[1]}`,
      );
    }
    if (path.extname(file) === '.html') links++;
    else assets++;
  }
  for (const match of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(
      html.includes(`id="${match[1]}"`),
      `${route}: missing local anchor ${match[1]}`,
    );
  assert.ok(
    !/https?:\/\/(?:fonts\.googleapis|images\.unsplash|cdn\.)/.test(html),
    'no remote assets',
  );
}
const sitemap = await fs.readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
assert.equal(
  (sitemap.match(/<loc>/g) || []).length,
  12,
  'Exactly 12 indexable content pages in sitemap',
);
for (const route of routes)
  assert.ok(
    sitemap.includes(
      new URL(route, process.env.SITE_URL || 'https://civolyn.ismailstudio.my')
        .href,
    ),
    `Sitemap ${route}`,
  );
const missing = await fs.readFile(path.join(root, '404.html'), 'utf8');
assert.match(missing, /noindex, follow/);
for (const file of await fs.readdir(path.join(root, '_astro'))) {
  const stat = await fs.stat(path.join(root, '_astro', file));
  if (file.endsWith('.js')) jsBytes += stat.size;
  if (file.endsWith('.css')) cssBytes += stat.size;
}
assert.ok(jsBytes < 20000, `Client JS budget: ${jsBytes}`);
assert.ok(cssBytes < 65000, `CSS budget: ${cssBytes}`);
console.log(
  JSON.stringify(
    {
      pages: 12,
      uniqueTitles: titles.size,
      uniqueDescriptions: descriptions.size,
      checkedInternalLinks: links,
      checkedAssetReferences: assets,
      clientJavaScriptBytes: jsBytes,
      cssBytes,
    },
    null,
    2,
  ),
);
