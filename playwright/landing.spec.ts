import { expect, test } from '@playwright/test';

test('desktop keeps the proposition, product proof and conversion path visible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Enquanto você atende');
  await expect(page.getByRole('link', { name: 'Ver a Loomie funcionando' }).first()).toBeVisible();
  await expect(page.getByText('Novo contato chegou pelo WhatsApp').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Veja a rotina tomando forma dentro da Loomie.' })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-desktop.png', fullPage: true });
});

test('mobile preserves the primary CTA and reaches the demo form', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Ver a Loomie funcionando' }).first().click();
  await expect(page.locator('#demo')).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Quero ver na minha rotina' })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-mobile.png', fullPage: true });
});

test('keyboard focus remains visible and reduced motion reveals the timeline immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('.timeline-event').first()).toHaveCSS('opacity', '1');

  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();
  await expect(focused).toHaveCSS('outline-style', 'solid');
});

test('lead form explains missing fields instead of silently failing', async ({ page }) => {
  await page.goto('/#demo');
  await page.getByRole('button', { name: 'Quero ver na minha rotina' }).click();

  await expect(page.getByText('Informe seu nome.')).toBeVisible();
  await expect(page.getByText('Informe um WhatsApp com DDD.')).toBeVisible();
  await expect(page.getByText('Selecione uma faixa de atendimentos.')).toBeVisible();
});
