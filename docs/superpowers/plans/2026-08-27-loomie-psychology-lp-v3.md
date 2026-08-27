# Loomie para Psicólogos V3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the psychology landing page as a premium product-cinematic experience with a demonstrative hero sequence, scroll storytelling, art-directed real CRM media, explicit human clinical boundaries, and preserved lead conversion infrastructure.

**Architecture:** Keep Next.js App Router and the existing lead/analytics backend, but replace the V2 page composition with focused `components/v3/*` presentation units. Use CSS + small IntersectionObserver-driven client components for motion instead of adding an animation dependency. Real CRM screenshots remain static source assets; animated overlays are explicitly demonstrative layers. Remove `output: 'standalone'` so local `npm run start` serves `public/` assets correctly, and upgrade Next.js to the patched Active LTS `16.3.3` before further feature work.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript 5.9, Tailwind 4/PostCSS, CSS animations, IntersectionObserver, Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-27-loomie-psychology-lp-v3-design.md`

## Global Constraints

- Primary brand is **Loomie para Psicólogos**; Leora is an operational assistant, not a clinical agent.
- Hero core promise remains: **“Sua clínica continua andando enquanto você está em sessão.”**
- Real CRM surfaces dominate; animated state over screenshots is labeled/structured as demonstrative, never as live proof.
- No absolute LGPD/CFP/encryption claims unless technically verified.
- No guaranteed time savings, fabricated ROI, fake customer proof, therapeutic/crisis automation, or empty calendar proof.
- Motion must remain understandable with `prefers-reduced-motion` and must not hijack scroll.
- Existing `/api/lead`, lead validation, UTM storage and conversion submission behavior remain intact.
- Minimum QA viewports: 1440px desktop and 390px mobile.
- Release blocker: hero product asset must return successfully, decode with `naturalWidth > 0`, and visibly render in QA screenshots.
- Next.js must be upgraded from vulnerable `16.3.2` to patched `16.3.3` before PR readiness.

---

### Task 1: Secure runtime baseline and product-media reliability

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `next.config.ts`
- Modify: `playwright.config.ts`
- Modify: `playwright/landing.spec.ts`
- Create: `tests/runtime-contract.test.ts`

**Interfaces:**
- Consumes: existing `npm run build`, `npm run start`, Playwright web server.
- Produces: production start mode that serves `/public/product/*`; patched Next 16.3.3 dependency; browser assertions that critical CRM media decoded.

- [ ] **Step 1: Write failing runtime contract tests**

Create `tests/runtime-contract.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('V3 runtime contract', () => {
  it('uses the patched Next.js security release', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    expect(pkg.dependencies.next).toBe('16.3.3');
    expect(pkg.devDependencies['eslint-config-next']).toBe('16.3.3');
  });

  it('uses normal Next production serving for local and CI QA', () => {
    const config = readFileSync('next.config.ts', 'utf8');
    expect(config).not.toContain("output: 'standalone'");
  });
});
```

- [ ] **Step 2: Extend Playwright with a critical-image decode assertion**

In the desktop test, assert the first hero CRM image has pixels:

```ts
const heroImage = page.getByTestId('hero-crm-image');
await expect(heroImage).toBeVisible();
await expect.poll(async () => heroImage.evaluate((img: HTMLImageElement) => ({
  complete: img.complete,
  width: img.naturalWidth,
  height: img.naturalHeight,
}))).toEqual(expect.objectContaining({ complete: true, width: expect.any(Number), height: expect.any(Number) }));
expect(await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
```

Also capture failed `/product/` responses:

```ts
const productFailures: string[] = [];
page.on('response', (response) => {
  if (response.url().includes('/product/') && !response.ok()) productFailures.push(`${response.status()} ${response.url()}`);
});
// after render
expect(productFailures).toEqual([]);
```

- [ ] **Step 3: Run tests to verify RED**

Run: `npm test -- tests/runtime-contract.test.ts && npm run test:e2e -- --grep "desktop"`

Expected: runtime test fails on `16.3.2` and `output: 'standalone'`; current hero may fail the new test id/decode contract.

- [ ] **Step 4: Upgrade Next and remove standalone output**

Update `package.json`:

```json
"next": "16.3.3"
```

and:

```json
"eslint-config-next": "16.3.3"
```

Update `next.config.ts` to:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

Regenerate/update `package-lock.json` via `npm install --legacy-peer-deps --no-audit --no-fund` so both top-level requirements and resolved `next`/`eslint-config-next` entries are 16.3.3.

- [ ] **Step 5: Make CI E2E use the same production server users run locally**

Keep Playwright CI web server as:

```ts
command: process.env.CI
  ? `npm run start -- --hostname ${host}`
  : `npm run dev -- --hostname ${host}`,
```

No standalone server fallback should remain in docs/tests.

- [ ] **Step 6: Run security/runtime verification GREEN**

Run: `npm test -- tests/runtime-contract.test.ts && npm run build && npm run test:e2e -- --grep "desktop"`

Expected: PASS and the hero asset returns/decodes.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json next.config.ts playwright.config.ts playwright/landing.spec.ts tests/runtime-contract.test.ts
git commit -m "fix: secure V3 runtime and product media serving"
```

---

### Task 2: Build the cinematic hero signature interaction

**Files:**
- Create: `components/v3/CinematicHero.tsx`
- Create: `components/v3/ProductCanvas.tsx`
- Create: `components/v3/DemoWhatsApp.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/page.test.tsx`
- Create: `tests/CinematicHero.test.tsx`

**Interfaces:**
- `ProductCanvas` consumes `/product/loomie-kanban.webp` and optional overlay children.
- `DemoWhatsApp` renders only fictitious administrative copy.
- `CinematicHero` produces `data-testid="hero-crm-image"`, primary `#demo` CTA, CRM login CTA, and the once-only demonstrative sequence.

- [ ] **Step 1: Write the failing hero component test**

Create `tests/CinematicHero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { CinematicHero } from '@/components/v3/CinematicHero';

describe('CinematicHero', () => {
  it('presents real product proof with an explicitly demonstrative admin flow', () => {
    render(<CinematicHero />);
    expect(screen.getByRole('heading', { level: 1, name: /sua clínica continua andando enquanto você está em sessão/i })).toBeInTheDocument();
    expect(screen.getByText(/oi, gostaria de saber os horários disponíveis/i)).toBeInTheDocument();
    expect(screen.getByText(/leora organizando/i)).toBeInTheDocument();
    expect(screen.getByText(/demonstração visual/i)).toBeInTheDocument();
    expect(screen.getByTestId('hero-crm-image')).toHaveAttribute('src', '/product/loomie-kanban.webp');
    expect(screen.getByRole('link', { name: /ver a loomie funcionando/i })).toHaveAttribute('href', '#demo');
  });
});
```

- [ ] **Step 2: Run hero test RED**

Run: `npm test -- tests/CinematicHero.test.tsx`

Expected: FAIL because `components/v3/CinematicHero.tsx` does not exist.

- [ ] **Step 3: Implement focused hero units**

`ProductCanvas.tsx` uses a direct static image path so browser asset behavior is observable:

```tsx
import type { ReactNode } from 'react';

export function ProductCanvas({ children }: { children?: ReactNode }) {
  return (
    <div className="v3-product-canvas">
      <img
        data-testid="hero-crm-image"
        className="v3-product-canvas__image"
        src="/product/loomie-kanban.webp"
        alt="Kanban demonstrativo do Loomie organizando contatos fictícios"
        width="1000"
        height="439"
        decoding="async"
        fetchPriority="high"
      />
      {children}
    </div>
  );
}
```

`DemoWhatsApp.tsx` renders:

```tsx
export function DemoWhatsApp() {
  return (
    <aside className="v3-whatsapp" aria-label="Demonstração visual de uma mensagem administrativa fictícia">
      <span className="v3-demo-label">Demonstração visual</span>
      <span className="v3-whatsapp__sender">Novo contato</span>
      <p>Oi, gostaria de saber os horários disponíveis.</p>
      <span className="v3-leora-state">Leora organizando</span>
    </aside>
  );
}
```

`CinematicHero.tsx` combines copy, tracked CTAs, real Kanban, WhatsApp overlay, a CSS-driven demo card and an accessible static final state.

- [ ] **Step 4: Add one-shot hero motion CSS**

Add scoped keyframes/classes for:

```css
@keyframes v3-message-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes v3-card-progress { 0%, 48% { transform: translate3d(0,0,0); } 72%, 100% { transform: translate3d(118px,18px,0); } }
@keyframes v3-status-pulse { 0%, 30% { opacity: 0; } 45%, 80% { opacity: 1; } 100% { opacity: .72; } }
```

Animations run once with `animation-fill-mode: both`. Add a visible `Demonstração visual` chip.

- [ ] **Step 5: Replace only the V2 hero in `app/page.tsx`**

Import `CinematicHero` but leave the remaining V2 sections temporarily so this task is independently testable.

- [ ] **Step 6: Run hero unit + page tests GREEN**

Run: `npm test -- tests/CinematicHero.test.tsx tests/page.test.tsx`

Expected: PASS after updating page assertions to the new CTA label.

- [ ] **Step 7: Commit**

```bash
git add components/v3 app/page.tsx app/globals.css tests/CinematicHero.test.tsx tests/page.test.tsx
git commit -m "feat: add cinematic Loomie product hero"
```

---

### Task 3: Add editorial manifesto and progressive scroll story

**Files:**
- Create: `components/v3/Manifesto.tsx`
- Create: `components/v3/ScrollStory.tsx`
- Create: `components/v3/story-data.ts`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `tests/ScrollStory.test.tsx`
- Modify: `tests/page.test.tsx`

**Interfaces:**
- `story-data.ts` exports `storySteps` with `{ id, time, title, body, scene }`.
- `ScrollStory` uses IntersectionObserver to set an active step on desktop; all four steps remain semantic and readable without JS.

- [ ] **Step 1: Write failing narrative contract test**

Create `tests/ScrollStory.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { ScrollStory } from '@/components/v3/ScrollStory';

it('contains the complete administrative story in chronological order', () => {
  render(<ScrollStory />);
  const times = ['14:32', '14:33', '14:35', '14:40'];
  times.forEach((time) => expect(screen.getByText(new RegExp(time))).toBeInTheDocument());
  expect(screen.getByText(/chegou um novo contato/i)).toBeInTheDocument();
  expect(screen.getByText(/o contexto entrou no loomie/i)).toBeInTheDocument();
  expect(screen.getByText(/o próximo passo ficou claro/i)).toBeInTheDocument();
  expect(screen.getByText(/o follow-up já está organizado/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test RED**

Run: `npm test -- tests/ScrollStory.test.tsx`

Expected: FAIL because `ScrollStory` does not exist.

- [ ] **Step 3: Implement manifesto**

Render exactly three large statements with concise copy:

```ts
const manifesto = [
  ['WhatsApp organizado.', 'Novos contatos deixam de depender de abas abertas e memória.'],
  ['Rotina administrativa automatizada.', 'Confirmações, lembretes e follow-ups entram em um fluxo configurado.'],
  ['Decisão clínica sempre humana.', 'O Loomie organiza o operacional; avaliação e conduta continuam com você.'],
];
```

- [ ] **Step 4: Implement scroll story data and controller**

`story-data.ts`:

```ts
export const storySteps = [
  { id: 'contact', time: '14:32', title: 'Chegou um novo contato', body: 'Uma mensagem administrativa inicia a jornada.', scene: 'contact' },
  { id: 'context', time: '14:33', title: 'O contexto entrou no Loomie', body: 'O contato ganha lugar no fluxo e deixa de ficar solto no WhatsApp.', scene: 'kanban' },
  { id: 'next-step', time: '14:35', title: 'O próximo passo ficou claro', body: 'Etapa e responsável deixam visível o que precisa acontecer agora.', scene: 'progress' },
  { id: 'follow-up', time: '14:40', title: 'O follow-up já está organizado', body: 'Tarefas e gatilhos administrativos sustentam a continuidade.', scene: 'follow-up' },
] as const;
```

Use `IntersectionObserver` with `rootMargin: '-35% 0px -45% 0px'` and set `data-active-scene` on the visual stage.

- [ ] **Step 5: Build desktop sticky and mobile sequential CSS**

Desktop `> 900px`: two-column grid, left steps, right `position: sticky; top: 120px` scene. Mobile: disable sticky, render each step followed by its scene; no horizontal transform beyond clipped media wrappers.

- [ ] **Step 6: Replace V2 trust/pain sections in `app/page.tsx`**

Order becomes `CinematicHero → Manifesto → ScrollStory`.

- [ ] **Step 7: Run narrative tests GREEN**

Run: `npm test -- tests/ScrollStory.test.tsx tests/page.test.tsx`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add components/v3 app/page.tsx app/globals.css tests/ScrollStory.test.tsx tests/page.test.tsx
git commit -m "feat: add Loomie scroll storytelling"
```

---

### Task 4: Build Leora flow and art-directed real product proof

**Files:**
- Create: `components/v3/LeoraFlow.tsx`
- Create: `components/v3/ProductProof.tsx`
- Create: `components/v3/DashboardProof.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `tests/LeoraFlow.test.tsx`
- Create: `tests/ProductProof.test.tsx`

**Interfaces:**
- `LeoraFlow` renders six accessible nodes ending at `Você decide`.
- `ProductProof` uses real `/product/loomie-contact-history.webp`, `/product/loomie-automations.webp`, `/product/loomie-tasks.webp`.
- `DashboardProof` uses `/product/loomie-dashboard.webp` and only demo-supported callouts.

- [ ] **Step 1: Write failing Leora boundary test**

```tsx
import { render, screen } from '@testing-library/react';
import { LeoraFlow } from '@/components/v3/LeoraFlow';

it('ends automation at human judgment', () => {
  render(<LeoraFlow />);
  ['Novo contato', 'Organizar', 'Confirmar', 'Lembrar', 'Sinalizar', 'Você decide'].forEach((label) => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });
  expect(screen.getByText(/avaliação, decisão e conduta clínica continuam humanas/i)).toBeInTheDocument();
  expect(screen.queryByText(/respiração|diagnóstico|crise tratada automaticamente/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Write failing product-media test**

```tsx
import { render, screen } from '@testing-library/react';
import { ProductProof } from '@/components/v3/ProductProof';

it('uses authentic demo surfaces instead of generic feature cards', () => {
  render(<ProductProof />);
  expect(screen.getByRole('img', { name: /histórico administrativo/i })).toHaveAttribute('src', '/product/loomie-contact-history.webp');
  expect(screen.getByRole('img', { name: /gatilhos administrativos/i })).toHaveAttribute('src', '/product/loomie-automations.webp');
  expect(screen.getByRole('img', { name: /tarefa administrativa/i })).toHaveAttribute('src', '/product/loomie-tasks.webp');
  expect(screen.getByText(/você não precisa lembrar onde aquela conversa parou/i)).toBeInTheDocument();
});
```

- [ ] **Step 3: Run both tests RED**

Run: `npm test -- tests/LeoraFlow.test.tsx tests/ProductProof.test.tsx`

Expected: FAIL because components do not exist.

- [ ] **Step 4: Implement high-contrast Leora flow**

Render semantic ordered nodes and a decorative connector layer. Use CSS sequential activation only when the section receives `.is-visible` from a one-shot IntersectionObserver. Final node uses a distinct border/fill and text `Você decide`.

- [ ] **Step 5: Implement context/history product composition**

Use one authentic screenshot and one CSS-clipped duplicate crop of the same source to highlight stage/tags/comments. The duplicate has `aria-hidden="true"`; only the main image gets meaningful alt text.

- [ ] **Step 6: Implement automations/tasks composition**

Place triggers and scheduled tasks in overlapping but readable layers with textual relationship labels: `quando acontece`, `o Loomie organiza`, `o que exige atenção chega até você`. Demo/inactive disclosure remains visible.

- [ ] **Step 7: Implement dashboard full-bleed proof**

Callouts are limited to screenshot-supported values:

```ts
const dashboardCallouts = ['14 contatos no ambiente demo', '6 etapas do fluxo', 'pipeline visível'];
```

Do not call out zero revenue/conversion as performance proof.

- [ ] **Step 8: Replace V2 `ProductShowcase` with V3 proof sequence**

Page order after story: `LeoraFlow → ProductProof → DashboardProof`.

- [ ] **Step 9: Run product tests GREEN**

Run: `npm test -- tests/LeoraFlow.test.tsx tests/ProductProof.test.tsx tests/page.test.tsx`

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add components/v3 app/page.tsx app/globals.css tests/LeoraFlow.test.tsx tests/ProductProof.test.tsx tests/page.test.tsx
git commit -m "feat: art direct Loomie product proof"
```

---

### Task 5: Finish the conversion narrative and V3 analytics

**Files:**
- Create: `components/v3/HowItFits.tsx`
- Create: `components/v3/Responsibility.tsx`
- Create: `components/v3/V3FAQ.tsx`
- Create: `components/v3/FinalConversion.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `lib/analytics.ts`
- Modify: `tests/analytics.test.ts`
- Modify: `tests/page.test.tsx`

**Interfaces:**
- `FinalConversion` wraps/reuses existing `LeadForm` rather than duplicating submission logic.
- Existing analytics `track(name, params?)` remains the single event transport.

- [ ] **Step 1: Write failing page conversion assertions**

Update `tests/page.test.tsx` to require:

```tsx
expect(screen.getByRole('heading', { name: /conectamos sua rotina/i })).toBeInTheDocument();
expect(screen.getByText(/automação para o administrativo/i)).toBeInTheDocument();
expect(screen.getByRole('heading', { name: /quanto da sua semana ainda está preso/i })).toBeInTheDocument();
expect(screen.getByRole('button', { name: /quero ver a loomie na minha rotina/i })).toBeInTheDocument();
```

And continue rejecting:

```tsx
expect(screen.queryByText(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run page tests RED**

Run: `npm test -- tests/page.test.tsx`

Expected: FAIL on missing V3 sections/copy.

- [ ] **Step 3: Implement three-step integration section**

Use exactly:

1. `Conectamos sua rotina`
2. `Configuramos seu fluxo`
3. `A Loomie passa a organizar o operacional`

A decorative SVG/CSS connector animates once; text remains usable without it.

- [ ] **Step 4: Implement responsibility section**

Headline: `Automação para o administrativo. Julgamento profissional continua sendo profissional.` Include three concise points: human control, configurable administrative automation, responsible consultório data handling. No legal badges.

- [ ] **Step 5: Implement four-question FAQ**

Topics: clinical decision boundary; workflow change; automatable administrative tasks; demo/onboarding. Use native `<details>` and existing FAQ analytics pattern.

- [ ] **Step 6: Implement final conversion composition**

Headline: `Quanto da sua semana ainda está preso em WhatsApp, confirmações e follow-ups?` Supporting copy: `Mostramos como a Loomie se encaixaria no seu fluxo atual.` Reuse `<LeadForm />` unchanged for fields/API/UTMs.

- [ ] **Step 7: Add V3 event names without changing transport**

Extend test coverage for:

```ts
['hero_sequence_view', 'story_step_view', 'leora_flow_view', 'product_context_view', 'product_automation_view', 'product_dashboard_view']
```

Use a Set/ref or unobserve-after-fire to prevent repeated intersection firing.

- [ ] **Step 8: Replace legacy V2 bottom sections in `app/page.tsx`**

Final page composition:

`Header → CinematicHero → Manifesto → ScrollStory → LeoraFlow → ProductProof → DashboardProof → HowItFits → Responsibility → V3FAQ → FinalConversion → Footer`.

- [ ] **Step 9: Run unit suite GREEN**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 10: Commit**

```bash
git add components/v3 app/page.tsx app/globals.css lib/analytics.ts tests
git commit -m "feat: complete V3 conversion narrative"
```

---

### Task 6: Responsive, reduced-motion, accessibility and browser QA gate

**Files:**
- Modify: `app/globals.css`
- Modify: `playwright/landing.spec.ts`
- Modify: `.github/workflows/ci.yml` only if the current artifact paths need additional screenshots

**Interfaces:**
- Produces final V3 responsive contract and CI visual artifacts.

- [ ] **Step 1: Expand Playwright RED contract before CSS polishing**

Require desktop:

```ts
await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua clínica continua andando');
await expect(page.getByTestId('hero-crm-image')).toBeVisible();
await expect(page.getByText('WhatsApp organizado.')).toBeVisible();
await expect(page.getByText(/O repetitivo acontece sem disputar sua atenção/i)).toBeVisible();
```

Require mobile 390px:

```ts
const overflow = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: window.innerWidth }));
expect(overflow.width).toBeLessThanOrEqual(overflow.viewport + 1);
await expect(page.getByRole('link', { name: /ver a loomie funcionando/i })).toBeVisible();
```

Require reduced motion:

```ts
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('/');
const hero = page.locator('.v3-hero-sequence');
await expect(hero).toHaveCSS('animation-duration', '0.01ms');
```

Do not assert a specific duration if the element uses no animation; instead assert final state is visible and no continuous transition is required.

- [ ] **Step 2: Run E2E to expose responsive failures**

Run: `npm run build && npm run test:e2e`

Expected: any remaining overflow, visibility or reduced-motion issues fail before the final polish.

- [ ] **Step 3: Implement desktop cinematic layout**

At `min-width: 901px`, hero product stage uses asymmetric composition; scroll story uses sticky product stage; dashboard may bleed wider than text shell while remaining clipped to viewport.

- [ ] **Step 4: Implement dedicated mobile composition**

At `max-width: 900px`: disable desktop sticky story; convert story scenes to sequential blocks; constrain all product media inside `overflow: clip` wrappers; use intentional crops without affecting document width; keep primary CTA full-width/early.

- [ ] **Step 5: Implement reduced-motion override**

Use:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .v3-whatsapp,
  .v3-demo-card,
  .v3-leora-node,
  .v3-callout,
  .v3-step-connector {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

- [ ] **Step 6: Run full verification**

Run:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Expected: all PASS.

- [ ] **Step 7: Inspect generated desktop and mobile screenshots manually**

Check specifically:

- real Kanban pixels visible in hero;
- no alt-text fallback/broken media icon;
- hero composition has product visual dominance;
- sticky story screenshots/crops are legible;
- Leora dark section has a clear human endpoint;
- mobile has no horizontal page scroll;
- CTA/form remain legible and reachable.

If any visual defect is present, add/reproduce it in Playwright where feasible before fixing.

- [ ] **Step 8: Commit**

```bash
git add app/globals.css playwright/landing.spec.ts .github/workflows/ci.yml
git commit -m "test: harden V3 visual QA gate"
```

---

### Task 7: Final review and PR readiness

**Files:**
- Review: all V3 diff versus `main`
- Modify only files required by review findings.

**Interfaces:**
- Produces a green, reviewable V3 branch ready for a PR to `main`.

- [ ] **Step 1: Compare V3 branch against main**

Run/inspect: `git diff main...feat/loomie-psychology-lp-v3` or GitHub compare.

Check for secrets, accidental demo credentials, unsupported claims, dead imports, debug styles/logging and duplicated conversion logic.

- [ ] **Step 2: Verify the release dependency**

Confirm `package.json` and lock resolve Next `16.3.3`, the August 2026 patched Active LTS release.

- [ ] **Step 3: Run fresh CI at the final commit**

Required gates: tests, lint, production build, Playwright 1440/390, reduced motion, lead validation, product asset decode, visual artifact upload.

- [ ] **Step 4: Inspect final CI visual artifact**

Do not infer visual success only from a green Playwright result. Open both desktop and mobile screenshots and verify the product media visibly renders.

- [ ] **Step 5: Open PR only after all gates pass**

PR title:

```text
feat: redesign Loomie psychology landing page V3
```

PR body should summarize product-cinematic redesign, authentic demo media, motion/reduced-motion behavior, preserved lead infrastructure, Next security upgrade, and exact CI verification evidence.
