# Loomie para Psicólogos — Landing Page V4 Design Spec

## Status

Approved visual direction for V4. This spec formalizes the redesign before implementation.

## Objective

Turn the Loomie psychology landing page from a technically correct but visually weak prototype into a premium, product-led conversion page that can sit next to serious SaaS brands without looking cheaper or less finished.

The first five seconds should communicate two things in order:

1. Loomie understands the operational pressure of a psychologist's routine.
2. Loomie is a professional, credible product that can organize that operational work.

The chosen direction is hybrid: commercial storytelling inspired by Atendare, with the visual discipline and product presentation quality associated with Linear/Attio-style SaaS design.

## Core principles

- Product realness over decoration.
- Pain recognition before feature explanation.
- Large, sharp, readable CRM surfaces.
- Less dead space and fewer generic SaaS cards.
- Three deliberate motion moments instead of scattered effects.
- Strong commercial rhythm without fake urgency, fabricated metrics, or unsupported compliance claims.
- Leora is an operational assistant; clinical evaluation, decisions, and conduct remain human.
- Mobile is designed as its own composition, not a compressed desktop layout.

## Quality bar

The page is not accepted only because tests pass. Visual QA is a first-class gate.

A section fails QA if any of the following is true:

- a screenshot looks soft, pixelated, over-compressed, or enlarged beyond a sensible source resolution;
- a product frame contains large areas that look empty, broken, unfinished, or visually accidental;
- the product is too small to read as a credible interface at normal viewing distance;
- a desktop composition is merely squeezed into mobile;
- large vertical gaps create the impression that content did not load;
- motion obscures the product or feels like generic AI/SaaS decoration;
- the full page feels less polished than the benchmark references when viewed at 100% browser zoom.

For every final QA viewport, the page must be reviewed section by section at normal scale, not only as a full-page thumbnail.

## Asset strategy

The current tiny WebP exports are not acceptable as primary V4 proof assets. Existing repository files are roughly 6–10 KB and cannot support large presentation without visible degradation.

V4 will use the original higher-resolution demo CRM captures as source material. New web assets will be generated from those sources with enough intrinsic resolution for Retina/high-DPI presentation.

Rules:

- Do not upscale a low-resolution screenshot to create a detail crop.
- Do not reuse the same small raster and zoom it to 200%+ for a floating detail.
- Important desktop product scenes should have source dimensions comfortably above their maximum rendered CSS size.
- Compression should preserve text edges and interface detail; file size is secondary to credibility.
- Use WebP/AVIF only when the generated result remains visually sharp.
- Keep demo names/data fictitious and clearly label demo-only states where needed.

The product-image gate will validate both browser decoding and practical visual usage. A passing `naturalWidth > 0` is necessary but not sufficient.

## Page architecture

### 1. Header

Keep the compact Loomie navigation pattern. Reduce visual competition with the hero. Primary navigation remains product, how it works, responsibility, FAQ, CRM login, and demonstration CTA.

### 2. Hero — pain first, product immediately after

Headline direction:

> Você entra em sessão. O WhatsApp não para.

Support direction:

> A Loomie organiza novos contatos, confirmações, agenda e follow-ups enquanto você cuida de quem está na sua frente.

Primary CTA:

> Ver como funciona na minha clínica

Secondary action remains CRM access.

The product is the hero visual. A high-resolution real Loomie Kanban occupies most of the visual area and is large enough to communicate product maturity.

A short, one-time demonstration sequence overlays the real product without pretending to be a live screen recording:

1. a fictional administrative WhatsApp message arrives;
2. a matching contact/card is highlighted in the real Kanban;
3. the relevant stage receives focus;
4. a restrained Leora cue signals the next administrative step;
5. the scene settles into a clean static state.

Duration target: roughly 5–6 seconds once, no distracting infinite loop. Reduced-motion users receive the final static state.

The disclosure must make clear that the moving overlay is illustrative while the CRM screenshot is real demo UI.

### 3. Pain recognition section

A compact editorial sequence immediately follows the hero:

- Você está atendendo.
- Alguém está perguntando por horário.
- Outro paciente precisa confirmar.
- Um follow-up ficou para depois.

The section closes with the thesis:

> O problema não é falta de organização. É que sua atenção já tem dono.

This section should feel confident and concise, not like a grid of feature cards.

### 4. Main product showcase — real Kanban

Headline direction:

> Tudo que chega encontra um lugar.

Use the real Kanban at near full width. Multiple columns, contacts, stages, and tags should remain visible enough to read as a real operational system.

Motion should highlight existing parts of the screen rather than float tiny mock elements in empty frames.

Example focus sequence:

- Novo contato
- Aguardando horário
- Agendado

The visual language should be crop, focus, and subtle movement — not fake browser whitespace.

### 5. Compact scroll storytelling

Retain the time-based narrative but compress it to approximately 2–2.5 viewport heights on desktop.

Story beats:

- 14:32 — novo contato
- 14:35 — disponibilidade enviada / próximo passo definido
- 14:40 — tarefa ou follow-up organizado

The product should occupy roughly two-thirds of the scene. As the user scrolls, focus shifts within high-resolution real UI and supporting assets.

No giant mostly empty canvas. Each state must look intentional even if JavaScript or motion is disabled.

On mobile, this becomes a vertical sequence with deliberate crops rather than sticky desktop behavior.

### 6. Leora — primary contrast moment

Use a deep blue full-width section as one of the three signature motion moments.

Headline direction:

> O repetitivo não precisa disputar sua atenção.

Visual flow:

> Contato → Organizar → Confirmar → Lembrar → Sinalizar → VOCÊ DECIDE

The first operational nodes belong to Loomie/Leora. The final human node changes visual treatment clearly and ends the automation path.

Boundary copy:

> Avaliação, decisão e conduta clínica continuam com você.

The animation should progressively reveal the path and settle. Avoid autonomous-clinical framing.

### 7. Context/history proof

Headline direction:

> Você não precisa lembrar onde aquela conversa parou.

Use a high-resolution real contact/history interface. The primary screenshot should be large and sharp.

A detail crop may float over the main surface only if it comes from a source with sufficient intrinsic resolution. No enlarged low-resolution duplicate.

The section should communicate administrative continuity, not clinical recordkeeping unless such functionality is independently verified.

### 8. Automations and tasks as a causal system

Instead of two unrelated screenshots, visually connect a real automation trigger to the resulting administrative task/continuity state.

Structure:

- QUANDO
- real automation UI
- connector / transition
- ENTÃO
- real task or administrative action UI

Example illustrative relationship:

> Entrou em Agendado → lembrete administrativo → follow-up organizado

Any automation shown from the demo remains explicitly configurable/demo material; do not imply currently active clinical automation.

### 9. Dashboard — operational control

Headline direction:

> Você olha uma vez e sabe o que está acontecendo.

Use a high-resolution dashboard at near full width. Small annotations may point to factual demo elements such as:

- 14 contatos no ambiente demo
- pipeline visível
- próximos passos organizados

Do not invent conversion rates, financial outcomes, time savings, or performance claims.

### 10. How it fits the clinic

Only three steps:

1. Entendemos sua rotina
2. Configuramos seu fluxo
3. Loomie começa a organizar o operacional

Use a restrained connecting line or progressive reveal. This section should reduce implementation anxiety, not become another decorative timeline.

### 11. Responsibility and privacy

Keep the sober human-boundary section.

Core statement:

> Automação para o administrativo. Julgamento profissional continua sendo profissional.

Support points may cover human control, configurable workflows, and responsible handling of clinic data without making unsupported legal/security certification claims.

Forbidden claims include, unless separately verified and approved:

- 100% LGPD
- integralmente LGPD
- criptografia ponta-a-ponta
- em conformidade com o CFP as a certification
- inviolável
- guaranteed ROI or hours saved

### 12. FAQ

Keep only the objections that materially affect conversion, ideally four concise questions. Avoid using FAQ as filler to increase page length.

### 13. Final conversion

Strong contrast section.

Headline direction:

> Quanto da sua semana ainda está preso no operacional?

Layout:

- left: concise argument plus three concrete operational benefits;
- right: existing lead form, visually tightened and integrated with the section.

CTA:

> Quero ver a Loomie na minha rotina

Preserve the existing lead API and the warning not to submit clinical patient information in the form.

## Motion system

Only three high-attention moments:

1. Hero: incoming message → product focus.
2. Storytelling: scroll-driven focus changes in real UI.
3. Leora: operational flow ending at human decision.

Everything else is micro-motion only: short fades, 1–2 px button lift, small parallax/focus shifts, simple connector reveals.

Motion requirements:

- prefer CSS and IntersectionObserver when adequate;
- no animation library unless implementation evidence shows it materially simplifies the approved behavior;
- respect `prefers-reduced-motion`;
- final static state must remain clear and attractive;
- no continuous decorative movement competing with copy or CRM UI.

## Visual system

- Loomie blue remains dominant.
- White/ice backgrounds carry most product proof sections.
- Deep navy creates major contrast moments.
- Green is used as a completion/operational state accent.
- Purple is sparse and primarily associated with Leora/system emphasis.
- Typography should remain strong and editorial but with denser product presentation than V3.
- Use shadows and depth to separate product surfaces, not to hide weak imagery.
- Avoid blobs, generic glassmorphism, random bento grids, excessive numbering, and large decorative frames with little content.

## Mobile design

Mobile is a dedicated layout strategy.

- Hero product uses deliberate readable crops.
- No desktop-width screenshot is simply translated hundreds of pixels off-screen as the primary solution.
- Storytelling becomes sequential vertical cards/scenes.
- Leora flow becomes vertical or stepped.
- Product details use high-resolution crops chosen for a 390–430 px viewport.
- Form is full width.
- No horizontal document overflow at 390 px.
- Important UI text/detail must remain visually crisp on high-DPI mobile screenshots.

## Accessibility

- Maintain semantic heading order.
- Decorative animation layers are hidden from assistive technology where appropriate.
- Real product images have meaningful alt text; duplicated decorative crops use empty alt.
- Keyboard focus remains visible.
- Interactive controls meet reasonable touch targets.
- Reduced-motion mode is covered by E2E.

## Analytics

Preserve existing lead/CTA tracking and product-view tracking where useful. V4 may rename/add view events for the new showcase sections, but no analytics work should block visual quality or create new external dependencies.

## Testing and QA acceptance

Implementation is complete only when all of the following are fresh and green on the final head commit:

- unit/component tests;
- lint;
- Next production build;
- Playwright desktop E2E;
- Playwright mobile E2E;
- no mobile horizontal overflow;
- reduced-motion behavior;
- lead form validation;
- product asset requests return successfully;
- key product images decode in browser;
- final desktop and mobile visual QA artifacts are generated.

Visual QA must additionally include section-level inspection at normal scale for hero, main Kanban showcase, scroll story, Leora, history, automations/tasks, dashboard, and final conversion.

A final page screenshot alone is not enough evidence of visual quality.

## Branch and delivery strategy

Implementation branch: `feat/loomie-psychology-lp-v4`, based on the current V3 branch so approved content, lead form, safety boundaries, and engineering work can be reused.

V4 should not be merged to `main` without explicit user approval after final visual QA.

The existing V3 PR remains a historical implementation candidate; V4 supersedes it visually and should become the preferred delivery once approved.

## Out of scope

- ROI calculator without validated data.
- fabricated testimonials or social proof.
- clinical AI decision support.
- clinical-record claims not verified in the product.
- broad CRM feature expansion unrelated to the landing page.
- rebuilding the CRM itself.
