import { test, expect } from '@playwright/test';
import contracts from '../src/data/page-design-contract.json' with { type: 'json' };
test('engine smoke: all twelve routes and local demos', async ({ page }) => {
  test.setTimeout(90000);
  for (const c of contracts) {
    expect((await page.goto(c.new))?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  }
  await page.goto('/products/knowledge/');
  await page.getByRole('searchbox').fill('onboarding');
  await expect(page.locator('[data-document]:visible')).toHaveCount(1);
  await page.goto('/products/insights/');
  await page.getByLabel('Period', { exact: true }).selectOption('quarter');
  await expect(page.locator('[data-signal-total]')).toHaveText('558');
  await page.goto('/products/workflows/');
  await page.locator('[data-flow-next]').click();
  await page.locator('[data-flow-next]').click();
  await page.locator('[data-flow-confirm]').check();
  await page.locator('[data-flow-approve]').click();
  await page.locator('[data-flow-next]').click();
  await expect(page.locator('[data-flow] .complete')).toHaveCount(4);
});
