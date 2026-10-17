import { test, expect } from '@playwright/test';
import contracts from '../src/data/page-design-contract.json' with { type: 'json' };
test('short landscape navigation remains reachable', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/platform/');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await navigation.locator('summary').click();
  const bounds = await navigation.boundingBox();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(391);
  await navigation.getByRole('link', { name: /Workflows/ }).click();
  await expect(page).toHaveURL(/\/products\/workflows\/$/);
});
test('all core pages support 200 percent text enlargement', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const c of contracts) {
    await page.goto(c.new);
    await page.addStyleTag({
      content:
        'html{font-size:200%}body{font-size:inherit}p,a,button,label,summary,input,select{font-size:inherit!important}',
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      c.label,
    ).toBeTruthy();
  }
});
test('focus is visible against dark conversion surfaces', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('.concept-strip a');
  await link.focus();
  const f = await link.evaluate((el) => {
    const s = getComputedStyle(el),
      bg = getComputedStyle(el.closest('.concept-strip')!);
    function l(c: string) {
      return c
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number)
        .map((x) => x / 255)
        .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
        .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
    }
    const a = l(s.outlineColor),
      b = l(bg.backgroundColor);
    return {
      ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
      width: parseFloat(s.outlineWidth),
    };
  });
  expect(f.ratio).toBeGreaterThanOrEqual(3);
  expect(f.width).toBeGreaterThanOrEqual(2);
});
