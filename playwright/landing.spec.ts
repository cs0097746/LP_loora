import { expect, type Locator, type Page, test } from '@playwright/test';

async function expectSharpImage(image: Locator, minimumRatio = 1) {
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

async function renderedInkRatio(page: Page, target: Locator) {
  await expect(target).toBeVisible();
  const screenshot = await target.screenshot();

  return page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/png;base64,${base64}`;
    await image.decode();

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return 0;

    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let sampled = 0;
    let ink = 0;

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        sampled += 1;
        if (alpha > 0 && Math.min(red, green, blue) < 220) ink += 1;
      }
    }

    return sampled > 0 ? ink / sampled : 0;
  }, screenshot.toString('base64'));
}

test('desktop renders V4 with sharp real product proof and section-level QA artifacts', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  const productFailures: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/product-v4/') && !response.ok()) {
      productFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /Você entra em sessão\. O WhatsApp não para\./i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Ver como funciona na minha clínica/i })).toBeVisible();
  await expectSharpImage(page.getByTestId('v4-hero-product'), 1.25);
  await expect(page.getByRole('heading', { name: /Tudo que chega encontra um lugar\./i })).toBeVisible();
  await expectSharpImage(page.getByTestId('v4-kanban-main'), 1.25);

  await expect(page.getByRole('heading', { name: /O repetitivo não precisa disputar sua atenção\./i })).toBeVisible();
  await expect(page.getByText('VOCÊ DECIDE')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Você não precisa lembrar onde aquela conversa parou\./i })).toBeVisible();
  await expectSharpImage(page.getByTestId('v4-history-image'));
  await expectSharpImage(page.getByTestId('v4-automation-image'));

  await expect(page.getByTestId('v4-task-image')).toHaveCount(0);
  await expect(page.getByTestId('v4-task-example')).toBeVisible();
  await expect(page.getByText('EXEMPLO ILUSTRATIVO')).toBeVisible();
  await expect(page.getByText('Confirmar presença')).toBeVisible();

  const taskInk = await renderedInkRatio(page, page.locator('.v4-causal__side--then .v4-causal__viewport'));
  expect(taskInk, `Task example looks visually empty: ink ratio ${taskInk}`).toBeGreaterThan(0.025);

  await expect(page.getByRole('heading', { name: /Você olha uma vez e sabe o que está acontecendo\./i })).toBeVisible();
  await expectSharpImage(page.getByTestId('v4-dashboard-image'), 1.25);
  await expect(page.getByRole('heading', { name: /Quanto da sua semana ainda está preso no operacional\?/i })).toBeVisible();

  expect(productFailures).toEqual([]);

  await page.waitForTimeout(6200);
  await page.locator('.v4-hero').screenshot({ path: 'test-results/v4-hero-desktop.png' });
  await page.locator('.v4-kanban').screenshot({ path: 'test-results/v4-kanban-desktop.png' });

  const middleStory = page.locator('[data-v4-story-step="1"]');
  await middleStory.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  await page.locator('.v4-story').screenshot({ path: 'test-results/v4-story-desktop.png' });

  await page.locator('.v4-leora').screenshot({ path: 'test-results/v4-leora-desktop.png' });
  await page.locator('.v4-proof--history').screenshot({ path: 'test-results/v4-history-desktop.png' });
  await page.locator('.v4-proof--automation').screenshot({ path: 'test-results/v4-automation-desktop.png' });
  await page.locator('.v4-dashboard').screenshot({ path: 'test-results/v4-dashboard-desktop.png' });
  await page.locator('.v4-conversion').screenshot({ path: 'test-results/v4-conversion-desktop.png' });
  await page.screenshot({ path: 'test-results/landing-desktop.png', fullPage: true });
});

test('mobile uses dedicated V4 product crops without document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Você entra em sessão');
  await expectSharpImage(page.getByTestId('v4-hero-product'));
  await expect(page.locator('.v4-story__sticky')).toBeHidden();
  await expect(page.locator('.v4-story__mobile-media')).toHaveCount(3);

  const overflow = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
  expect(overflow.documentWidth, `Mobile document overflow: ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(overflow.viewportWidth + 1);

  await page.getByRole('link', { name: /Ver como funciona na minha clínica/i }).click();
  await expect(page.locator('#demo')).toBeInViewport();
  await expect(page.getByRole('button', { name: /Quero ver a Loomie na minha rotina/i })).toBeVisible();

  await page.locator('.v4-hero').screenshot({ path: 'test-results/v4-hero-mobile.png' });
  await page.locator('.v4-story').screenshot({ path: 'test-results/v4-story-mobile.png' });
  await page.locator('.v4-leora').screenshot({ path: 'test-results/v4-leora-mobile.png' });
  await page.locator('.v4-conversion').screenshot({ path: 'test-results/v4-conversion-mobile.png' });
  await page.screenshot({ path: 'test-results/landing-mobile.png', fullPage: true });
});

test('mobile header leaves the viewport before long-form product storytelling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const header = page.locator('.site-header');
  const storyHeading = page.locator('.v4-story .v4-section-head');
  await expect(header).toBeVisible();
  await storyHeading.scrollIntoViewIfNeeded();
  await expect(storyHeading).toBeInViewport();
  await expect(header).not.toBeInViewport();
});

test('reduced motion exposes V4 final states and keyboard focus remains visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('.v4-wa-card')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.v4-wa-card')).toHaveCSS('opacity', '1');
  await expect(page.locator('.v4-hero__focus')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.v4-leora__node').first()).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.v4-leora__boundary strong')).toHaveText('Avaliação, decisão e conduta clínica continuam com você.');

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
