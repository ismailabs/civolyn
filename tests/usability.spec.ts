import { test, expect } from '@playwright/test';

test('navigation remains usable in a short landscape viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/platform/');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await navigation.locator('summary').click();
  const bounds = await navigation.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(391);
  await navigation.getByRole('link', { name: /Flow/ }).click();
  await expect(page).toHaveURL(/\/products\/flow\/$/);
});

test('keyboard focus has sufficient contrast on dark surfaces', async ({
  page,
}) => {
  for (const [route, scope, name] of [
    ['/', '.tile-technology', 'Explore the technology concept'],
    ['/platform/', '.dark-section', 'Explore Flow'],
  ]) {
    await page.goto(route);
    const link = page.locator(scope).getByRole('link', { name, exact: true });
    await link.focus();
    const focus = await link.evaluate((el) => {
      const style = getComputedStyle(el);
      const background = getComputedStyle(
        el.closest('.dark-section, .tile-technology')!,
      ).backgroundColor;
      const luminance = (color: string) =>
        color
          .match(/[\d.]+/g)!
          .slice(0, 3)
          .map(Number)
          .map((value) => value / 255)
          .map((value) =>
            value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
          )
          .reduce(
            (sum, value, index) =>
              sum + value * [0.2126, 0.7152, 0.0722][index],
            0,
          );
      const foreground = luminance(style.outlineColor);
      const behind = luminance(background);
      return {
        ratio:
          (Math.max(foreground, behind) + 0.05) /
          (Math.min(foreground, behind) + 0.05),
        width: parseFloat(style.outlineWidth),
      };
    });
    expect(focus.ratio).toBeGreaterThanOrEqual(3);
    expect(focus.width).toBeGreaterThanOrEqual(2);
  }
});
