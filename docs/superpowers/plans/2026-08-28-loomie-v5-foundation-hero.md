# Loomie V5 Foundation + Hero Milestone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the isolated `/v5` route, establish Loomie V5's signature visual language, and ship the first three sections — static hero, causal hero motion, inter-session pressure, and inbound flow — with desktop/mobile visual QA before any remaining V5 sections are implemented.

**Architecture:** V4 remains untouched at `/`. V5 lives in `app/v5` and uses new `components/v5` presentation components plus typed fixtures in `content/v5.ts`. The hero copy remains server-rendered; only the causal visual sequence becomes a small client island. Phase 1 uses existing React/Next.js plus CSS/SVG only — no Motion, GSAP, Rive, 3D, or new animation dependency. The milestone stops at Gate D for explicit visual review before the rest of the landing page is planned.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript 5.9, existing Bricolage Grotesque / Source Sans 3 / IBM Plex Mono fonts, CSS Modules, inline SVG, Vitest + Testing Library, Playwright, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-28-loomie-psychology-lp-v5-design.md`

## Global Constraints

- Branch: `feat/loomie-psychology-lp-v5`; keep V4 at `/` unchanged during this milestone.
- Develop V5 at `/v5`; do not replace `/` without explicit final approval after Gate E.
- First five-second reaction target: “Caramba, finalmente alguém entendeu como é a rotina de um psicólogo.”
- Primary thesis: the psychologist's attention belongs in the session; the administrative routine should keep moving without competing for that attention.
- Marketing visualization explains; product proof validates. Illustrative UI must never pretend to be a real screenshot.
- No full application screenshot inside a browser frame as recurring visual language.
- Signature objects: Signal, Thread, Object, State, Time.
- Keep Loomie blue `#316dbd` and green `#7ed957` as disciplined accents; use warm near-white, graphite, and neutral hairlines as the foundation.
- No arbitrary purple/cyan gradients, colored glow, glassmorphism, generic bento grids, browser chrome, stock therapist photography, decorative AI imagery, fake metrics, or unsupported clinical/product claims.
- Baseline accessibility target: WCAG 2.2 AA; support visible focus and `prefers-reduced-motion`.
- Performance gates: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75 where measurable; hero copy must render without waiting for animation JavaScript.
- No new animation dependency in this milestone. CSS transitions, transforms, SVG, and minimal React state only.
- Target visual QA viewports: 390×844, 768×1024, 1440×1000, and 1728×1100.
- Gate A: static hero must look professionally art-directed before causal motion is added.
- Gate C: mobile hero is approved independently.
- Gate D: hero + inter-session pressure + inbound flow must establish a coherent Loomie visual language before any later V5 section is implemented.

---

## File map

**New production files**
- `app/v5/page.tsx` — isolated V5 route composition.
- `app/v5/v5.module.css` — all V5 milestone tokens, layout, responsive art direction, and motion states.
- `content/v5.ts` — typed synthetic fixtures and approved milestone copy.
- `components/v5/V5Header.tsx` — quiet V5-only header; does not reuse V4 presentation classes.
- `components/v5/V5Hero.tsx` — SSR hero copy and composition wrapper.
- `components/v5/HeroSequence.tsx` — small client island controlling the causal 6–8 second visual sequence.
- `components/v5/InterSessionPressure.tsx` — editorial recognition section.
- `components/v5/InboundFlow.tsx` — Signal/Thread/Object/State/Time storytelling section.
- `components/v5/visual/Signal.tsx` — activity marker.
- `components/v5/visual/Thread.tsx` — semantic visual connector rendered as SVG.
- `components/v5/visual/AdminMessage.tsx` — synthetic incoming-message object.
- `components/v5/visual/ContactObject.tsx` — synthetic structured-contact object.
- `components/v5/visual/AppointmentSlot.tsx` — synthetic time/state object.
- `components/v5/visual/StatusLabel.tsx` — compact state label.

**New tests**
- `tests/v5-page.test.tsx` — route semantics and unsupported-claim guard.
- `tests/v5-visual-primitives.test.tsx` — primitive contracts.
- `tests/v5-hero.test.tsx` — hero copy, causal states, illustrative labeling.
- `tests/v5-story.test.tsx` — sections 02/03 and signature-language contract.
- `playwright/v5.spec.ts` — desktop/mobile/reduced-motion/overflow/focus and milestone screenshots.

**Existing files to modify**
- `.github/workflows/ci.yml` — run CI on the V5 branch and upload `test-results/v5-*.png`.

**Existing files deliberately not modified in this milestone**
- `app/page.tsx`
- `components/v4/**`
- `app/v4*.css`
- `components/LeadForm.tsx`
- `app/api/lead/route.ts`

---

### Task 1: Isolated V5 route, typed content, and visual foundation

**Files:**
- Create: `content/v5.ts`
- Create: `app/v5/page.tsx`
- Create: `app/v5/v5.module.css`
- Create: `components/v5/V5Header.tsx`
- Create: `components/v5/V5Hero.tsx`
- Create: `tests/v5-page.test.tsx`

**Interfaces:**
- Produces `V5_HERO`, `V5_PRESSURE_ITEMS`, and `V5_INBOUND` from `content/v5.ts`.
- `V5Hero` renders the only `h1` on `/v5` and links to the existing real lead path at `/#demo` during the prototype milestone.
- Later tasks may enrich the hero visual but may not change the core headline without a design-review decision.

- [ ] **Step 1: Write the failing route test**

Create `tests/v5-page.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import V5Page from '@/app/v5/page';

describe('Loomie V5 milestone route', () => {
  it('opens with the psychologist-routine thesis and keeps claims bounded', () => {
    render(<V5Page />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua atenção está na sessão\. a rotina continua acontecendo\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /ver a loomie na minha rotina/i })).toHaveAttribute('href', '/#demo');
    expect(screen.queryByText(/pix|recibo|100% lgpd|certificad[oa] pelo cfp|diagnóstico automático|20 horas economizadas/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npm test -- tests/v5-page.test.tsx
```

Expected: FAIL because `@/app/v5/page` does not exist.

- [ ] **Step 3: Add typed V5 content**

Create `content/v5.ts` with only synthetic non-sensitive data and copy already approved by the spec:

```ts
export type V5State = 'novo' | 'proximo-passo' | 'aguardando' | 'confirmado';

export const V5_HERO = {
  eyebrow: 'Loomie para psicólogos',
  title: 'Sua atenção está na sessão. A rotina continua acontecendo.',
  body: 'Novos contatos, horários, confirmações e próximos passos não precisam disputar sua atenção enquanto você atende.',
  cta: 'Ver a Loomie na minha rotina',
  session: 'Sessão · 14:00–14:50',
  messageTime: '14:17',
  message: 'Oi, queria saber se tem horário esta semana.',
  contactName: 'Marina',
  slot: 'Qua · 16:30',
} as const;

export const V5_PRESSURE_ITEMS = [
  'confirmar amanhã',
  'responder novo contato',
  'reagendamento',
  'retornar mensagem',
  'ver próximo horário',
] as const;

export const V5_INBOUND = {
  title: 'Uma coisa chega. Ela sabe para onde ir.',
  steps: ['mensagem', 'contato', 'próximo passo', 'agenda'] as const,
} as const;
```

- [ ] **Step 4: Implement the static route shell and quiet header**

`app/v5/page.tsx` must contain only V5 presentation components and no V4 imports:

```tsx
import styles from './v5.module.css';
import { V5Header } from '@/components/v5/V5Header';
import { V5Hero } from '@/components/v5/V5Hero';

export default function V5Page() {
  return (
    <div className={styles.page}>
      <V5Header />
      <main>
        <V5Hero />
      </main>
    </div>
  );
}
```

`components/v5/V5Header.tsx` uses the existing brand mark vocabulary but new scoped classes. It contains the Loomie wordmark, `para psicólogos`, a quiet `Entrar no CRM` link to `https://crm.loomiecrm.com/`, and a prototype CTA to `/#demo`. Do not render a five-item navigation menu in this milestone.

- [ ] **Step 5: Implement the first static hero composition**

`V5Hero.tsx` is server-rendered and contains the copy plus a static final-state visual placeholder built from plain DOM — no image and no animation:

```tsx
import { TrackedLink } from '@/components/TrackedLink';
import { V5_HERO } from '@/content/v5';
import styles from '@/app/v5/v5.module.css';

export function V5Hero() {
  return (
    <section className={styles.hero} id="v5-top" aria-labelledby="v5-hero-title">
      <div className={styles.shell}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{V5_HERO.eyebrow}</p>
            <h1 id="v5-hero-title">{V5_HERO.title}</h1>
            <p className={styles.heroBody}>{V5_HERO.body}</p>
            <TrackedLink className={styles.primaryAction} href="/#demo" eventName="v5_hero_cta_click">
              {V5_HERO.cta}<span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>
          <div className={styles.heroStage} data-testid="v5-hero-stage" aria-label="Exemplo ilustrativo de uma rotina administrativa organizada">
            <div className={styles.sessionRail}>{V5_HERO.session}</div>
            <div className={styles.staticStory}>mensagem → novo contato → próximo passo → {V5_HERO.slot} · confirmado</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Establish V5 CSS tokens and static art direction**

Start `app/v5/v5.module.css` with scoped tokens so V4 global colors cannot dictate V5:

```css
.page {
  --v5-canvas: #f7f6f2;
  --v5-surface: #fbfaf7;
  --v5-ink: #17191c;
  --v5-muted: #656a70;
  --v5-line: rgba(23, 25, 28, 0.11);
  --v5-line-strong: rgba(23, 25, 28, 0.2);
  --v5-blue: #316dbd;
  --v5-blue-deep: #214f88;
  --v5-green: #7ed957;
  min-height: 100vh;
  overflow: clip;
  background: var(--v5-canvas);
  color: var(--v5-ink);
}

.shell {
  width: min(calc(100% - 64px), 1280px);
  margin-inline: auto;
}

.hero {
  min-height: 820px;
  display: grid;
  align-items: center;
  border-bottom: 1px solid var(--v5-line);
}

.heroGrid {
  display: grid;
  grid-template-columns: minmax(0, .86fr) minmax(520px, 1.14fr);
  gap: clamp(56px, 6vw, 104px);
  align-items: center;
}

.heroCopy h1 {
  max-width: 720px;
  margin: 0;
  font-family: var(--font-display), sans-serif;
  font-size: clamp(54px, 5.3vw, 82px);
  line-height: .98;
  letter-spacing: -.052em;
  font-weight: 610;
}

.heroBody {
  max-width: 590px;
  margin: 28px 0 0;
  color: var(--v5-muted);
  font-size: 19px;
  line-height: 1.55;
}

.heroStage {
  position: relative;
  min-height: 560px;
  border-left: 1px solid var(--v5-line);
  border-right: 1px solid var(--v5-line);
  background-image: linear-gradient(var(--v5-line) 1px, transparent 1px);
  background-size: 100% 88px;
}
```

Add a mobile breakpoint at `max-width: 760px` that changes `.shell` to `calc(100% - 36px)`, makes `.hero` natural-height with at least `96px` top/bottom padding, switches `.heroGrid` to one column, and keeps the visual stage below the copy. Do not use sticky positioning.

- [ ] **Step 7: Re-run focused test and full unit suite**

Run:

```bash
npm test -- tests/v5-page.test.tsx
npm test
```

Expected: PASS.

- [ ] **Step 8: Commit the independent route foundation**

```bash
git add app/v5 components/v5/V5Header.tsx components/v5/V5Hero.tsx content/v5.ts tests/v5-page.test.tsx
git commit -m "feat: establish isolated V5 visual foundation"
```

---

### Task 2: Build the reusable Signal / Thread / Object / State / Time language

**Files:**
- Create: `components/v5/visual/Signal.tsx`
- Create: `components/v5/visual/Thread.tsx`
- Create: `components/v5/visual/AdminMessage.tsx`
- Create: `components/v5/visual/ContactObject.tsx`
- Create: `components/v5/visual/AppointmentSlot.tsx`
- Create: `components/v5/visual/StatusLabel.tsx`
- Modify: `app/v5/v5.module.css`
- Create: `tests/v5-visual-primitives.test.tsx`

**Interfaces:**
- `Signal({ active?: boolean })` is decorative and `aria-hidden`.
- `Thread({ direction?: 'vertical' | 'horizontal', active?: boolean })` renders a decorative SVG path.
- `AdminMessage({ time, children })` is an illustrative message fragment, not a WhatsApp-logo clone.
- `ContactObject({ name, state })` displays `NOVO CONTATO` plus a synthetic name.
- `AppointmentSlot({ time, state })` displays an appointment time and status.
- `StatusLabel({ state })` maps internal state to Portuguese display copy.

- [ ] **Step 1: Write failing primitive tests**

Create `tests/v5-visual-primitives.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { AdminMessage } from '@/components/v5/visual/AdminMessage';
import { ContactObject } from '@/components/v5/visual/ContactObject';
import { AppointmentSlot } from '@/components/v5/visual/AppointmentSlot';

it('keeps illustrative administrative objects legible as native text', () => {
  render(
    <>
      <AdminMessage time="14:17">Oi, queria saber se tem horário esta semana.</AdminMessage>
      <ContactObject name="Marina" state="novo" />
      <AppointmentSlot time="Qua · 16:30" state="confirmado" />
    </>,
  );

  expect(screen.getByText('14:17')).toBeVisible();
  expect(screen.getByText(/queria saber se tem horário/i)).toBeVisible();
  expect(screen.getByText('Marina')).toBeVisible();
  expect(screen.getByText('NOVO CONTATO')).toBeVisible();
  expect(screen.getByText('Qua · 16:30')).toBeVisible();
  expect(screen.getByText('confirmado')).toBeVisible();
});
```

- [ ] **Step 2: Verify RED**

```bash
npm test -- tests/v5-visual-primitives.test.tsx
```

Expected: FAIL because the primitive modules do not exist.

- [ ] **Step 3: Implement the primitives with semantic text**

Each object is a small component importing the shared CSS module. `StatusLabel` must implement this exact mapping:

```ts
const labels = {
  novo: 'novo',
  'proximo-passo': 'próximo passo',
  aguardando: 'aguardando',
  confirmado: 'confirmado',
} as const;
```

`AdminMessage` includes the visible text `EXEMPLO ILUSTRATIVO` only through an accessible `<span>` class designed as a quiet micro-label. It must not render the WhatsApp logo or pretend to be a screenshot.

- [ ] **Step 4: Add visual-object CSS**

Use `4px`–`8px` radii, one-pixel neutral borders, no colored shadow, mono typography only for labels/time, and `min-width: 0` so objects remain readable on mobile. The signal active state may use Loomie green; primary path/state focus may use Loomie blue.

- [ ] **Step 5: Verify tests and commit**

```bash
npm test -- tests/v5-visual-primitives.test.tsx
npm run lint
git add components/v5/visual app/v5/v5.module.css tests/v5-visual-primitives.test.tsx
git commit -m "feat: define V5 administrative visual language"
```

---

### Task 3: Replace the placeholder with a professionally art-directed static hero and pass Gate A/C

**Files:**
- Modify: `components/v5/V5Hero.tsx`
- Modify: `app/v5/v5.module.css`
- Create: `tests/v5-hero.test.tsx`
- Create: `playwright/v5.spec.ts`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Hero contains data test IDs: `v5-hero`, `v5-session`, `v5-message`, `v5-contact`, `v5-next-step`, `v5-slot`.
- At this task all objects render in a stable final composition; no client-side animation exists yet.
- Playwright emits `test-results/v5-hero-static-desktop.png`, `v5-hero-static-wide.png`, `v5-hero-static-tablet.png`, and `v5-hero-static-mobile.png`.

- [ ] **Step 1: Write the failing static-hero contract**

`tests/v5-hero.test.tsx` must verify all five signature concepts are represented as text/structure and that no raster product screenshot/browser chrome is present:

```tsx
import { render, screen } from '@testing-library/react';
import { V5Hero } from '@/components/v5/V5Hero';

it('explains the session-to-confirmation flow without a dashboard screenshot', () => {
  const { container } = render(<V5Hero />);
  expect(screen.getByTestId('v5-session')).toHaveTextContent('Sessão · 14:00–14:50');
  expect(screen.getByTestId('v5-message')).toHaveTextContent('14:17');
  expect(screen.getByTestId('v5-contact')).toHaveTextContent('Marina');
  expect(screen.getByTestId('v5-next-step')).toHaveTextContent(/próximo passo/i);
  expect(screen.getByTestId('v5-slot')).toHaveTextContent(/Qua · 16:30/i);
  expect(screen.getByTestId('v5-slot')).toHaveTextContent(/confirmado/i);
  expect(container.querySelector('img')).toBeNull();
  expect(container.textContent).not.toMatch(/ambiente demo|browser|dashboard/i);
});
```

- [ ] **Step 2: Verify RED**

Run the focused test. Expected: FAIL because the placeholder does not expose the object contract.

- [ ] **Step 3: Compose the static hero from the new primitives**

Replace `.staticStory` with an art-directed layout: session rail as the quiet anchor; incoming message sits offset from the main vertical thread; contact object occupies the central focus; a compact `PRÓXIMO PASSO` state bridges to the appointment slot; the confirmed state is the visual resting point. Desktop may use asymmetry, but all objects must be readable at normal browser zoom.

The hero stage must not be one rounded card. Use the page grid itself, hairlines, and negative space as the container. Objects should feel placed on an instrument panel rather than inside a dashboard frame.

- [ ] **Step 4: Implement independent mobile art direction**

At 390px the hero visual order must be exactly:

```text
Sessão · 14:00–14:50
        ↓
14:17 · mensagem
        ↓
NOVO CONTATO · Marina
        ↓
próximo passo
        ↓
Qua · 16:30 · confirmado
```

The mobile version uses a single vertical thread. Desktop can use a bent SVG path. No object may be scaled below 14px body text / 11px mono micro-label.

- [ ] **Step 5: Add static visual Playwright tests**

Create `playwright/v5.spec.ts` with a helper that checks document width and captures the four viewports. Core assertions:

```ts
test('V5 static hero is legible on desktop and mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/v5');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sua atenção está na sessão');
  await expect(page.getByTestId('v5-message')).toBeVisible();
  await expect(page.getByTestId('v5-slot')).toContainText('confirmado');
  await page.getByTestId('v5-hero').screenshot({ path: 'test-results/v5-hero-static-desktop.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/v5');
  const overflow = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  expect(overflow.document).toBeLessThanOrEqual(overflow.viewport + 1);
  await page.getByTestId('v5-hero').screenshot({ path: 'test-results/v5-hero-static-mobile.png' });
});
```

Add 768×1024 and 1728×1100 screenshot cases in the same file.

- [ ] **Step 6: Enable CI and visual artifacts for V5**

In `.github/workflows/ci.yml`, add `feat/loomie-psychology-lp-v5` to push branches and `test-results/v5-*.png` to the visual-qa artifact paths. Do not remove V4 coverage.

- [ ] **Step 7: Run full verification**

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Expected: all existing V4 tests remain green and V5 static screenshots are produced.

- [ ] **Step 8: Human visual Gate A/C**

Inspect all four hero screenshots at 100% scale. Reject the hero if any of these are true: it resembles a generic SaaS card composition; the visual could belong to an unrelated CRM; the headline dominates so much that objects become tiny; mobile looks like desktop merely stacked; the signature thread appears decorative rather than causal.

No motion task begins until Gate A and Gate C are explicitly accepted or the static hero is iterated until they pass.

- [ ] **Step 9: Commit after the static gate passes**

```bash
git add components/v5/V5Hero.tsx app/v5/v5.module.css tests/v5-hero.test.tsx playwright/v5.spec.ts .github/workflows/ci.yml
git commit -m "feat: art direct the static V5 hero"
```

---

### Task 4: Add the causal 6–8 second hero sequence and reduced-motion equivalent

**Files:**
- Create: `components/v5/HeroSequence.tsx`
- Modify: `components/v5/V5Hero.tsx`
- Modify: `app/v5/v5.module.css`
- Modify: `tests/v5-hero.test.tsx`
- Modify: `playwright/v5.spec.ts`

**Interfaces:**
- `HeroSequence` exposes `data-phase="session|message|contact|next-step|slot|confirmed"` on its root.
- Sequence timing: initial session 700ms; message at 1200ms; contact at 2600ms; next-step at 3900ms; slot at 5200ms; confirmed at 6500ms.
- The final `confirmed` state remains stable; sequence does not loop.
- Reduced-motion starts and stays at `confirmed` while all semantic objects remain visible.

- [ ] **Step 1: Extend hero test to require a stable final-state API**

Test that `HeroSequence` renders all content immediately in the DOM even before visual activation. The animation may change classes/opacity but must never remove essential text from accessibility semantics.

- [ ] **Step 2: Verify RED**

Expected: FAIL because `HeroSequence` does not exist.

- [ ] **Step 3: Implement the client island with one state machine**

Use one `phaseIndex` and one timeout chain, not multiple independent animation timers:

```tsx
'use client';

import { useEffect, useState } from 'react';

const phases = ['session', 'message', 'contact', 'next-step', 'slot', 'confirmed'] as const;
const delays = [700, 500, 1400, 1300, 1300, 1300] as const;

export function HeroSequence() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhaseIndex(phases.length - 1);
      return;
    }
    if (phaseIndex >= phases.length - 1) return;
    const timer = window.setTimeout(() => setPhaseIndex((value) => value + 1), delays[phaseIndex]);
    return () => window.clearTimeout(timer);
  }, [phaseIndex, reduced]);

  return <div data-testid="v5-hero-sequence" data-phase={phases[phaseIndex]}>{/* the same semantic objects from Task 3 */}</div>;
}
```

Keep the server-rendered headline/body/CTA outside this client island.

- [ ] **Step 4: Implement phase-based causal CSS**

Only animate `opacity` and `transform`; SVG thread strokes may animate with `stroke-dashoffset`. Do not use blur as a reveal. Max translation distance is 24px on desktop and 14px on mobile. No spring overshoot. The confirmed state may use the green Signal but no pulse loop.

- [ ] **Step 5: Add E2E final-state and reduced-motion contracts**

Playwright must wait until `data-phase="confirmed"` with a timeout of 8500ms, then capture `v5-hero-motion-desktop.png`. In a separate test, call `page.emulateMedia({ reducedMotion: 'reduce' })`, load `/v5`, assert `data-phase="confirmed"` within 500ms and capture `v5-hero-reduced-motion.png`.

- [ ] **Step 6: Run verification and visually compare static vs motion**

The animated version passes Gate B only if the causal relationship is easier to understand than the static composition. If it is merely more impressive, remove or simplify motion.

- [ ] **Step 7: Commit**

```bash
git add components/v5/HeroSequence.tsx components/v5/V5Hero.tsx app/v5/v5.module.css tests/v5-hero.test.tsx playwright/v5.spec.ts
git commit -m "feat: add causal V5 hero sequence"
```

---

### Task 5: Build the inter-session pressure section and inbound-flow storytelling

**Files:**
- Create: `components/v5/InterSessionPressure.tsx`
- Create: `components/v5/InboundFlow.tsx`
- Modify: `app/v5/page.tsx`
- Modify: `app/v5/v5.module.css`
- Create: `tests/v5-story.test.tsx`
- Modify: `playwright/v5.spec.ts`

**Interfaces:**
- Section 02 id: `entre-sessoes`; heading: `Entre uma sessão e outra, dez minutos viram vinte pequenas decisões.`
- Section 03 id: `fluxo`; heading: `Uma coisa chega. Ela sabe para onde ir.`
- `InboundFlow` reuses the same primitive components from Task 2; it does not duplicate their markup.

- [ ] **Step 1: Write failing story tests**

```tsx
import { render, screen } from '@testing-library/react';
import V5Page from '@/app/v5/page';

it('changes rhythm between recognition and system explanation', () => {
  render(<V5Page />);
  expect(screen.getByRole('heading', { name: /dez minutos viram vinte pequenas decisões/i })).toBeVisible();
  expect(screen.getByText('confirmar amanhã')).toBeVisible();
  expect(screen.getByText('responder novo contato')).toBeVisible();
  expect(screen.getByRole('heading', { name: /uma coisa chega\. ela sabe para onde ir\./i })).toBeVisible();
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/mensagem/i);
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/contato/i);
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/próximo passo/i);
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/agenda/i);
});
```

- [ ] **Step 2: Verify RED**

Run the focused story test. Expected: missing sections.

- [ ] **Step 3: Implement `InterSessionPressure` as an editorial interruption, not cards**

Use one strong headline, one short paragraph, and the five pressure fragments placed on a loose typographic field divided by hairlines. Fragments use plain text with small timestamps or index marks; no icon circles and no equal-sized card grid. Desktop can use asymmetric positions; mobile becomes a vertical list with separators.

- [ ] **Step 4: Implement `InboundFlow` as the first true scroll-story section**

Build one wide composition in which message, contact, next step, and appointment objects live on a shared thread. On desktop, use `position: sticky` only for the visual column if testing proves it improves comprehension; the text column must remain in normal flow. For the first implementation, prefer no sticky behavior and use viewport-entry CSS classes only after the static composition is proven.

The section includes one concise explanatory sentence: `O que chega deixa de depender de uma conversa solta e passa a ter contexto, estado e próximo passo.`

- [ ] **Step 5: Wire both sections below the hero**

`app/v5/page.tsx` order becomes `V5Header → V5Hero → InterSessionPressure → InboundFlow`.

- [ ] **Step 6: Add milestone screenshot coverage**

At 1440px capture:

```text
test-results/v5-first-three-desktop.png
test-results/v5-pressure-desktop.png
test-results/v5-inbound-desktop.png
```

At 390px capture:

```text
test-results/v5-first-three-mobile.png
test-results/v5-inbound-mobile.png
```

Also assert no document overflow and that scrolling to `#fluxo` never leaves the V5 header covering the section heading.

- [ ] **Step 7: Run full verification**

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Expected: all V4 and V5 contracts green.

- [ ] **Step 8: Commit**

```bash
git add components/v5/InterSessionPressure.tsx components/v5/InboundFlow.tsx app/v5/page.tsx app/v5/v5.module.css tests/v5-story.test.tsx playwright/v5.spec.ts
git commit -m "feat: establish V5 first-scroll narrative"
```

---

### Task 6: Gate D verification package and stop point

**Files:**
- Modify only if necessary after QA: `app/v5/v5.module.css`, `components/v5/**`, `playwright/v5.spec.ts`
- No remaining-page components are created in this task.

**Interfaces:**
- Produces a reviewed milestone, not the full V5 page.
- The next implementation plan may begin only after Gate D visual approval.

- [ ] **Step 1: Run the complete verification suite from a clean branch head**

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Record exact test counts and Playwright counts from the run; do not infer them from a previous commit.

- [ ] **Step 2: Inspect CI artifacts at 100% scale**

Review static hero desktop/wide/tablet/mobile, motion hero, reduced-motion hero, first-three desktop/mobile, pressure desktop, inbound desktop/mobile. Check: object legibility; negative-space balance; brand recognition without logo; causal meaning; mobile intentionality; no generic SaaS browser/card composition.

- [ ] **Step 3: Run the anti-pattern audit**

Reject the milestone if any of the following appears: giant screenshot, browser/laptop frame, floating explanatory bubble, generic bento, pastel icon circle, oversized pill system, colored glow, random gradient, glassmorphism, stock therapist image, decorative AI image, unsupported claim, fake metric, repeated `headline + paragraph + card` composition, squeezed desktop layout, or motion without a one-sentence functional purpose.

- [ ] **Step 4: Produce Gate D decision**

Gate D is PASS only if hero + inter-session pressure + inbound flow feel like one authored Loomie system and the first screen is specific to a psychologist's routine. If FAIL, iterate only these components; do not start WeekFlow, RealProductProof, LeoraBoundaryV5, EndOfDay, V5Conversion, or V5Footer.

- [ ] **Step 5: Commit only the final reviewed milestone state**

```bash
git add app/v5 components/v5 content/v5.ts tests/v5-*.test.tsx playwright/v5.spec.ts .github/workflows/ci.yml
git commit -m "chore: finalize V5 foundation visual gate"
```

After Gate D passes, write a second implementation plan for Sections 04–08, full product proof, Leora boundary, conversion, accessibility/performance audit, and final Gate E. Do not move `/v5` to `/` as part of this plan.

---

## Plan self-review

**Spec coverage for this milestone:** isolated `/v5` route, Calm Precision visual foundation, Signal/Thread/Object/State/Time language, static hero Gate A, independent mobile Gate C, causal hero Gate B, sections 02/03, reduced motion, overflow/focus checks, CI screenshots, and Gate D stop point are covered.

**Intentionally deferred by design gate:** WeekFlow, real product proof, Leora boundary, end-of-day section, conversion/LeadForm styling, full-page performance audit, full-page accessibility audit, and root-route cutover. These are not omissions; they are forbidden to begin until Gate D passes.

**Dependency check:** no new runtime package is required. Existing `TrackedLink`, analytics, fonts, tests, and `/api/lead` remain intact. V4 stays unchanged.

**Placeholder scan:** no `TBD`, `TODO`, unspecified feature, or invented product capability is part of the plan.
