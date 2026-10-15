import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const origin = process.env.SITE_URL || 'https://civolyn.ismailstudio.my';
const parsed = new URL(origin);
if (!['https:', 'http:'].includes(parsed.protocol) || parsed.pathname !== '/') {
  throw new Error(
    'SITE_URL must be an absolute HTTP(S) origin without a path.',
  );
}
export default defineConfig({
  site: parsed.origin,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: {
    build: { assetsInlineLimit: 0 },
    define: {
      __PREVIEW__: JSON.stringify(
        process.env.SITE_INDEXABLE === 'false' ||
          (process.env.CF_PAGES === '1' &&
            process.env.CF_PAGES_BRANCH !== 'main'),
      ),
    },
  },
});
