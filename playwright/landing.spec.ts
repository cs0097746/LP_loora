import { expect, test } from '@playwright/test';

test('desktop leads with real Loomie product proof and a clear conversion path', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua clínica continua andando');
  await expect(page.getByRole('link', { name: 'Ver a Loomie na minha rotina' })).toBeVisible();
  await expect(page.getByRole('img', { name: /Kanban do Loomie/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quando você volta para o contato, o contexto ainda está lá.' })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-desktop.png', fullPage: true });
});

test('mobile preserves the primary CTA, product crop and reaches the demo form without document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: /Kanban do Loomie/i }).first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

  await page.getByRole('link', { name: 'Ver a Loomie na minha rotina' }).click();
  await expect(page.locator('#demo')).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Quero ver na minha rotina' })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-mobile.png', fullPage: true });
});

test('keyboard focus remains visible with reduced motion enabled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByRole('img', { name: /Kanban do Loomie/i }).first()).toBeVisible();

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
