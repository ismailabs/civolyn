import sharp from 'sharp';
import fs from 'node:fs/promises';
await fs.copyFile('public/images/brand/favicon.svg', 'public/favicon.svg');
await sharp('public/favicon.svg')
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32.png');
await sharp('public/favicon.svg')
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');
await sharp('public/images/brand/social-preview.svg')
  .png()
  .toFile('public/social-preview.png');
console.log(
  'PROWORKS favicon and social assets rebuilt from reviewed local editorial SVGs.',
);
