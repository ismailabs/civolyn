import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
for (const route of routes) {
  test(`${route} — semantics, links, assets, console and WCAG rules`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    const badResponses: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400) badResponses.push(response.url());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page
      .locator('h1,h2,h3,h4,h5,h6')
      .evaluateAll((elements) =>
        elements.map((el) => Number(el.tagName.slice(1))),
      );
    expect(
      levels.every(
        (level, index) => index === 0 || level <= levels[index - 1] + 1,
      ),
      'Headings must not skip a level',
    ).toBeTruthy();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toContainText('Fictional concept');
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        Array.from(new Set(links.map((link) => link.getAttribute('href')!))),
      );
    for (const href of hrefs) {
      const target = await request.get(href.split('#')[0] || route);
      expect(target.status(), href).toBe(200);
    }
    const missing = await page
      .locator('img')
      .evaluateAll((imgs) =>
        (imgs as HTMLImageElement[])
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src),
      );
    expect(missing).toEqual([]);
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
    expect(badResponses).toEqual([]);
    expect(errors).toEqual([]);
  });
}
for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`all routes reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(dimensions.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(
        dimensions.client + 1,
      );
    }
  });
}
test('mobile menu, product disclosure, escape and focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toBeHidden();
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.locator('.nav-group > summary').click();
  await expect(
    page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: /Flow/ }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.nav-group')).not.toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Platform', exact: true })
    .click();
  await expect(page).toHaveURL(/\/platform\/$/);
});
test('Flow explicitly pauses for human review and resets', async ({ page }) => {
  await page.goto('/products/flow/');
  const root = page.locator('[data-flow]');
  await root.getByRole('button', { name: /Start example/ }).click();
  await expect(root.getByRole('status')).toContainText('Step 1 complete');
  await root.getByRole('button', { name: /Prepare sample summary/ }).click();
  await expect(root.getByRole('status')).toContainText(
    'Paused for human review',
  );
  await expect(root.locator('[data-step="2"]')).toContainText('Your review');
  await root.getByRole('button', { name: /Approve example/ }).focus();
  await page.keyboard.press('Enter');
  await root.getByRole('button', { name: /Complete example/ }).click();
  await expect(root.getByRole('status')).toContainText(
    'no messages, projects or accounts were created',
  );
  await expect(root.locator('.complete')).toHaveCount(4);
  await root.getByRole('button', { name: 'Reset preview' }).click();
  await expect(root.locator('.complete')).toHaveCount(0);
  await expect(root.getByRole('status')).toContainText('Ready when you are');
});
test('Knowledge search, category, sources and empty recovery', async ({
  page,
}) => {
  await page.goto('/products/knowledge/');
  const search = page.getByRole('searchbox');
  await search.fill('onboarding');
  await expect(page.locator('[data-document]:visible')).toHaveCount(1);
  await page
    .getByText('A considered start: client onboarding', { exact: true })
    .click();
  await expect(page.locator('.document-content:visible')).toContainText(
    'Illustrative source: Operations handbook',
  );
  await search.fill('');
  await page.getByLabel('Policies', { exact: true }).check();
  await expect(page.locator('[data-document]:visible')).toHaveCount(1);
  await search.fill('no-such-example-123');
  await expect(
    page.getByText('No example documents found.', { exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Clear search and filters' }).click();
  await expect(page.locator('[data-document]:visible')).toHaveCount(6);
  await expect(search).toBeFocused();
});
test('Signal filters keep chart, totals and table consistent', async ({
  page,
}) => {
  await page.goto('/products/signal/');
  await page.getByLabel('Period', { exact: true }).selectOption('month');
  await expect(page.locator('[data-signal-total]')).toHaveText('490');
  await expect(page.locator('[data-signal-chart]')).toHaveAttribute(
    'aria-label',
    /Week 4 137/,
  );
  await page
    .getByText('Read the underlying example data', { exact: true })
    .click();
  await expect(page.locator('[data-signal-table] tr')).toHaveCount(4);
  await page.getByLabel('Period', { exact: true }).selectOption('quarter');
  await expect(page.locator('[data-signal-total]')).toHaveText('1,410');
  await expect(page.locator('[data-signal-table] tr')).toHaveCount(3);
  await expect(page.locator('[data-signal-table]')).toContainText('Month 3');
});
test('comparison finder changes result and destination', async ({ page }) => {
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
    'Start with Signal.',
  );
});
test('FAQ keyboard disclosure and contact destinations are honest', async ({
  page,
}) => {
  await page.goto('/support/');
  const faq = page
    .locator('.faq-list summary')
    .filter({ hasText: 'Is CIVOLYN a real software company?' });
  await faq.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.faq-list details[open]')).toHaveCount(1);
  await page.goto('/contact/');
  await expect(page.locator('main')).toContainText('fictional concept');
  await expect(page.locator('form')).toHaveCount(0);
  await page
    .getByLabel('What would you like to explore?')
    .selectOption('knowledge');
  await expect(page.locator('[data-preview-link]')).toHaveAttribute(
    'href',
    '/products/knowledge/#preview',
  );
  await expect(
    page
      .getByRole('main')
      .getByRole('link', { name: 'Explore ISMAIL', exact: true }),
  ).toHaveAttribute('href', 'https://www.ismailstudio.my/');
  await expect(
    page.getByRole('link', { name: /Discuss your website on WhatsApp/ }),
  ).toHaveAttribute('href', 'https://wa.me/601163265610');
});
test('skip link, keyboard order, reduced motion, zoom-equivalent reflow and 404', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('.will-reveal')).toHaveCount(0);
  // 1280px browser at 200% zoom exposes a 640 CSS-pixel layout viewport.
  await page.setViewportSize({ width: 640, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBeTruthy();
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, follow',
  );
});
test('journal anchors resolve without creating article routes', async ({
  page,
}) => {
  await page.goto('/journal/');
  const links = page
    .getByRole('navigation', { name: 'Journal essays' })
    .getByRole('link');
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) {
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page.locator(href!)).toBeVisible();
  }
});
test('no-JavaScript content remains readable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/products/knowledge/');
  await expect(page.locator('[data-document]')).toHaveCount(6);
  await page
    .getByText('A considered start: client onboarding', { exact: true })
    .click();
  await expect(page.locator('.document-content:visible')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Menu', exact: true }),
  ).toBeHidden();
  await context.close();
});
for (const [label, width, height] of [
  ['desktop', 1440, 1000],
  ['mobile', 390, 844],
] as const) {
  for (const route of routes) {
    test(`capture ${route} at ${label} size`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const name =
        route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
      await page.screenshot({
        path: `artifacts/screenshots/${name}-${label}.png`,
        fullPage: true,
      });
    });
  }
}
