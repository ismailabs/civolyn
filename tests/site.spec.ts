import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import contracts from '../src/data/page-design-contract.json' with { type: 'json' };
import fixtures from '../src/data/demo-fixtures.json' with { type: 'json' };
const routes = contracts.map((p) => p.new);
const articles = [
  'mapping-a-repeatable-business-process',
  'website-redesign-checklist-for-malaysian-smes',
  'choosing-useful-dashboard-metrics',
].map((s) => '/journal/' + s + '/');
for (const route of [...routes, ...articles])
  test(
    route + ' — semantics, assets, console, links and WCAG rules',
    async ({ page, request }) => {
      const errors: string[] = [],
        bad: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('response', (r) => {
        if (r.status() >= 400) bad.push(r.url());
      });
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toContainText('Fictional concept');
      const levels = await page
        .locator('h1,h2,h3,h4')
        .evaluateAll((a) => a.map((e) => Number(e.tagName.slice(1))));
      expect(
        levels.every((l, i) => i === 0 || l <= levels[i - 1] + 1),
      ).toBeTruthy();
      for (const href of await page
        .locator('a[href^="/"]')
        .evaluateAll((a) =>
          Array.from(new Set(a.map((e) => e.getAttribute('href')!))),
        )) {
        expect(
          (await request.get(href.split('#')[0] || route)).status(),
          href,
        ).toBe(200);
      }
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page
          .locator('img')
          .evaluateAll((a) =>
            (a as HTMLImageElement[])
              .filter((i) => !i.complete || i.naturalWidth === 0)
              .map((i) => i.src),
          ),
      ).toEqual([]);
      const a11y = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(
        a11y.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            reason: n.failureSummary,
          })),
        })),
      ).toEqual([]);
      expect(errors).toEqual([]);
      expect(bad).toEqual([]);
    },
  );
for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920])
  test('all core pages reflow at ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route,
      ).toBeLessThanOrEqual(width + 1);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
test('mobile navigation, products, Escape and focus restore', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' }),
    menu = page.getByRole('button', { name: 'Menu', exact: true });
  await expect(nav).toBeHidden();
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(nav).toBeVisible();
  await page.locator('.nav-group>summary').click();
  await expect(nav.getByRole('link', { name: /Workflows/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.nav-group')).not.toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(nav).toBeHidden();
  await menu.click();
  await nav.getByRole('link', { name: 'Platform', exact: true }).click();
  await expect(page).toHaveURL(/\/platform\/$/);
});
test('workflow requires an explicit reviewed approval, logs and resets', async ({
  page,
}) => {
  await page.goto('/products/workflows/');
  const root = page.locator('[data-flow]'),
    next = root.locator('[data-flow-next]'),
    approve = root.getByRole('button', {
      name: 'Approve example →',
      exact: true,
    });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(root).toHaveAttribute('data-state', '1');
  await page.keyboard.press('Enter');
  await expect(root).toHaveAttribute('data-state', '2');
  await expect(approve).toBeDisabled();
  await expect(next).toBeHidden();
  await expect(root.getByRole('status')).toContainText(
    'Paused for human review',
  );
  await expect(root.locator('[data-step="3"]')).toContainText('Waiting');
  await page.keyboard.press('Space');
  await expect(approve).toBeEnabled();
  await approve.focus();
  await page.keyboard.press('Enter');
  await expect(root).toHaveAttribute('data-state', '3');
  await expect(next).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(root.locator('.complete')).toHaveCount(4);
  await expect(root.getByRole('status')).toContainText(
    'no messages, projects or accounts were created',
  );
  await expect(root.locator('[data-flow-log] li')).toHaveCount(5);
  await root.getByRole('button', { name: 'Reset demo', exact: true }).click();
  await expect(root.locator('.complete')).toHaveCount(0);
  await expect(root).toHaveAttribute('data-state', '0');
  await expect(next).toBeFocused();
});
test('rapid double click cannot skip workflow stages', async ({ page }) => {
  await page.goto('/products/workflows/');
  await page.locator('[data-flow-next]').dblclick();
  await expect(page.locator('[data-flow]')).toHaveAttribute('data-state', '1');
});
test('Knowledge case, categories, sources, safe input and reset', async ({
  page,
}) => {
  await page.goto('/products/knowledge/');
  const search = page.getByRole('searchbox');
  await search.fill('ONBOARDING');
  await expect(page.locator('[data-document]:visible')).toHaveCount(1);
  await page
    .locator('[data-knowledge]')
    .getByText('A considered start: client onboarding', { exact: true })
    .click();
  await expect(page.locator('.document-content:visible')).toContainText(
    'Sample operations handbook',
  );
  await search.fill('');
  await page.getByLabel('Policies', { exact: true }).check();
  await expect(page.locator('[data-document]:visible')).toHaveCount(1);
  await expect(page.locator('[data-knowledge-count]')).toContainText(
    'Policies',
  );
  await search.fill('<img src=x onerror=alert(1)>');
  await expect(
    page.getByText('No example documents found.', { exact: true }),
  ).toBeVisible();
  await expect(page.locator('[data-knowledge] img')).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Clear search and filters', exact: true })
    .click();
  await expect(page.locator('[data-document]:visible')).toHaveCount(6);
  await expect(search).toBeFocused();
  await search.fill('scope');
  await expect(page.locator('[data-document]:visible')).toHaveCount(1);
  await expect(page.locator('[data-document]:visible')).toContainText(
    'A considered start: client onboarding',
  );
});
for (const period of ['week', 'month', 'quarter'] as const)
  test(
    'Insights ' + period + ' chart, metric, caption and table reconcile',
    async ({ page }) => {
      await page.goto('/products/insights/');
      await page.getByLabel('Period', { exact: true }).selectOption(period);
      const d = fixtures.insights[period],
        total = d.completed.reduce((a, b) => a + b, 0);
      await expect(page.locator('[data-signal-total]')).toHaveText(
        String(total),
      );
      await expect(page.locator('[data-signal-review]')).toHaveText(
        String(d.pending_review),
      );
      await expect(page.locator('[data-signal-time]')).toHaveText(
        d.median_days + ' days',
      );
      await expect(page.locator('[data-signal-chart]')).toHaveAttribute(
        'aria-label',
        new RegExp('Total ' + total),
      );
      await page
        .getByText('Read the underlying example data', { exact: true })
        .click();
      const values = await page
        .locator('[data-signal-table] td')
        .allTextContents();
      expect(values.map(Number)).toEqual(d.completed);
      expect(values.reduce((n, v) => n + Number(v), 0)).toBe(total);
      expect(
        await page.locator('[data-signal-bars] b').allTextContents(),
      ).toEqual(d.completed.map(String));
      await expect(page.locator('[data-signal-table-total]')).toHaveText(
        String(total),
      );
      await expect(page.locator('[data-signal-caption]')).toHaveText(
        'this ' + period,
      );
      await page
        .getByRole('button', { name: 'Reset dashboard', exact: true })
        .click();
      await expect(page.locator('[data-signal-total]')).toHaveText('103');
    },
  );
test('comparison changes reason and destination and resets', async ({
  page,
}) => {
  await page.goto('/compare/');
  await page
    .getByLabel('Information that is hard to find.', { exact: true })
    .check();
  await expect(page.locator('[data-compare-title]')).toHaveText(
    'Start with Knowledge.',
  );
  await expect(page.locator('[data-compare-link]')).toHaveAttribute(
    'href',
    '/products/knowledge/',
  );
  await page
    .getByLabel('Numbers that need a useful perspective.', { exact: true })
    .check();
  await expect(page.locator('[data-compare-title]')).toHaveText(
    'Start with Insights.',
  );
  await page.getByRole('button', { name: 'Reset choice', exact: true }).click();
  await expect(page.locator('[data-compare-title]')).toHaveText(
    'Start with Workflows.',
  );
});
test('native FAQ, linked disclosure and truthful contact paths', async ({
  page,
}) => {
  await page.goto('/guides/#privacy');
  await expect(page.locator('#privacy')).toHaveAttribute('open', '');
  await page.locator('#fictional summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#fictional')).toHaveAttribute('open', '');
  await page.goto('/contact/');
  await expect(page.locator('form')).toHaveCount(0);
  await page
    .getByLabel('What would you like to explore?')
    .selectOption('knowledge');
  await expect(page.locator('[data-preview-link]')).toHaveAttribute(
    'href',
    '/products/knowledge/#demo',
  );
  await expect(
    page
      .locator('.contact-card.real')
      .getByRole('link', { name: 'Explore ISMAIL', exact: true }),
  ).toHaveAttribute('href', 'https://www.ismailstudio.my/');
});
test('skip link, reduced motion, true 404 and production SEO', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('.will-reveal')).toHaveCount(0);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute(
    'content',
    'index, follow',
  );
  const r = await page.goto('/does-not-exist/');
  expect(r?.status()).toBe(404);
  expect(r?.headers()['x-robots-tag']).toBe('noindex, follow');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute(
    'content',
    'noindex, follow',
  );
});
test('no analytics requests or private search transmission', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  await page.goto('/products/knowledge/');
  await page.getByRole('searchbox').fill('PRIVATE_SENTINEL_EXAMPLE_812');
  await page.getByLabel('Guides', { exact: true }).check();
  expect(requests.some((u) => u.includes('PRIVATE_SENTINEL'))).toBeFalsy();
  expect(
    requests.every((u) => new URL(u).origin === 'http://127.0.0.1:4321'),
  ).toBeTruthy();
});
test('journal has three actual original article routes', async ({ page }) => {
  await page.goto('/journal/');
  const links = page.locator('.article-card a');
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) {
    const href = await link.getAttribute('href');
    expect(articles).toContain(href);
  }
});
test('without JavaScript all core content and sample data remain usable', async ({
  browser,
}) => {
  const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 900 },
    }),
    page = await context.newPage();
  for (const route of routes) {
    await page.goto('http://127.0.0.1:4321' + route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBeTruthy();
  }
  await page.goto('http://127.0.0.1:4321/products/knowledge/');
  await expect(page.locator('[data-document]')).toHaveCount(6);
  await page
    .locator('[data-knowledge]')
    .getByText('A considered start: client onboarding', { exact: true })
    .click();
  await expect(page.locator('.document-content:visible')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Menu', exact: true }),
  ).toBeHidden();
  await page.goto('http://127.0.0.1:4321/products/insights/');
  await page
    .getByText('Read the underlying example data', { exact: true })
    .click();
  await expect(page.locator('[data-signal-table] tr')).toHaveCount(7);
  await context.close();
});
for (const [label, width, height] of [
  ['desktop', 1440, 1040],
  ['mobile', 390, 900],
] as const)
  for (const c of contracts)
    test('capture ' + c.label + ' ' + label, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height });
      await page.goto(c.new);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path:
          (process.env.SCREENSHOT_DIR || 'artifacts/screenshots') +
          '/' +
          c.label.toLowerCase() +
          '-' +
          label +
          '.png',
        fullPage: true,
      });
      await page.screenshot({
        path:
          (process.env.SCREENSHOT_DIR || 'artifacts/screenshots') +
          '/' +
          c.label.toLowerCase() +
          '-' +
          label +
          '-viewport.png',
      });
    });
