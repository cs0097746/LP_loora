import { expect, type Page, test } from '@playwright/test';

async function expectNoDocumentOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));

  expect(overflow.document, `V5 document overflow: ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(overflow.viewport + 1);
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
