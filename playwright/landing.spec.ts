import { expect, test } from '@playwright/test';

test('desktop leads with real Loomie product proof and a clear conversion path', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  const productFailures: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/product/') && !response.ok()) {
      productFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua clínica continua andando');
  await expect(page.getByRole('link', { name: /Ver a Loomie/i })).toBeVisible();

  const heroKanban = page.getByTestId('hero-crm-image');
  await expect(heroKanban).toBeVisible();
  await expect.poll(
    () => heroKanban.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    { message: 'Hero Kanban must decode before visual QA' },
  ).toBeGreaterThan(0);
  expect(productFailures).toEqual([]);

  await expect(page.getByRole('heading', { name: /Quando você volta para o contato/i })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-desktop.png', fullPage: true });
});

test('mobile preserves the primary CTA, product crop and reaches the demo form without document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: /Kanban do Loomie/i }).first()).toBeVisible();

  const overflow = await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const offenders = Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter(({ left, right }) => left < -1 || right > viewportWidth + 1)
      .slice(0, 12);

    return {
      viewportWidth,
      documentWidth: document.documentElement.scrollWidth,
      offenders,
    };
  });

  expect(
    overflow.documentWidth,
    `Mobile overflow: ${JSON.stringify(overflow)}`,
  ).toBeLessThanOrEqual(overflow.viewportWidth + 1);

  await page.getByRole('link', { name: /Ver a Loomie/i }).first().click();
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
