import { test, expect } from '@playwright/test';
const output = 'artifacts/editorial-v3/states';
test.use({ viewport: { width: 1440, height: 1040 }, reducedMotion: 'reduce' });
test('capture six meaningful workflow states with the approval boundary intact', async ({
  page,
}) => {
  await page.goto('/products/workflows/');
  const root = page.locator('[data-flow]');
  const capture = (name: string) =>
    root.screenshot({ path: `${output}/workflows-${name}.png` });
  await expect(root).toHaveAttribute('data-state', '0');
  await capture('intake');
  await root.locator('[data-flow-next]').click();
  await expect(root).toHaveAttribute('data-state', '1');
  await capture('prepare');
  await root.locator('[data-flow-next]').click();
  await expect(root.locator('[data-flow-approve]')).toBeDisabled();
  await capture('review-waiting');
  await root.locator('[data-flow-confirm]').check();
  await expect(root.locator('[data-flow-approve]')).toBeEnabled();
  await capture('review-confirmed');
  await root.locator('[data-flow-approve]').click();
  await capture('approved');
  await capture('approved');
  await root.locator('[data-flow-next]').click();
  await expect(root.locator('.complete')).toHaveCount(4);
  await root.locator('.activity').evaluate((el: HTMLDetailsElement) => {
    el.open = true;
  });
  await capture('complete-history');
  await root.locator('[data-flow-reset]').click();
  await expect(root).toHaveAttribute('data-state', '0');
  await capture('reset');
});
test('capture sourced Knowledge results, filter, no matches and recovery', async ({
  page,
}) => {
  await page.goto('/products/knowledge/');
  const root = page.locator('[data-knowledge]');
  const capture = (name: string) =>
    root.screenshot({ path: `${output}/knowledge-${name}.png` });
  await expect(root.locator('[data-document]')).toHaveCount(6);
  await capture('initial');
  await root.getByRole('searchbox').fill('onboarding');
  await expect(root.locator('[data-document]:visible')).toHaveCount(1);
  await root.locator('[data-document]:visible summary').click();
  await expect(root.locator('.document-content:visible')).toBeVisible();
  await capture('source-open');
  await root.locator('[data-knowledge-reset]').click();
  await root.getByLabel('Policies', { exact: true }).check();
  await expect(root.locator('[data-document]:visible')).toHaveCount(1);
  await capture('filtered');
  await root.getByRole('searchbox').fill('no-such-local-document');
  await expect(root.locator('[data-knowledge-empty]')).toBeVisible();
  await capture('no-matches');
  await root.locator('[data-knowledge-reset]').click();
  await expect(root.locator('[data-document]:visible')).toHaveCount(6);
  await capture('reset');
});
test('capture every Insights fixture with its reconciled accessible table', async ({
  page,
}) => {
  await page.goto('/products/insights/');
  const root = page.locator('[data-signal]');
  await root.locator('.data-disclosure summary').click();
  for (const [period, total] of [
    ['week', '103'],
    ['month', '181'],
    ['quarter', '558'],
  ]) {
    await root.getByLabel('Period', { exact: true }).selectOption(period);
    await expect(root.locator('[data-signal-total]')).toHaveText(total);
    await expect(root.locator('[data-signal-table-total]')).toHaveText(total);
    await root.screenshot({ path: `${output}/insights-${period}.png` });
  }
});
