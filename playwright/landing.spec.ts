import { expect, test } from '@playwright/test';

test('desktop renders the complete V3 product story and real Loomie media', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  const productFailures: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/product/') && !response.ok()) {
      productFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua clínica continua andando');
  await expect(page.getByRole('link', { name: /Ver a Loomie funcionando/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'WhatsApp organizado.' })).toBeVisible();

  const heroKanban = page.getByTestId('hero-crm-image');
  await expect(heroKanban).toBeVisible();
  await expect.poll(
    () => heroKanban.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    { message: 'Hero Kanban must decode before visual QA' },
  ).toBeGreaterThan(0);

  await expect(page.getByRole('heading', { name: /O repetitivo acontece sem disputar sua atenção/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Contexto que continua existindo quando você fecha o WhatsApp/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Veja o que está acontecendo sem reconstruir sua rotina de cabeça/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Conectamos sua rotina. Não pedimos que você vire operador de software.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Quanto da sua semana ainda está preso/i })).toBeVisible();

  expect(productFailures).toEqual([]);
  await page.screenshot({ path: 'test-results/landing-desktop.png', fullPage: true });
});

test('mobile preserves the primary CTA, sequential product story and reaches the form without document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByTestId('hero-crm-image')).toBeVisible();
  await expect(page.getByRole('link', { name: /Ver a Loomie funcionando/i })).toBeVisible();

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
      .slice(0, 16);

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

  await page.getByRole('link', { name: /Ver a Loomie funcionando/i }).first().click();
  await expect(page.locator('#demo')).toBeInViewport();
  await expect(page.getByRole('button', { name: /Quero ver a Loomie na minha rotina/i })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-mobile.png', fullPage: true });
});

test('reduced motion exposes final state and keyboard focus remains visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('hero-crm-image')).toBeVisible();
  await expect(page.locator('.v3-whatsapp')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.v3-demo-card')).toHaveCSS('opacity', '1');
  await expect(page.getByText(/avaliação, decisão e conduta clínica continuam humanas/i)).toBeVisible();

  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();
  await expect(focused).toHaveCSS('outline-style', 'solid');
});

test('lead form explains missing fields instead of silently failing', async ({ page }) => {
  await page.goto('/#demo');
  await page.getByRole('button', { name: /Quero ver a Loomie na minha rotina/i }).click();

  await expect(page.getByText('Informe seu nome.')).toBeVisible();
  await expect(page.getByText('Informe um WhatsApp com DDD.')).toBeVisible();
  await expect(page.getByText('Selecione uma faixa de atendimentos.')).toBeVisible();
  await expect(page.getByText(/Não envie informações clínicas de pacientes/i)).toBeVisible();
});
