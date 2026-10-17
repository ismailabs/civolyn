import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import net from 'node:net';
import { once } from 'node:events';
const output = process.env.PERF_OUTPUT || 'artifacts/lighthouse';
const origin = process.env.PERF_ORIGIN || 'http://127.0.0.1:4321';
await fs.mkdir(output, { recursive: true });
const reservation = net.createServer().listen(0, '127.0.0.1');
await once(reservation, 'listening');
const port = reservation.address().port;
await new Promise((r) => reservation.close(r));
const summaries = [];
for (const route of [
  '/',
  '/products/insights/',
  '/journal/website-redesign-checklist-for-malaysian-smes/',
]) {
  const name =
    route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
  for (let iteration = 1; iteration <= 3; iteration++) {
    // A fresh browser makes each cold navigation independent of earlier routes.
    const browser = await chromium.launch({
      args: ['--remote-debugging-port=' + port],
    });
    try {
      const result = await lighthouse(origin + route, {
        port,
        output: 'json',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
        logLevel: 'error',
      });
      await fs.writeFile(
        output + '/' + name + '-' + iteration + '.json',
        result.report,
      );
      const l = result.lhr;
      const summary = {
        route,
        iteration,
        fetchTime: l.fetchTime,
        lighthouseVersion: l.lighthouseVersion,
        formFactor: l.configSettings.formFactor,
        throttling: l.configSettings.throttling,
        score: Object.fromEntries(
          Object.entries(l.categories).map(([k, v]) => [
            k,
            Math.round(v.score * 100),
          ]),
        ),
        LCP: l.audits['largest-contentful-paint'].numericValue,
        CLS: l.audits['cumulative-layout-shift'].numericValue,
        TBT: l.audits['total-blocking-time'].numericValue,
        error: l.runtimeError || null,
      };
      summaries.push(summary);
      console.log(JSON.stringify(summary));
    } finally {
      await browser.close();
    }
  }
}
await fs.writeFile(
  output + '/summary.json',
  JSON.stringify(summaries, null, 2),
);
