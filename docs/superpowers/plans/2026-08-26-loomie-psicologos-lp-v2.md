# Loomie para Psicólogos Landing Page V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar a landing page Loomie para Psicólogos para uma experiência product-led/editorial baseada em screenshots reais do CRM demo, preservando conversão, analytics, acessibilidade e backend de leads da V1.

**Architecture:** Manter Next.js App Router e a infraestrutura de conversão existente, trocando a camada de apresentação por componentes de prova visual real. Screenshots otimizados ficam em `public/product/`; `Hero` e `ProductShowcase` usam `next/image`; conteúdo comercial fica centralizado em `content/landing.ts`; analytics de visualização de produto continuam client-side via `IntersectionObserver` sem capturar conteúdo sensível.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, TypeScript, Tailwind 4/CSS global, `next/image`, Vitest + Testing Library, Playwright Chromium, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-26-loomie-psicologos-lp-v2-design.md`

## Global Constraints

- Use somente screenshots do tenant demo com dados fictícios.
- Não introduzir depoimentos, logos de clientes, ROI, horas economizadas ou métricas de sucesso não comprovadas.
- Não usar claims absolutos como `100% LGPD`, `criptografia ponta-a-ponta`, `em conformidade com o CFP` ou `inviolável`.
- Leora é assistente operacional; avaliação, decisão e conduta clínica permanecem humanas.
- Não descrever aconselhamento de crise, técnica de respiração ou classificação clínica autônoma.
- Preservar `LeadForm`, `/api/lead`, UTM, GA4/Meta opcionais e eventos de conversão já validados.
- Respeitar `prefers-reduced-motion`, teclado e leitura sem depender do texto pequeno dos screenshots.
- O calendário vazio não entra na V2.

---

### Task 1: Contract tests for the V2 narrative

**Files:**
- Modify: `tests/page.test.tsx`
- Modify: `tests/ProductShowcase.test.tsx`
- Modify: `playwright/landing.spec.ts`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: current `HomePage`, `ProductShowcase`, analytics `track()` and lead form.
- Produces: executable contract for V2 copy, real-product media, safe claims and responsive behavior.

- [ ] **Step 1: Update the landing-page test before implementation**

Replace the V1 assertions with a V2 contract equivalent to:

```tsx
render(<HomePage />);
expect(screen.getByRole('heading', {
  level: 1,
  name: /sua clínica continua andando enquanto você está em sessão/i,
})).toBeInTheDocument();
expect(screen.getByRole('img', { name: /kanban do loomie/i })).toBeInTheDocument();
expect(screen.getByRole('heading', { name: /quando você volta para o contato, o contexto ainda está lá/i })).toBeInTheDocument();
expect(screen.getByRole('heading', { name: /a leora cuida do repetitivo/i })).toBeInTheDocument();
expect(screen.getByRole('heading', { name: /veja o que está acontecendo sem reconstruir sua rotina de cabeça/i })).toBeInTheDocument();
expect(screen.queryByText(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas/i)).not.toBeInTheDocument();
expect(screen.getAllByRole('link', { name: /ver (uma )?demonstração|ver a loomie na minha rotina/i }).length).toBeGreaterThanOrEqual(2);
```

- [ ] **Step 2: Update the product-proof tracking test**

Render `ProductShowcase` with a visible `IntersectionObserver` mock and assert that the V2 emits product-proof events without sensitive properties:

```tsx
await waitFor(() => {
  expect(window.dataLayer).toContainEqual({ event: 'product_kanban_view' });
});
```

- [ ] **Step 3: Update Playwright for V2**

Desktop must assert H1, real Kanban image, context section and CTA. Mobile must assert no horizontal document overflow and successful CTA jump:

```ts
expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
```

Reduced-motion test should no longer depend on `.timeline-event`; it should verify the page renders product proof and keyboard focus remains visible.

- [ ] **Step 4: Make CI run on the V2 branch**

Add `feat/loomie-psychology-lp-v2` to the workflow `push.branches` list while preserving pull-request runs.

- [ ] **Step 5: Push the RED commit and verify expected failure**

Expected failures: missing V2 H1, missing real Kanban image/product sections, old Playwright copy selectors.

---

### Task 2: Optimize and add real CRM media

**Files:**
- Create: `public/product/loomie-kanban.webp`
- Create: `public/product/loomie-kanban-followup.webp`
- Create: `public/product/loomie-contact-history.webp`
- Create: `public/product/loomie-dashboard.webp`
- Create: `public/product/loomie-automations.webp`
- Create: `public/product/loomie-tasks.webp`

**Interfaces:**
- Produces static paths consumed by `Hero` and `ProductShowcase`.

- [ ] **Step 1: Crop only unused canvas**

Use the supplied source JPGs. Preserve the CRM pixels/content; remove blank browser canvas on the right/bottom. Keep the product chrome/sidebar where it gives context.

- [ ] **Step 2: Encode WebP assets**

Use quality around 82–86 and keep enough resolution for readable desktop captures. Target roughly 1400–1650px wide for major screenshots.

- [ ] **Step 3: Visually inspect all optimized files**

Confirm no UI is clipped, text remains readable at large desktop widths, and no source screenshot content is fabricated/painted over.

- [ ] **Step 4: Commit media separately**

Commit message: `assets: add real Loomie CRM product proof`.

---

### Task 3: Product-led hero and trust strip

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Header.tsx`
- Create: `components/TrustStrip.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Hero consumes `/product/loomie-kanban.webp`, `siteConfig.crmUrl`, `TrackedLink`.
- TrustStrip has no external state.

- [ ] **Step 1: Replace conceptual timeline hero with real product proof**

Hero copy:

```text
CRM + automações para psicólogos
Sua clínica continua andando enquanto você está em sessão.
A Loomie centraliza novos contatos, agenda, confirmações e follow-ups. A Leora ajuda a organizar as rotinas repetitivas e sinaliza o que precisa da sua atenção.
```

Primary CTA: `Ver a Loomie na minha rotina` → `#demo` with `cta_click_hero`.
Secondary CTA: `Acessar o CRM` → `siteConfig.crmUrl` with `crm_login_click`.

Use `next/image` for the Kanban with alt text `Kanban do Loomie organizando a jornada administrativa de contatos em um consultório demo` and `priority`.

- [ ] **Step 2: Add factual annotations only**

Use at most two callouts: `14 contatos organizados no fluxo demo` and `Do primeiro contato ao follow-up`. Include an adjacent screen-reader sentence explaining these are fictional demo records.

- [ ] **Step 3: Tighten header copy**

Navigation: `Produto`, `Como funciona`, `Responsabilidade`, `FAQ`. Actions: `Entrar no CRM`, `Ver uma demonstração`.

- [ ] **Step 4: Add trust strip below hero**

Three statements only: `Rotinas administrativas centralizadas`, `Automação configurável`, `Decisão clínica sempre humana`.

- [ ] **Step 5: Update metadata proposition**

OpenGraph title should use the V2 proposition; description should remain administrative and avoid absolute claims.

---

### Task 4: Replace generic feature composition with real product proof

**Files:**
- Modify: `components/PainSequence.tsx`
- Modify: `components/ProductShowcase.tsx`
- Modify: `content/landing.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- `ProductShowcase` consumes optimized screenshot paths and `track()`.
- Product sections expose IDs/semantic headings for navigation and Playwright.

- [ ] **Step 1: Reduce pain section to three editorial objections**

Heading: `Você cuida do paciente. O operacional não pode depender da sua memória.`

Use only:
1. novos contatos espalhados;
2. confirmações/reagendamentos entre sessões;
3. follow-ups e pendências que dependem de lembrar depois.

- [ ] **Step 2: Implement Kanban journey proof**

Full-width image + copy showing:
`Novo contato → Triagem administrativa → Aguardando horário → Agendado → Confirmado → Follow-up`.

Include `Ambiente demonstrativo com dados fictícios.`

Track section visibility as `product_kanban_view` once.

- [ ] **Step 3: Implement contact-context proof**

Use `/product/loomie-contact-history.webp` with heading `Quando você volta para o contato, o contexto ainda está lá.` Explain stage, tags, administrative comments, contact data and next action. Do not call this a clinical record.

Track `product_history_view` once.

- [ ] **Step 4: Implement Leora automation proof**

Use automation + tasks screenshots in a paired composition. Heading: `A Leora cuida do repetitivo. Você continua no controle.` Explicit boundary: `A Leora organiza e sinaliza. Avaliação, decisão e conduta clínica são da psicóloga.` State that demo automations are inactive and do not send real messages.

Track `product_automation_view` once.

- [ ] **Step 5: Implement dashboard proof**

Use dashboard screenshot with heading `Veja o que está acontecendo sem reconstruir sua rotina de cabeça.` Treat visible values as demo records only. Track `product_dashboard_view` once.

- [ ] **Step 6: Keep a mid-page conversion CTA**

CTA: `Quero ver esse fluxo no meu consultório` → `#demo`, preserving `cta_click_midpage`.

---

### Task 5: Simplify workflow, responsibility, FAQ and closing conversion

**Files:**
- Modify: `components/HowItWorks.tsx`
- Modify: `components/Security.tsx`
- Modify: `components/FAQ.tsx`
- Modify: `components/ClosingCTA.tsx`
- Modify: `components/Footer.tsx`
- Modify: `content/landing.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Preserve `LeadForm` unchanged.
- Preserve FAQ `faq_open` tracking.

- [ ] **Step 1: Collapse How It Works to three steps**

1. `O contato entra`.
2. `Loomie organiza`.
3. `Você assume o que exige você`.

- [ ] **Step 2: Rewrite responsibility section for buyer confidence**

Use human-control/privacy language. Remove meta-copy like `Sem claims absolutos` from the public product page; that rule belongs in the spec, not as a customer-facing feature.

- [ ] **Step 3: Rewrite FAQ around buying objections**

Keep questions about professional judgment, WhatsApp routine, small practices, automation scope, implementation and information organization. Keep answers administrative and factual.

- [ ] **Step 4: Sharpen closing section**

Heading: `Veja como esse fluxo ficaria no seu consultório.` Keep minimal form and explicit `Não envie informações clínicas de pacientes neste formulário.`

- [ ] **Step 5: Align footer navigation and boundary copy**

Use `Produto`, `Como funciona`, `Responsabilidade`; retain CRM/Instagram access and the administrative-not-clinical boundary.

---

### Task 6: Editorial visual system and responsive screenshot treatment

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Styles every V2 component; no JS behavior required.

- [ ] **Step 1: Rework global rhythm**

Increase usable shell to approximately 1240px, use larger screenshot surfaces, restrained shadows/borders and more white space. Remove hero grid texture and generic AI-style decorative blobs.

- [ ] **Step 2: Build product-frame styles**

Create reusable classes for screenshot frame, image, caption, annotations and paired media. Major image radius should remain restrained (roughly 14–18px), not card-heavy.

- [ ] **Step 3: Make mobile screenshots intentional**

At <= 760px, use an overflow-hidden viewport/crop with a larger intrinsic screenshot rather than shrinking UI text to illegibility. Ensure the document itself never overflows horizontally.

- [ ] **Step 4: Preserve accessible interaction styles**

Keep strong `:focus-visible`. `prefers-reduced-motion` disables transitions/entrance motion and does not hide any content.

- [ ] **Step 5: Remove unused V1 visual styles from active composition**

Timeline/ProductScenes may remain as unused source files temporarily, but no active selector should require their animation for layout or comprehension.

---

### Task 7: Verification, visual QA and PR

**Files:**
- Modify if needed: `playwright/landing.spec.ts`
- Modify if needed: tests touched above
- No production behavior changes unless a verification failure reveals one.

**Interfaces:**
- Uses existing CI artifact names `verification-logs` and `visual-qa`.

- [ ] **Step 1: Run unit/integration suite**

Run: `npm test`
Expected: all tests pass, including V2 content/safe-claim contracts and unchanged lead-route/schema behavior.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: zero lint errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: successful Next.js production build.

- [ ] **Step 4: Run Playwright Chromium**

Run: `npm run test:e2e`
Expected: desktop/mobile CTA flows, no horizontal mobile overflow, keyboard focus and lead validation all pass.

- [ ] **Step 5: Inspect visual artifacts**

Review full-page `landing-desktop.png` and `landing-mobile.png`, plus focused hero/product crops if needed. Reject if screenshots are unreadable, raw blank canvas is visible, or the composition still reads as generic AI SaaS.

- [ ] **Step 6: Confirm forbidden-claim scan**

Search rendered/source copy for: `100% LGPD`, `criptografia ponta-a-ponta`, `em conformidade com o CFP`, `inviolável`, `20 horas`, `4 a 5 horas`, crisis/breathing claims. Expected: no marketing claims matching these patterns.

- [ ] **Step 7: Open PR to `main` only after fresh green CI**

Suggested title: `feat: redesign Loomie psychology landing page with real product proof`.

PR body must note: real demo screenshots contain fictional data; no fabricated social proof/ROI; lead form configuration remains deployment-dependent; CI/test/build/E2E/visual QA results.
