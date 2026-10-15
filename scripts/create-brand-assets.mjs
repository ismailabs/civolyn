import fs from 'node:fs/promises';
import sharp from 'sharp';

await fs.mkdir('public/images', { recursive: true });
await fs.mkdir('docs/licenses', { recursive: true });
const mark = await fs.readFile('public/favicon.svg');
await sharp(mark).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(mark).resize(180, 180).png().toFile('public/apple-touch-icon.png');
// Original vector composition; keep this source so social assets remain reproducible.
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f6f2"/><path d="M1060 90A220 220 0 1 0 1060 540" fill="none" stroke="#dce4fa" stroke-width="105"/><path d="M1060 90A220 220 0 0 0 800 100" fill="none" stroke="#2048ec" stroke-width="105"/><path d="M790 470A220 220 0 0 0 1060 540" fill="none" stroke="#111318" stroke-width="105"/><text x="68" y="92" font-family="Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="6" fill="#111318">CIVOLYN</text><text x="64" y="270" font-family="Arial,sans-serif" font-size="75" letter-spacing="-4" fill="#111318">Make room for</text><text x="64" y="356" font-family="Arial,sans-serif" font-size="82" letter-spacing="-4" fill="#2048ec">better work.</text><text x="68" y="440" font-family="Arial,sans-serif" font-size="20" fill="#575b64">Flow. Knowledge. Signal.</text><path d="M68 514H630" stroke="#dddedb"/><circle cx="73" cy="552" r="4" fill="#2048ec"/><text x="88" y="559" font-family="Arial,sans-serif" font-size="15" fill="#575b64">Fictional concept · An ISMAIL portfolio project</text></svg>`;
await fs.writeFile('public/images/social-preview.svg', social);
await sharp(Buffer.from(social)).png().toFile('public/social-preview.png');
// The artwork is a committed, optimised master. No generation service is used at runtime.
try {
  await fs.access('src/assets/clarity-architecture.webp');
  for (const width of [640, 960, 1440]) {
    await sharp('src/assets/clarity-architecture.webp')
      .resize(width, Math.round((width * 2) / 3))
      .webp({ quality: 80, effort: 6 })
      .toFile(`public/images/clarity-architecture-${width}.webp`);
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  console.warn(
    'No architecture master found; existing responsive variants left in place.',
  );
}
for (const name of [
  '@fontsource-variable/manrope',
  '@fontsource/instrument-serif',
]) {
  await fs.copyFile(
    `node_modules/${name}/LICENSE`,
    `docs/licenses/${name.split('/')[1]}-OFL.txt`,
  );
}
console.log('Brand assets, responsive artwork and font licences generated.');
