import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import net from 'node:net';
import { once } from 'node:events';
await fs.mkdir('artifacts/lighthouse', { recursive: true });
const reservation = net.createServer().listen(0, '127.0.0.1');
await once(reservation, 'listening');
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
// Playwright provides a reliable Windows launcher; Lighthouse attaches to this owned browser.
const browser = await chromium.launch({
  args: [`--remote-debugging-port=${port}`],
});
try {
  const summaries = [];
  for (const route of ['/', '/products/signal/', '/journal/']) {
    const name =
      route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
    const result = await lighthouse(`http://127.0.0.1:4321${route}`, {
      port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      logLevel: 'error',
    });
    await fs.writeFile(`artifacts/lighthouse/${name}.json`, result.report);
    const lhr = result.lhr;
    summaries.push({
      route,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      LCP: lhr.audits['largest-contentful-paint'].numericValue,
      CLS: lhr.audits['cumulative-layout-shift'].numericValue,
      TBT: lhr.audits['total-blocking-time'].numericValue,
      errors: lhr.runtimeError || null,
    });
  }
  await fs.writeFile(
    'artifacts/lighthouse/summary.json',
    JSON.stringify(summaries, null, 2),
  );
  console.log(JSON.stringify(summaries, null, 2));
} finally {
  await browser.close();
}
