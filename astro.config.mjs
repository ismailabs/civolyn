import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const origin = process.env.SITE_URL || 'https://proworks.ismailstudio.my';
const parsed = new URL(origin);
const preview =
  process.env.SITE_INDEXABLE !== 'true' ||
  (!!process.env.WORKERS_CI_BRANCH &&
    process.env.WORKERS_CI_BRANCH !== 'main') ||
  (process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH !== 'main');
if (!['https:', 'http:'].includes(parsed.protocol) || parsed.pathname !== '/') {
  throw new Error(
    'SITE_URL must be an absolute HTTP(S) origin without a path.',
  );
}
export default defineConfig({
  site: parsed.origin,
  output: 'static',
  trailingSlash: 'always',
  integrations: preview
    ? []
    : [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: {
    build: { assetsInlineLimit: 0 },
    define: {
      __PREVIEW__: JSON.stringify(preview),
    },
  },
});
