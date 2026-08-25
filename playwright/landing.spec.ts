import { expect, test } from '@playwright/test';

test('landing keeps the primary proposition and CTA visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Enquanto você atende');
  await expect(page.getByRole('link', { name: 'Ver a Loomie funcionando' }).first()).toBeVisible();
  await expect(page.getByText('Novo contato chegou pelo WhatsApp').first()).toBeVisible();
});

test('mobile layout preserves the conversion path', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Ver a Loomie funcionando' }).first().click();
  await expect(page.locator('#demo')).toBeInViewport();
});
