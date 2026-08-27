# Loomie para Psicólogos V4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Loomie psychology landing page around sharp, high-resolution real product proof, tighter commercial pacing, and three deliberate motion moments, while preserving the safe product positioning and existing conversion flow.

**Architecture:** V4 keeps the Next.js App Router foundation and the proven lead API, but replaces the V3 visual presentation layer with focused V4 components and CSS. Real demo screenshots become the primary visual system; motion is implemented with CSS plus IntersectionObserver, with reduced-motion fallbacks. QA treats visual sharpness, rendered scale, dead space, and section-level composition as release gates in addition to automated tests.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript, Tailwind 4 foundation, component-scoped CSS files, `next/image` with static public assets, Vitest + Testing Library, Playwright, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-27-loomie-psychology-lp-v4-design.md`

## Global Constraints

- Branch: `feat/loomie-psychology-lp-v4`; do not merge to `main` without explicit user approval after visual QA.
- Keep Next.js and `eslint-config-next` at `16.3.3` or later only if separately justified and tested.
- No animation dependency unless CSS + IntersectionObserver proves inadequate.
- Leora remains administrative/operational; clinical evaluation, decision, and conduct remain human.
- Do not add unsupported claims such as `100% LGPD`, `criptografia ponta-a-ponta`, CFP certification, guaranteed ROI, or fabricated time savings.
- Preserve the existing lead API and the warning not to submit clinical patient information.
- High-resolution source captures available for V4 are 2048 px wide: `loomie_01_kanban_left.jpg` (2048×1407), `loomie_02_kanban_right.jpg` (2048×1407), `loomie_04_historico_contato.jpg` (2048×1407), `loomie_05_dashboard.jpg` (2048×1422), `loomie_07_automacoes_inativas.jpg` (2048×1407), and `loomie_08_tarefas.jpg` (2048×1407).
- A key raster must never be rendered wider than its intrinsic pixel width. Target source width is at least 1.3× the maximum CSS width of the important rendered scene whenever layout permits.
- Do not create detail crops by enlarging an already-small exported raster. Crop from the 2048 px source asset itself.
- Visual QA is a hard release gate: inspect hero, main Kanban, story, Leora, history, automations/tasks, dashboard, and final conversion at 100% browser zoom on desktop and mobile.

---

## File map

**New V4 production files**
- `components/v4/V4Hero.tsx` — pain-first hero and one-time illustrative product sequence.
- `components/v4/PainThesis.tsx` — compact editorial pain recognition bridge.
- `components/v4/KanbanShowcase.tsx` — large real Kanban proof and focus states.
- `components/v4/CompactStory.tsx` — compact 14:32/14:35/14:40 product-led story.
- `components/v4/LeoraBoundary.tsx` — dark operational flow ending in human decision.
- `components/v4/HistoryProof.tsx` — high-resolution context/history proof.
- `components/v4/AutomationProof.tsx` — causal QUANDO → ENTÃO composition.
- `components/v4/DashboardProof.tsx` — near-full-width operational dashboard proof.
- `components/v4/ClinicFit.tsx` — three-step onboarding/fit section.
- `components/v4/Responsibility.tsx` — sober automation/human responsibility boundary.
- `components/v4/V4FAQ.tsx` — four concise objections.
- `components/v4/V4Conversion.tsx` — final commercial section using the existing lead form.
- `components/v4/useOnceVisible.ts` — tiny reusable IntersectionObserver helper for reveal/analytics behavior.
- `app/v4.css` — V4 global visual system, hero, bridge, shared product surfaces.
- `app/v4-product.css` — Kanban/story/history/automation/dashboard composition and motion.
- `app/v4-conversion.css` — clinic fit, responsibility, FAQ, final conversion and mobile rules.

**Existing files to modify**
- `app/page.tsx` — compose only V4 sections plus existing Header/Footer.
- `app/layout.tsx` — import V4 styles; stop importing V3 style files once V4 is live.
- `.github/workflows/ci.yml` — trigger V4 branch and archive section-level QA screenshots.
- `playwright/landing.spec.ts` — V4 contracts, asset sharpness/render ratio checks, section screenshots.
- `tests/page.test.tsx` — V4 content/section integration contract.
- Existing lead form tests stay intact except CTA copy selectors if needed.

**Assets to replace/add**
- `public/product-v4/kanban-left.webp`
- `public/product-v4/kanban-right.webp`
- `public/product-v4/contact-history.webp`
- `public/product-v4/dashboard.webp`
- `public/product-v4/automations.webp`
- `public/product-v4/tasks.webp`

Generate each from the 2048 px original capture. Keep the longest useful dimension at the source resolution unless a deliberate crop is used. Do not reuse the V3 6–10 KB exports as V4 primary assets.

---

### Task 1: High-resolution asset pipeline and regression contract

**Files:**
- Create/replace: `public/product-v4/*.webp`
- Create: `tests/v4-assets.test.ts`
- Modify: `playwright/landing.spec.ts`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Produces asset URLs `/product-v4/kanban-left.webp`, `/product-v4/kanban-right.webp`, `/product-v4/contact-history.webp`, `/product-v4/dashboard.webp`, `/product-v4/automations.webp`, `/product-v4/tasks.webp`.
- Later V4 components must reference only these URLs for primary product proof.

- [ ] **Step 1: Write a failing asset-contract test**

Create `tests/v4-assets.test.ts` that reads the six files from `public/product-v4` and checks that each exists and exceeds a conservative byte floor appropriate for a readable full CRM capture. The test should also inspect WebP dimensions with a small test helper or assert dimensions through metadata generated during the asset step. Minimum contract: each primary asset width must be at least 1800 px; no primary full-screen asset may be under 40 KB.

- [ ] **Step 2: Run the focused test and verify RED**

Run `npm test -- tests/v4-assets.test.ts`.
Expected: FAIL because `public/product-v4` assets do not exist yet.

- [ ] **Step 3: Generate V4 WebPs from the 2048 px originals**

Use Pillow/cwebp-quality-equivalent settings locally from the original conversation-mounted JPEGs. Preserve 2048 px width for the six main assets and choose quality high enough that small CRM text edges remain visibly crisp at 100% browser zoom. Do not target a tiny byte budget; quality wins.

- [ ] **Step 4: Commit binary assets through GitHub blobs**

Create blobs with base64 encoding, build a tree based on the current V4 branch tree, create one commit, and fast-forward `feat/loomie-psychology-lp-v4` to that commit. Verify the committed file metadata through GitHub contents.

- [ ] **Step 5: Add browser-level visual-usage checks**

Extend Playwright with a helper that, for key product images, reads `naturalWidth` and `getBoundingClientRect().width` and asserts `naturalWidth >= renderedWidth`. For hero/main dashboard scenes, target `naturalWidth / renderedWidth >= 1.25` at the desktop QA viewport when the layout permits.

- [ ] **Step 6: Update CI artifact collection**

Add the V4 branch to the CI push trigger and archive `test-results/v4-*.png` section screenshots in the visual QA artifact.

- [ ] **Step 7: Run test/lint/build/E2E and commit**

Run `npm test`, `npm run lint`, `npm run build`, `npm run test:e2e`.
Expected: all current behavior stays green and the new asset contract passes.
Commit: `feat: add high resolution V4 product assets`.

---

### Task 2: Pain-first hero and compact problem thesis

**Files:**
- Create: `components/v4/V4Hero.tsx`
- Create: `components/v4/PainThesis.tsx`
- Create: `components/v4/useOnceVisible.ts`
- Create/modify: `app/v4.css`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Create: `tests/V4Hero.test.tsx`
- Modify: `tests/page.test.tsx`

**Interfaces:**
- `V4Hero` exposes `data-testid="v4-hero-product"` on the primary Kanban image for browser QA.
- `PainThesis` renders the thesis `O problema não é falta de organização. É que sua atenção já tem dono.`

- [ ] **Step 1: Write failing hero tests**

Assert the H1 is `Você entra em sessão. O WhatsApp não para.`, primary CTA is `Ver como funciona na minha clínica`, the product image uses `/product-v4/kanban-left.webp`, and the illustrative motion disclosure is present.

- [ ] **Step 2: Run focused tests and verify RED**

Run `npm test -- tests/V4Hero.test.tsx tests/page.test.tsx`.
Expected: FAIL because V4 components are not wired.

- [ ] **Step 3: Implement V4Hero**

Build a two-stage hero: concise copy first, product immediately dominant below/right. Use the real high-resolution Kanban as the base. Overlay only a small fictional administrative WhatsApp message, a product-aligned highlight, and a restrained Leora cue. The sequence runs once for roughly 5–6 seconds and settles. For reduced motion, render the final stable state with no animation.

- [ ] **Step 4: Implement PainThesis**

Render four short pain statements followed by the thesis. Keep the entire section compact enough to fit in roughly one viewport on desktop and substantially less than the V3 manifesto height.

- [ ] **Step 5: Add V4 visual system CSS**

Use white/ice base, deep Loomie navy for strong contrast, Bricolage display typography already configured, and restrained blue/green/purple accents. No giant empty browser frame around the hero product.

- [ ] **Step 6: Wire V4Hero and PainThesis into `app/page.tsx`**

Temporarily place them ahead of the existing V3 remainder so this task can be validated independently.

- [ ] **Step 7: Add Playwright hero screenshot and ratio checks**

Capture `test-results/v4-hero-desktop.png` and `test-results/v4-hero-mobile.png` after ensuring the image has decoded and meets the rendered/intrinsic size contract.

- [ ] **Step 8: Run focused and full verification, then commit**

Run unit tests, lint, build, and E2E.
Commit: `feat: rebuild V4 pain first hero`.

---

### Task 3: Large Kanban showcase and compact scroll story

**Files:**
- Create: `components/v4/KanbanShowcase.tsx`
- Create: `components/v4/CompactStory.tsx`
- Create/modify: `app/v4-product.css`
- Create: `tests/KanbanShowcase.test.tsx`
- Create: `tests/CompactStory.test.tsx`
- Modify: `app/page.tsx`
- Modify: `playwright/landing.spec.ts`

**Interfaces:**
- `KanbanShowcase` uses `/product-v4/kanban-left.webp` and `/product-v4/kanban-right.webp` and exposes `data-testid="v4-kanban-main"`.
- `CompactStory` renders exactly three time beats: 14:32, 14:35, 14:40.

- [ ] **Step 1: Write failing Kanban and story tests**

Require headline `Tudo que chega encontra um lugar.`, real Kanban asset usage, and exactly three chronological story beats.

- [ ] **Step 2: Run focused tests and verify RED**

Expected: modules/headlines absent.

- [ ] **Step 3: Implement the large Kanban showcase**

Use a near-full-width product surface with no fake whitespace. Highlight real existing columns/stages through CSS focus rings/overlays. Keep multiple columns and contacts visible so the interface reads as a mature product.

- [ ] **Step 4: Implement compact desktop storytelling**

Use a sticky two-column composition constrained to approximately 2–2.5 viewport heights total. The product should occupy about two-thirds of the scene. Shift crop/focus between high-resolution real assets rather than shrinking content into a giant frame.

- [ ] **Step 5: Implement dedicated mobile story**

At mobile breakpoints, remove sticky behavior and render three sequential product scenes with deliberate horizontal crops and no document overflow.

- [ ] **Step 6: Add QA screenshots**

Capture `v4-kanban-desktop.png`, `v4-story-desktop.png`, and `v4-story-mobile.png` at the relevant section scroll positions.

- [ ] **Step 7: Run full verification and commit**

Commit: `feat: add V4 product showcase story`.

---

### Task 4: Leora contrast section with explicit human boundary

**Files:**
- Create: `components/v4/LeoraBoundary.tsx`
- Modify: `app/v4-product.css`
- Create: `tests/LeoraBoundaryV4.test.tsx`
- Modify: `app/page.tsx`
- Modify: `playwright/landing.spec.ts`

**Interfaces:**
- Flow labels: `Contato`, `Organizar`, `Confirmar`, `Lembrar`, `Sinalizar`, `VOCÊ DECIDE`.
- Boundary text: `Avaliação, decisão e conduta clínica continuam com você.`

- [ ] **Step 1: Write failing Leora boundary test**

Require all six nodes in order, the boundary copy, and no autonomous clinical wording.

- [ ] **Step 2: Verify RED**

- [ ] **Step 3: Implement the dark contrast section**

Use deep navy, a single progressive path animation, and visually differentiate the final human node from operational nodes. The animation settles and does not loop indefinitely.

- [ ] **Step 4: Add reduced-motion final state**

In reduced motion, all nodes are visible immediately, connectors are static, and the final human node remains visually distinct.

- [ ] **Step 5: Capture section QA screenshot and verify**

Capture `v4-leora-desktop.png` and mobile equivalent.

- [ ] **Step 6: Run tests/lint/build/E2E and commit**

Commit: `feat: sharpen V4 Leora human boundary`.

---

### Task 5: High-resolution history, automation/task causality, and dashboard proof

**Files:**
- Create: `components/v4/HistoryProof.tsx`
- Create: `components/v4/AutomationProof.tsx`
- Create: `components/v4/DashboardProof.tsx`
- Modify: `app/v4-product.css`
- Create: `tests/V4ProductProof.test.tsx`
- Modify: `app/page.tsx`
- Modify: `playwright/landing.spec.ts`

**Interfaces:**
- History uses `/product-v4/contact-history.webp` as the full-resolution primary source.
- Automation uses `/product-v4/automations.webp`; task uses `/product-v4/tasks.webp`.
- Dashboard uses `/product-v4/dashboard.webp`.

- [ ] **Step 1: Write failing proof tests**

Require the three approved headlines and verify primary image URLs use `product-v4`, not the tiny V3 `product` assets.

- [ ] **Step 2: Verify RED**

- [ ] **Step 3: Implement HistoryProof**

Large real history UI, with one detail crop created by CSS object positioning over the same 2048 px asset only when the crop remains within intrinsic-resolution limits. No 220% enlargement of a 650 px raster.

- [ ] **Step 4: Implement AutomationProof**

Create a causal composition labeled `QUANDO` → automation UI → restrained connector → `ENTÃO` → task UI. Keep demo/configurable disclosure.

- [ ] **Step 5: Implement DashboardProof**

Render dashboard near full width with small factual demo callouts only: 14 demo contacts, visible pipeline, organized next steps. Avoid tiny text overlays and invented metrics.

- [ ] **Step 6: Add sharpness/browser checks for all three sections**

Playwright must ensure each primary product image decodes, its request succeeds, and its intrinsic width is not lower than its rendered width.

- [ ] **Step 7: Capture section QA screenshots**

Create `v4-history-desktop.png`, `v4-automation-desktop.png`, `v4-dashboard-desktop.png`, plus mobile proof screenshots where crops differ materially.

- [ ] **Step 8: Run verification and commit**

Commit: `feat: replace V4 proof with sharp real CRM surfaces`.

---

### Task 6: Lower funnel, mobile composition, and final page cutover

**Files:**
- Create: `components/v4/ClinicFit.tsx`
- Create: `components/v4/Responsibility.tsx`
- Create: `components/v4/V4FAQ.tsx`
- Create: `components/v4/V4Conversion.tsx`
- Create/modify: `app/v4-conversion.css`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `tests/page.test.tsx`
- Modify: `playwright/landing.spec.ts`

**Interfaces:**
- ClinicFit has exactly three steps from the spec.
- V4FAQ has four concise questions.
- V4Conversion reuses `LeadForm` and CTA `Quero ver a Loomie na minha rotina`.

- [ ] **Step 1: Convert `tests/page.test.tsx` into the final V4 integration contract**

Assert all final V4 headlines in page order, the form button, human-boundary copy, and absence of unsupported claims.

- [ ] **Step 2: Run integration test and verify RED**

- [ ] **Step 3: Implement ClinicFit, Responsibility, V4FAQ, and V4Conversion**

Keep these sections commercially dense and visually restrained. Reuse the existing lead form behavior exactly.

- [ ] **Step 4: Cut `app/page.tsx` fully to V4**

Remove V3 production sections from the rendered page. Keep Header and Footer.

- [ ] **Step 5: Stop importing V3 CSS from `app/layout.tsx`**

Import only global/mobile legacy CSS still required plus the three V4 CSS files. Do not delete V3 files in this task unless they are truly unused and cleanup is clearly safe; preserving them for PR history is acceptable.

- [ ] **Step 6: Tune mobile at 390, 430, and 768 px**

Verify no horizontal overflow. Ensure screenshots use deliberate readable crops rather than off-screen translation tricks.

- [ ] **Step 7: Capture final conversion and mobile full-page QA**

Create `v4-conversion-desktop.png`, `v4-conversion-mobile.png`, `v4-full-desktop.png`, `v4-full-mobile.png`.

- [ ] **Step 8: Run full verification and commit**

Commit: `feat: complete Loomie psychology V4 landing page`.

---

### Task 7: Final visual QA gate, HML-readiness, and PR

**Files:**
- Modify only if QA exposes a concrete defect: relevant V4 component/CSS/test files.
- Update: PR body / QA notes through GitHub.

**Interfaces:**
- Final head must have a green branch CI and a green PR-triggered CI.
- V4 PR must target `main`; do not merge without user approval.

- [ ] **Step 1: Run fresh final verification on the exact head commit**

Required CI steps: install, unit tests, lint, production build, Playwright Chromium install, E2E, visual artifact upload, verification gate.

- [ ] **Step 2: Download visual QA artifact**

Inspect each section screenshot at 100% scale, not only the full-page thumbnail.

- [ ] **Step 3: Apply the visual rejection checklist**

Reject and fix any section with blur/pixelation, giant dead space, unreadably small product UI, accidental-looking crop, mobile squeeze, decorative motion competing with product, or a composition that looks broken when animation is paused.

- [ ] **Step 4: Re-run the full CI after every visual fix**

Do not rely on a previous green run after modifying CSS/assets/components.

- [ ] **Step 5: Compare V4 branch against current `main`**

Identify any new main commits and confirm mergeability. Incorporate only if necessary; never silently overwrite deploy/runtime changes.

- [ ] **Step 6: Open the V4 PR**

Title: `feat: redesign Loomie para Psicólogos V4`
Body must summarize high-resolution product proof, tighter commercial pacing, three motion moments, safety boundaries, test coverage, and visual QA artifacts.

- [ ] **Step 7: Verify PR-triggered CI**

Wait for the PR workflow to complete and confirm every gate is green.

- [ ] **Step 8: Deliver for user review, without merging**

Provide PR link plus desktop/mobile and section-level QA artifacts. Ask for explicit merge approval.
