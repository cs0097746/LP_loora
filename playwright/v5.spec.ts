import { expect, type Locator, type Page, test } from '@playwright/test';

async function expectNoDocumentOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));

  expect(overflow.document, `V5 document overflow: ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(overflow.viewport + 1);
}

async function expectMinimumFontSize(locator: Locator, minimum: number) {
  await expect(locator).toBeVisible();
  const size = await locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(size, `Expected font size >= ${minimum}px, received ${size}px`).toBeGreaterThanOrEqual(minimum);
}

async function captureStaticHero(page: Page, width: number, height: number, path: string) {
  await page.setViewportSize({ width, height });
  await page.goto('/v5');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua atenção está na sessão');
  await expect(page.getByTestId('v5-session')).toContainText('Sessão · 14:00–14:50');
  await expect(page.getByTestId('v5-message')).toBeVisible();
  await expect(page.getByTestId('v5-contact')).toContainText('Marina');
  await expect(page.getByTestId('v5-next-step')).toContainText('próximo passo');
  await expect(page.getByTestId('v5-slot')).toContainText('confirmado');
  await expectNoDocumentOverflow(page);

  await page.getByTestId('v5-hero').screenshot({ path });
}

test('V5 static hero is art-directed across target viewports', async ({ page }) => {
  await captureStaticHero(page, 1440, 1000, 'test-results/v5-hero-static-desktop.png');
  await captureStaticHero(page, 1728, 1100, 'test-results/v5-hero-static-wide.png');
  await captureStaticHero(page, 768, 1024, 'test-results/v5-hero-static-tablet.png');
  await captureStaticHero(page, 390, 844, 'test-results/v5-hero-static-mobile.png');
});

test('V5 mobile hero keeps object labels and supporting text legible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/v5');

  await expectMinimumFontSize(page.getByTestId('v5-session').getByText('você está atendendo', { exact: true }), 11);
  await expectMinimumFontSize(page.getByTestId('v5-contact').getByText('NOVO CONTATO', { exact: true }), 11);
  await expectMinimumFontSize(page.getByTestId('v5-contact').getByText('via mensagem', { exact: true }), 14);
  await expectMinimumFontSize(page.getByTestId('v5-next-step').getByText('PRÓXIMO PASSO', { exact: true }), 11);
  await expectMinimumFontSize(page.getByTestId('v5-next-step').getByText('rotina administrativa', { exact: true }), 14);
  await expectMinimumFontSize(page.getByTestId('v5-slot').getByText('HORÁRIO', { exact: true }), 11);
  await expectMinimumFontSize(page.getByTestId('v5-slot').getByText('agenda', { exact: true }), 14);
});
