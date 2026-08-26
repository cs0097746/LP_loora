# Loomie para Psicólogos — Landing Page V2 Design

## Context

The first landing page established the psychology-specific positioning, conversion funnel, analytics, lead form, SEO, accessibility and a compliance-conscious tone. Its main weakness is visual credibility: the hero and product sections rely on illustrative UI scenes instead of the actual Loomie product, which makes the page feel more like a generated SaaS template than a mature CRM.

The V2 uses real screenshots from a dedicated demo environment populated only with fictional data. The goal is to make the page feel like a product company selling a real operational system, not an AI concept page.

Reference direction: use the commercial logic of mature CRM landing pages such as Atendare — clear promise, large product proof, repeated CTA, concise sections and strong hierarchy — without copying their branding or layout.

## Primary objective

Increase perceived product maturity and conversion intent by replacing conceptual proof with real product proof.

The visitor should understand within the first screen that:

1. Loomie is a real CRM for organizing a psychologist's administrative operation.
2. The product connects the journey from first contact to scheduling, confirmation and follow-up.
3. Automation is subordinate to the psychologist; clinical judgment remains human.
4. The next step is to see the flow applied to the visitor's own practice.

## Positioning

Primary brand: **Loomie para Psicólogos**.

Leora is presented as an operational assistant inside the Loomie experience, not as an autonomous therapist or clinical decision-maker.

Recommended framing:

> Sua clínica continua andando enquanto você está em sessão.

Supporting idea:

> Loomie centraliza novos contatos, agenda, confirmações e follow-ups. A Leora ajuda a organizar as rotinas repetitivas e sinaliza o que precisa da sua atenção.

Avoid claims that imply autonomous clinical care, guaranteed savings, absolute compliance or unverified security properties.

## Chosen design approach

### Product-led editorial landing page

Use real CRM screenshots as the dominant visual language. Sections should feel spacious, deliberate and editorial rather than composed from many small feature cards.

Key characteristics:

- white and very light blue surfaces;
- Loomie blue as the dominant brand color;
- green only for positive/status accents;
- purple used sparingly;
- large product captures with subtle borders and shadows;
- restrained motion;
- fewer decorative chips, grids and abstract backgrounds;
- shorter copy blocks;
- more negative space;
- stronger visual rhythm between copy and product evidence.

The page should look credible even with all motion disabled.

## Screenshot assets

Source screenshots are from the isolated demo tenant and contain fictional data only.

### Priority 1 — Kanban

Files:
- `loomie_01_kanban_left.jpg`
- `loomie_02_kanban_right.jpg`

Use the Kanban as the primary hero/product visual because it communicates workflow immediately. The left capture is the primary hero candidate because it includes the entry stages. The right capture is useful for a secondary crop showing scheduling, confirmation and follow-up.

The implementation should crop unused white browser canvas around the CRM rather than displaying the raw screenshot at full bounds. Do not alter product content or fabricate UI.

### Priority 2 — Deal/contact history

File:
- `loomie_04_historico_contato.jpg`

Use as proof that a single contact keeps structured administrative context, comments, tags and stage information. This is stronger than a generic contacts list and should receive a dedicated section.

### Priority 3 — Dashboard

File:
- `loomie_05_dashboard.jpg`

Use as proof of operational visibility. The demo values must be described as demo records, not business performance claims.

### Supporting proof — automations/tasks

Files:
- `loomie_07_automacoes_inativas.jpg`
- `loomie_08_tarefas.jpg`

Use together in one section or split layout to show how reminders and follow-ups can become configured workflows. The automations are intentionally inactive in the demo and should not be presented as live outbound messaging.

### Lower priority

- `loomie_03_contatos.jpg`: useful only if needed as supporting evidence; visually weaker than the history modal.
- `loomie_06_dashboard_tags.jpg`: optional extension of the dashboard section.
- `loomie_09_calendario_vazio.jpg`: do not use in V2 because an empty calendar weakens perceived product value.

## Page architecture

### 1. Header

Keep the header compact and sticky.

Navigation should point to:
- Produto
- Como funciona
- Responsabilidade
- FAQ

Actions:
- secondary: `Entrar no CRM`
- primary: `Ver uma demonstração`

Do not crowd the header with product categories.

### 2. Hero

The hero becomes product-led rather than timeline-led.

Left:
- small category label: `CRM + automações para psicólogos`
- H1: `Sua clínica continua andando enquanto você está em sessão.`
- supporting copy: Loomie centralizes operational work; Leora assists with repetitive administrative routines.
- primary CTA: `Ver a Loomie na minha rotina`
- secondary CTA: `Acessar o CRM`
- small reassurance line: `Novos contatos · agenda · confirmações · follow-ups`

Right / below on large screens:
- a large cropped real Kanban screenshot inside a restrained product frame;
- one or two annotation callouts maximum, such as `14 contatos organizados no fluxo demo` and `Do primeiro contato ao follow-up`;
- annotations must describe what is visible, not claim outcomes.

On mobile, copy comes first and screenshot remains large enough to be legible horizontally through a controlled crop rather than shrinking the whole UI to unreadable size.

### 3. Trust strip

Immediately below the hero, use a simple horizontal strip instead of legal/security badges.

Recommended statements:
- `Rotinas administrativas centralizadas`
- `Automação configurável`
- `Decisão clínica sempre humana`

No claim of end-to-end encryption, CFP certification or absolute LGPD compliance unless separately verified and documented.

### 4. Operational pain

A short editorial section:

Headline idea:
`Você cuida do paciente. O operacional não pode depender da sua memória.`

Three concise pains only:
- novos contatos espalhados;
- confirmações e reagendamentos entre sessões;
- follow-ups e pendências que dependem de lembrar depois.

Avoid long ledgers and excessive decorative rows.

### 5. Product proof — Kanban journey

Large full-width product screenshot using the Kanban.

Copy should explain the visible stages as an administrative journey:
`Novo contato → Triagem administrativa → Aguardando horário → Agendado → Confirmado → Follow-up`.

The section should explicitly say this is a fictional demo environment so screenshots are not mistaken for client data.

### 6. Product proof — context in one place

Use the history/detail screenshot.

Headline direction:
`Quando você volta para o contato, o contexto ainda está lá.`

Call out:
- stage;
- tags;
- administrative comments;
- contact data;
- next action.

Do not imply clinical record storage unless the actual product feature and legal requirements have been independently verified.

### 7. Leora / operational automation

Use automation and task screenshots as real proof.

Headline direction:
`A Leora cuida do repetitivo. Você continua no controle.`

Explain that Leora can support administrative flows such as confirmation, reminders and follow-up. The demo automations shown are inactive to prevent any outbound action.

Explicit boundary copy:
`A Leora organiza e sinaliza. Avaliação, decisão e conduta clínica são da psicóloga.`

Do not show or describe breathing techniques, crisis counseling or autonomous risk classification.

### 8. Visibility / dashboard

Use the real dashboard screenshot.

Headline direction:
`Veja o que está acontecendo sem reconstruir sua rotina de cabeça.`

Discuss pipeline visibility and stage distribution. Treat visible numbers as demo data only.

### 9. How it works

Reduce the current five-step workflow to three steps:

1. `O contato entra` — a new administrative request enters the system.
2. `Loomie organiza` — data, stage and next action stay visible.
3. `Você assume o que exige você` — the psychologist receives the context and handles human/clinical decisions.

This section should be simple and largely typographic.

### 10. Responsibility and privacy

Keep a calm, mature section emphasizing responsible use.

Safe copy themes:
- technology supports administrative operation;
- sensitive clinical judgment is not delegated;
- do not send unnecessary clinical content through lead capture;
- implementation and data handling should follow the practice's privacy obligations.

Avoid certification-style visual badges unless claims are verified.

### 11. FAQ

Keep the existing accordion pattern, but rewrite questions around buying objections:
- Does Loomie replace my professional judgment?
- Do I need to change my WhatsApp routine?
- Can I start with a small practice?
- What can be automated?
- How does implementation work?
- What happens to the information I enter?

### 12. Closing conversion section

Retain the lead form and API behavior already verified in V1.

Headline direction:
`Veja como esse fluxo ficaria no seu consultório.`

Keep fields minimal:
- name;
- WhatsApp;
- attendance volume;
- optional operational priority.

Preserve the explicit instruction not to submit patient clinical information.

## What is intentionally removed or postponed

### Remove from V1

- animated conceptual timeline as the main hero visual;
- four fabricated HTML/CSS product scenes;
- excessive feature-card composition;
- visual language that resembles generic AI SaaS templates.

### Postpone

#### Hero video

The hero layout must support replacing the static Kanban image with a 10–15 second muted product video later. Do not fabricate a video from screenshots in V2. A real screen recording should be produced separately.

Recommended future video flow:
1. fictional administrative contact request appears;
2. Loomie contact/deal becomes visible;
3. card is organized/moved through the administrative pipeline;
4. next action or reminder becomes visible.

#### ROI calculator

Do not launch a calculator that states `4–5 hours/week` or `20 hours/month` without evidence. A later experiment may calculate a transparent estimate based on user-entered task volume and explicit assumptions.

#### Social proof

Do not fabricate testimonials, customer logos or success metrics. Add these only when real permissions and evidence exist.

## Image processing and performance

- Keep original uploaded screenshots untouched as source material outside the deployed page.
- Create optimized web assets (WebP or AVIF) from selected screenshots.
- Crop only unused canvas/whitespace; do not modify actual CRM UI content.
- Use `next/image` with explicit dimensions and responsive `sizes`.
- Hero image should be prioritized; supporting images should lazy-load.
- Preserve readable text in screenshot crops at desktop and mobile breakpoints.

## Motion

Motion should be restrained and product-oriented:
- subtle fade/translate on section entrance if desired;
- no floating blobs;
- no perpetual card movement;
- no fake cursor animation;
- respect `prefers-reduced-motion`.

The future real product video is the only major motion element planned.

## Analytics

Preserve existing analytics infrastructure and events where relevant.

Retain:
- hero CTA click;
- header CTA/login click;
- lead form start/submit/success;
- FAQ open;
- closing CTA.

Rename or add product-view events to reflect the new real proof sections, for example:
- `product_kanban_view`
- `product_history_view`
- `product_automation_view`
- `product_dashboard_view`

Do not add events that expose form content or sensitive information.

## Accessibility

- All screenshots get descriptive alt text focused on product function, not fictional person names.
- Product annotations must not contain information unavailable to screen readers.
- Maintain keyboard focus visibility and semantic section headings.
- Avoid tiny screenshot labels as the only way to communicate a feature.
- Mobile product images must remain understandable through supporting copy even when UI text is too small to read.

## Testing and verification

V2 must pass the existing CI gate:
- unit/integration tests;
- ESLint;
- Next.js production build;
- Playwright Chromium E2E;
- desktop/mobile visual QA.

Update tests to verify:
- hero contains a real product image rather than the conceptual timeline;
- primary CTAs still point to the lead conversion flow;
- real-product proof sections render;
- no unverified absolute claims such as `100% LGPD`, `criptografia ponta-a-ponta` or `em conformidade com o CFP` are introduced;
- lead form behavior remains unchanged;
- responsive screenshot treatment does not overflow the viewport;
- reduced-motion behavior remains valid.

## Success criteria

The V2 is successful when:

1. The first viewport looks like a mature CRM landing page rather than a generic AI landing page.
2. A visitor can see the actual Loomie product before scrolling deeply.
3. At least three real product surfaces are used as evidence.
4. The page communicates Leora as operational assistance, not clinical replacement.
5. No fabricated testimonial, ROI claim, legal certification or security guarantee appears.
6. The existing conversion, analytics, accessibility and CI functionality remains intact.
7. Desktop and mobile visual QA show deliberate, readable compositions with no large empty screenshot canvas.