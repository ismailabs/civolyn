import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import routes from '../design/editorial-v3/routes.json' with { type: 'json' };

const output = 'artifacts/editorial-v3';
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:4321';
for (const dir of ['after', 'comparisons', 'states'])
  await fs.mkdir(`${output}/${dir}`, { recursive: true });
for (let attempt = 0; ; attempt++) {
  try {
    const r = await fetch(origin + '/release.json');
    if (!r.ok) throw Error('Preview unavailable');
    break;
  } catch (error) {
    if (attempt === 20) throw error;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
const browser = await chromium.launch();
const captures = [];
try {
  for (const [device, width, height] of [
    ['desktop', 1440, 1040],
    ['mobile', 390, 900],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: 'reduce',
    });
    for (const route of routes) {
      const response = await page.goto(origin + route.route);
      if (response.status() !== 200)
        throw Error(route.route + ': ' + response.status());
      await page.evaluate(() => document.fonts.ready);
      const viewport = `${output}/after/${route.slug}-${device}.png`;
      const full = `${output}/after/${route.slug}-${device}-full.png`;
      await page.screenshot({ path: viewport });
      await page.screenshot({ path: full, fullPage: true });
      const ref = `design/editorial-v3/references/${device}/${route.slug}-${width}x${height}.png`;
      const size = await sharp(ref).metadata();
      if (size.width !== width || size.height !== height)
        throw Error('Reference dimension mismatch: ' + ref);
      const pair = `${output}/comparisons/${route.slug}-${device}-pair.png`;
      await sharp({
        create: {
          width: width * 2,
          height,
          channels: 3,
          background: '#f4f1ea',
        },
      })
        .composite([
          { input: ref, left: 0, top: 0 },
          { input: viewport, left: width, top: 0 },
        ])
        .png()
        .toFile(pair);
      const after = await fs.readFile(viewport);
      const fullSize = await sharp(full).metadata();
      captures.push({
        slug: route.slug,
        route: route.route,
        device,
        width,
        height,
        fullHeight: fullSize.height,
        viewport,
        full,
        reference: ref,
        pair,
        sha256: crypto.createHash('sha256').update(after).digest('hex'),
      });
      console.log(
        `${route.name} ${device}: viewport, full page and reference/browser pair captured`,
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
}
for (const device of ['desktop', 'mobile']) {
  const items = captures.filter((c) => c.device === device);
  const w = device === 'desktop' ? 360 : 195;
  const h = device === 'desktop' ? 260 : 450;
  const cols = device === 'desktop' ? 4 : 6;
  const inputs = await Promise.all(
    items.map(async (c, i) => ({
      input: await sharp(c.viewport).resize(w, h).toBuffer(),
      left: (i % cols) * w,
      top: Math.floor(i / cols) * (h + 24),
    })),
  );
  await sharp({
    create: {
      width: cols * w,
      height: Math.ceil(items.length / cols) * (h + 24),
      channels: 3,
      background: '#d6d5ca',
    },
  })
    .composite(inputs)
    .png()
    .toFile(`${output}/${device}-overview.png`);
}
const states = (await fs.readdir(`${output}/states`)).filter((f) =>
  f.endsWith('.png'),
);
const gallery = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>PROWORKS Editorial V3 / actual browser comparisons</title><style>body{margin:0;padding:32px;font:16px/1.6 system-ui;background:#f4f1ea;color:#181e1c}h1{font:48px Georgia}a{color:inherit}nav{display:flex;flex-wrap:wrap;gap:14px}section{padding:28px 0;border-top:1px solid #b9bcaf}img{max-width:100%;height:auto;display:block;background:#e7e5dc}figure{margin:16px 0}figcaption{margin:8px 0}details{margin:18px 0}summary{cursor:pointer;min-height:44px}.columns{display:grid;grid-template-columns:1fr 1fr;gap:12px}.states{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}:focus-visible{outline:3px solid #984e36;outline-offset:4px}@media(max-width:650px){body{padding:18px}.columns{display:block}}</style><h1>Editorial Product Experience / V3</h1><p>Left: supplied design reference. Right: actual Astro implementation in Chromium. All 24 pairs use matching viewport dimensions. Open an image for original resolution. Full-page captures retain protected content and real controls beyond the shorter specimen. Code and browser evidence are ready for owner review; visual approval and production deployment are separate gates.</p><nav>${routes.map((r) => `<a href="#${r.slug}">${r.name}</a>`).join('')}<a href="#states">Interaction evidence</a></nav>${routes
  .map(
    (r) =>
      `<section id="${r.slug}"><h2>${r.name} <small>${r.route}</small></h2>${[
        'desktop',
        'mobile',
      ]
        .map((device) => {
          const c = captures.find(
            (c) => c.slug === r.slug && c.device === device,
          );
          return `<figure><figcaption>${device} — reference / browser (${c.width} × ${c.height} each)</figcaption><a href="comparisons/${r.slug}-${device}-pair.png"><img loading="lazy" src="comparisons/${r.slug}-${device}-pair.png" width="${c.width * 2}" height="${c.height}" alt="${r.name} ${device}: supplied reference on the left, actual browser on the right"></a><details><summary>Full-page reference and actual browser (${c.fullHeight}px high)</summary><div class="columns"><a href="../../design/editorial-v3/references/${device}/${r.slug}-full.png"><img loading="lazy" src="../../design/editorial-v3/references/${device}/${r.slug}-full.png" alt="${r.name} supplied full-page reference"></a><a href="after/${r.slug}-${device}-full.png"><img loading="lazy" src="after/${r.slug}-${device}-full.png" alt="${r.name} actual full-page browser capture"></a></div></details></figure>`;
        })
        .join('')}</section>`,
  )
  .join(
    '',
  )}<section id="states"><h2>Actual interaction states</h2><div class="states">${states.map((f) => `<figure><a href="states/${f}"><img loading="lazy" src="states/${f}" alt="${f.replaceAll('-', ' ')}"></a><figcaption>${f}</figcaption></figure>`).join('')}</div></section></html>`;
await fs.writeFile(`${output}/index.html`, gallery);
const manifest = {
  observedAt: new Date().toISOString(),
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim(),
  sourceDirty: !!execFileSync('git', ['status', '--porcelain'], {
    encoding: 'utf8',
  }).trim(),
  browser: 'Chromium',
  origin,
  reducedMotion: true,
  captures,
  states,
  limits: [
    'No invented similarity scores',
    'Reference font substitution and functional adaptations documented in docs/EDITORIAL-V3-REVIEW.md',
  ],
};
await fs.writeFile(
  `${output}/capture-manifest.json`,
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(
  '24 reference/browser pairs and 48 actual captures saved; gallery ready.',
);
