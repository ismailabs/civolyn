import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

test('Guides search matches authored answers locally and recovers from an empty result', async ({
  page,
  baseURL,
}) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/guides/');
  const search = page.getByRole('searchbox', { name: 'Find a helpful answer' });
  await search.fill('APPROVAL');
  await expect(page.locator('#approval')).toBeVisible();
  await expect(page.locator('[data-guide-count]')).toContainText(
    'helpful answer',
  );
  await search.fill('PRIVATE_SENTINEL_NO_MATCH_8192');
  await expect(page.locator('[data-guide-empty]')).toBeVisible();
  await expect(page.locator('[data-guide]:visible')).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Clear guide search', exact: true })
    .click();
  await expect(page.locator('[data-guide]:visible')).toHaveCount(8);
  await expect(search).toBeFocused();
  await search.fill('no-matching-guide');
  await page.evaluate(() => {
    location.hash = 'privacy';
  });
  await expect(page.locator('#privacy')).toBeVisible();
  await expect(page.locator('#privacy')).toHaveAttribute('open', '');
  await expect(search).toHaveValue('');
  expect(
    requests.every((url) => new URL(url).origin === new URL(baseURL!).origin),
  ).toBeTruthy();
  expect(requests.some((url) => url.includes('PRIVATE_SENTINEL'))).toBeFalsy();
});

test('mobile keyboard, focus, landmarks and reduced motion evidence', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content', exact: true }),
  ).toBeFocused();
  await page.screenshot({
    path: 'artifacts/editorial-v3/states/keyboard-focus.png',
  });
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.focus();
  await page.keyboard.press('Enter');
  await page.screenshot({
    path: 'artifacts/editorial-v3/states/mobile-navigation.png',
  });
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.motion-ready')).toHaveCount(0);
  await page.screenshot({
    path: 'artifacts/editorial-v3/states/reduced-motion.png',
  });
  await fs.mkdir('artifacts/editorial-v3', { recursive: true });
  await fs.writeFile(
    'artifacts/editorial-v3/accessibility-tree.txt',
    await page.locator('body').ariaSnapshot(),
  );
  for (const route of [
    '/products/workflows/',
    '/products/knowledge/',
    '/products/insights/',
    '/guides/',
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});
