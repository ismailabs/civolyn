// Reproducible local visual evidence; never contacts a hosted environment.
import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
const root = 'artifacts/visual-fidelity-v2';
const reference = await fs
  .access(
    'PROWORKS-Visual-Design-Reference-Package/08-manifests/reference-manifest.json',
  )
  .then(
    () => 'PROWORKS-Visual-Design-Reference-Package',
    () => 'design/reference-v2',
  );
const manifest = JSON.parse(
  await fs.readFile(reference + '/08-manifests/reference-manifest.json'),
);
const phase = process.argv[2] || 'after';
const origin =
  phase === 'before' ? 'http://127.0.0.1:4322' : 'http://127.0.0.1:4321';
if (!['before', 'iteration-1', 'after'].includes(phase))
  throw Error('Unknown capture phase');
await fs.mkdir(`${root}/${phase}`, { recursive: true });
const browser = await chromium.launch();
const inventory = [];
try {
  for (const [device, viewport] of Object.entries({
    desktop: { width: 1440, height: 1040 },
    mobile: { width: 390, height: 900 },
  })) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: 'reduce',
      colorScheme: 'light',
    });
    const page = await context.newPage();
    for (const p of manifest.pages) {
      const response = await page.goto(origin + p.route);
      if (response.status() !== 200)
        throw Error(p.route + ': ' + response.status());
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images]
            .filter((i) => i.loading !== 'lazy')
            .map((i) => i.decode().catch(() => {})),
        );
      });
      const actual = `${root}/${phase}/${p.id}-${device}.png`;
      await page.screenshot({ path: actual, animations: 'disabled' });
      await page.screenshot({
        path: `${root}/${phase}/${p.id}-${device}-full.png`,
        fullPage: true,
        animations: 'disabled',
      });
      inventory.push({
        route: p.route,
        device,
        viewport,
        actual,
        reference: `${reference}/${p[device]}`,
      });
      console.log(`${phase}: ${p.id} ${device}`);
      if (phase !== 'before') {
        const output = `${root}/comparisons/${phase}`;
        await fs.mkdir(output, { recursive: true });
        const ref = await fs.readFile(`${reference}/${p[device]}`);
        await sharp({
          create: {
            width: viewport.width * 2,
            height: viewport.height,
            channels: 3,
            background: '#dfe8f4',
          },
        })
          .composite([
            { input: ref, left: 0, top: 0 },
            { input: actual, left: viewport.width, top: 0 },
          ])
          .png()
          .toFile(`${output}/${p.id}-${device}-pair.png`);
        const opaque = await sharp(ref).removeAlpha().png().toBuffer();
        const overlay = await sharp(opaque).ensureAlpha(0.5).png().toBuffer();
        await sharp(actual)
          .composite([{ input: overlay }])
          .png()
          .toFile(`${output}/${p.id}-${device}-overlay.png`);
      }
    }
    await context.close();
    // Compact labeled boards for reviewing every page, without replacing full-size pairs.
    const thumbW = device === 'desktop' ? 480 : 195;
    const thumbH = device === 'desktop' ? 347 : 450;
    const columns = device === 'desktop' ? 3 : 6;
    const tiles = [];
    for (const [i, p] of manifest.pages.entries()) {
      const x = (i % columns) * (thumbW + 20) + 20;
      const y = Math.floor(i / columns) * (thumbH + 52) + 44;
      tiles.push({
        input: await sharp(`${root}/${phase}/${p.id}-${device}.png`)
          .resize(thumbW, thumbH)
          .png()
          .toBuffer(),
        left: x,
        top: y,
      });
      const label = Buffer.from(
        `<svg width="${thumbW}" height="24"><text x="0" y="18" fill="white" font-family="Arial" font-size="15">${p.name} / ${device} / ${phase}</text></svg>`,
      );
      tiles.push({ input: label, left: x, top: y - 28 });
    }
    await sharp({
      create: {
        width: columns * (thumbW + 20) + 20,
        height: Math.ceil(12 / columns) * (thumbH + 52) + 20,
        channels: 3,
        background: '#091b35',
      },
    })
      .composite(tiles)
      .png()
      .toFile(`${root}/${phase}-${device}-overview.png`);
  }
} finally {
  await browser.close();
}
await fs.writeFile(
  `${root}/${phase}/inventory.json`,
  JSON.stringify(inventory, null, 2),
);
console.log(
  `${phase}: ${inventory.length} viewport and full-page captures; both overview boards complete.`,
);
