import { expect, test } from '@playwright/test';

test('V5 week settles once from awaiting confirmation to confirmed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/v5');

  const week = page.getByTestId('v5-week');
  await expect(week).toHaveAttribute('data-state', 'pending');
  await expect(week).toContainText('aguardando');
  await expect(week).toHaveAttribute('data-state', 'settled', { timeout: 3_500 });
  await expect(week).toContainText('confirmado');
});

test('V5 week reduced motion renders its settled equivalent immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/v5');

  await expect(page.getByTestId('v5-week')).toHaveAttribute('data-state', 'settled', { timeout: 500 });
  await expect(page.getByTestId('v5-week')).toContainText('confirmado');
});
