import { expect, type Locator, type Page, test } from '@playwright/test';

async function expectSharpImage(image: Locator, minimumRatio = 1) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect.poll(
    () => image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
    { message: 'Product image must decode before visual QA' },
  ).toBeGreaterThan(0);

  const ratio = await image.evaluate((node) => {
    const element = node as HTMLImageElement;
    const renderedWidth = element.getBoundingClientRect().width;
    return renderedWidth > 0 ? element.naturalWidth / renderedWidth : 0;
  });
  expect(ratio, `Expected intrinsic/rendered ratio >= ${minimumRatio}, received ${ratio}`).toBeGreaterThanOrEqual(minimumRatio);
}

async function expectNoDocumentOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
  expect(overflow.documentWidth, `Document overflow: ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(overflow.viewportWidth + 1);
}

test('desktop production home renders the complete V5 with real product proof', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  const productFailures: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/product-v4/') && !response.ok()) {
      productFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /Sua atenção está na sessão\. A rotina continua acontecendo\./i })).toBeVisible();
  await expect(page.getByTestId('v5-pressure')).toBeVisible();
  await expect(page.getByTestId('v5-inbound')).toBeVisible();
  await expect(page.getByTestId('v5-week')).toBeVisible();
  await expectSharpImage(page.getByTestId('v5-proof-kanban'), 1);
  await expectSharpImage(page.getByTestId('v5-proof-history'), 1);
  await expect(page.getByRole('heading', { name: /Leora: uma fronteira clara\./i })).toBeVisible();
  await expect(page.getByTestId('v5-end-of-day')).toBeVisible();
  await expect(page.locator('#demo')).toBeVisible();
  await expectNoDocumentOverflow(page);
  expect(productFailures).toEqual([]);

  await page.screenshot({ path: 'test-results/landing-desktop.png', fullPage: true });
});

test('mobile production home has no overflow and reaches the real lead form', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua atenção está na sessão');
  await expectSharpImage(page.getByTestId('v5-proof-kanban'));
  await expectSharpImage(page.getByTestId('v5-proof-history'));
  await expectNoDocumentOverflow(page);

  await page.getByRole('link', { name: /Ver a Loomie na minha rotina/i }).first().click();
  await expect(page.locator('#demo')).toBeInViewport();
  await expect(page.getByRole('button', { name: /Quero ver a Loomie na minha rotina/i })).toBeVisible();

  await page.screenshot({ path: 'test-results/landing-mobile.png', fullPage: true });
});

test('production home honors reduced motion and keeps keyboard focus visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('v5-hero-sequence')).toHaveAttribute('data-phase', 'confirmed', { timeout: 500 });
  await expect(page.getByTestId('v5-week')).toHaveAttribute('data-state', 'settled', { timeout: 500 });

  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();
});

test('production lead form explains missing fields instead of silently failing', async ({ page }) => {
  await page.goto('/#demo');
  await page.getByRole('button', { name: /Quero ver a Loomie na minha rotina/i }).click();

  await expect(page.getByText('Informe seu nome.')).toBeVisible();
  await expect(page.getByText('Informe um WhatsApp com DDD.')).toBeVisible();
  await expect(page.getByText('Selecione uma faixa de atendimentos.')).toBeVisible();
  await expect(page.getByText('Não envie informações clínicas de pacientes neste formulário.')).toBeVisible();
});
