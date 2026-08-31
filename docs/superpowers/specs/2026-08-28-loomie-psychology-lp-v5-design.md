# Loomie Psychology Landing Page V5 — Design Specification

Date: 2026-08-28
Branch: `feat/loomie-psychology-lp-v5`
Status: Design specification awaiting human review

## 1. Goal

Rebuild the Loomie landing page for psychologists as a new visual and narrative system rather than an incremental polish of V4.

The first five seconds must produce this reaction:

> “Caramba, finalmente alguém entendeu como é a rotina de um psicólogo.”

Technology, AI, and product sophistication are secondary impressions. The primary impression is recognition of the psychologist's real administrative routine.

## 2. Strategic thesis

The V5 thesis is:

> The psychologist's attention belongs in the session. The administrative routine should keep moving without competing for that attention.

The page must show Loomie as the system that brings continuity to what happens outside the session: incoming contacts, scheduling, confirmations, follow-ups, and next steps.

The product should feel calm, precise, mature, and human without becoming a generic healthtech, a luxury-clinic aesthetic, or a clone of developer SaaS brands.

Working direction name: **Calm Precision — A rotina, finalmente compreendida.**

## 3. Non-goals

V5 is not:

- a screenshot gallery;
- a sequence of browser mockups;
- a generic SaaS bento grid;
- a healthtech page dominated by hospital blue;
- a “wow effects” demo;
- a Linear, Vercel, Stripe, or Clay clone;
- a landing page that invents product features or clinical claims;
- a visual redesign of the actual Loomie application.

We will not introduce unverified capabilities such as Pix settlement, receipts, financial reconciliation, clinical metrics, automated clinical reasoning, or claims about regulatory compliance unless they are explicitly validated against the real product and approved source material.

## 4. Product-proof rule

Marketing visualization and product proof have different jobs.

**Marketing visualization explains. Product proof validates.**

The page may use native HTML/CSS/SVG fragments to represent Loomie's administrative concepts, but those representations must never pretend to be screenshots of the product.

Full application screenshots inside browser frames are prohibited as a recurring visual language.

At least one dedicated mid-page section must show real product proof in a legible, carefully cropped form so that the marketing experience does not drift away from the actual product.

## 5. Signature visual language

V5 will build a recognizable system around five recurring objects:

### Signal
A small point or marker means something just happened: a message arrived, a state changed, a confirmation was recorded.

### Thread
A fine line connects cause and consequence. Threads should establish continuity rather than decorate empty space.

### Object
An object is one administrative item: message, contact, appointment, confirmation, next step.

### State
Objects transition through explicit states such as `novo`, `aguardando`, `confirmado`, or `próximo passo`.

### Time
Time is a structural device, not decoration. Timestamps, appointment slots, and day labels use compact tabular typography.

These five objects must recur across hero, storytelling, product visualization, and mobile so that the Loomie page remains recognizable even without the logo.

## 6. Visual direction

### Tone

- calm;
- precise;
- editorial;
- contemporary;
- human without being sentimental;
- technically confident without feeling developer-oriented.

### Color

Do not discard Loomie's existing brand equity. Keep Loomie blue and green, but use them with much more discipline.

- background: warm near-white, not pure white;
- primary text: deep graphite, not absolute black;
- Loomie blue: intentional brand/action accent, not full-section paint;
- Loomie green: signal/state color for activity and successful transitions;
- neutral hairlines: low-contrast structural grid and separators.

No arbitrary purple/cyan gradients, colored glow, or large pastel slabs.

### Typography

Typography is a primary visual material.

Start with a highly legible contemporary sans system. A display serif may be tested later, but it is not a requirement and must not be introduced merely to make the page look “premium.”

A mono face is reserved for timestamps, statuses, compact system labels, and tabular data.

The page should avoid the V4 pattern of oversized headline type paired with tiny illegible product detail.

### Surfaces

- few large cards;
- small radii;
- hairline borders;
- very shallow neutral elevation only where necessary;
- no soft colored shadows;
- no glassmorphism;
- no decorative browser chrome.

## 7. Page architecture

V5 is developed at `/v5` while V4 remains at `/`. The root route is replaced only after explicit final approval.

### Section 01 — Hero: Em sessão

Primary recognition moment.

Working headline:

> Sua atenção está na sessão. A rotina continua acontecendo.

Working support copy:

> Novos contatos, horários, confirmações e próximos passos não precisam disputar sua atenção enquanto você atende.

Visual sequence:

1. `Sessão · 14:00–14:50`
2. a WhatsApp-like administrative message arrives at `14:17`;
3. the message becomes a structured `novo contato` object;
4. a thread connects it to a `próximo passo`;
5. a time slot appears;
6. the state changes to `confirmado`.

The sequence should take roughly 6–8 seconds, remain comprehensible when frozen, and avoid fake browser windows.

Primary CTA uses the real existing conversion destination or lead path. No CTA copy is finalized until the current lead flow is verified.

### Section 02 — O intervalo de dez minutos

Recognition before solution.

Working thesis:

> Entre uma sessão e outra, dez minutos viram vinte pequenas decisões.

Mostly typographic section with small administrative fragments such as:

- confirmar amanhã;
- responder novo contato;
- reagendamento;
- retornar mensagem;
- ver próximo horário.

These should feel like cognitive interruptions, not feature cards.

### Section 03 — Uma coisa chega. Ela sabe para onde ir.

Establishes the core Loomie language:

`mensagem → contato → estado → agenda`

Uses Signal / Thread / Object / State / Time at full legible scale in native HTML/CSS/SVG.

### Section 04 — Sua semana não deveria morar na sua cabeça

Abstract weekly schedule, not an application screenshot.

Show a small five-day system with a few legible slots. One pending confirmation changes state and the schedule visually settles.

The goal is to communicate continuity and predictability rather than expose every scheduling feature.

### Section 05 — O produto de verdade

A dedicated real-product-proof section.

Rules:

- use real Loomie product capture(s);
- crop to the actual feature being proved;
- keep text readable at normal viewport scale;
- no decorative browser frame;
- no floating explanatory bubbles;
- maximum two product crops in one viewport;
- explain what is real versus illustrative.

### Section 06 — Leora: uma fronteira clara

This section must visually separate administrative assistance from clinical responsibility.

Left / first domain:

**ROTINA ADMINISTRATIVA**

- contatos;
- agenda;
- confirmações;
- próximos passos.

Label: `Leora pode ajudar aqui` only if those capabilities are verified against the actual product.

Second domain:

**ATENDIMENTO CLÍNICO**

- escuta;
- conduta;
- decisão profissional.

Label: `permanece com o psicólogo`.

No robot illustration, AI sparkle, brain icon, or synthetic glow.

Any regulatory wording must be validated separately before publication.

### Section 07 — Quando o dia termina

Return to the emotional/operational problem.

Working headline:

> O último atendimento não deveria marcar o início da sua segunda jornada.

A compact example state may summarize illustrative administrative events completed during the day, but it must never imply measured performance data.

Examples are clearly labeled as illustrative.

### Section 08 — Conversion

Working close:

> Você cuida da sessão. A Loomie ajuda a manter o restante em ordem.

Simple, high-confidence conversion treatment. Avoid a dense pricing-style card wall unless the real commercial flow requires it.

Autonomous psychologist / clinic segmentation may only be included if it maps to a real sales or lead flow.

## 8. Motion system

Motion exists only when it clarifies causality, continuity, or state.

### Allowed

- message becomes contact;
- contact moves into a next step;
- appointment changes from waiting to confirmed;
- line connects two related administrative objects;
- content settles into an organized state;
- restrained reveal while entering viewport;
- subtle sticky storytelling only where the static composition remains understandable.

### Prohibited

- parallax for decoration;
- scroll-jacking;
- perpetual floating;
- random rotations;
- glow pulses unrelated to state;
- large springy overshoot;
- looping motion that competes with reading;
- hiding core information until hover.

### Implementation strategy

Phase 1 uses CSS transitions, transforms, SVG, and minimal React state.

Motion for React may be added only if layout/state transitions demonstrably become clearer or more maintainable with it.

Rive and GSAP are explicitly out of the first prototype. They may be reconsidered later for a specific interaction after visual approval, not because they are fashionable.

All motion must provide a `prefers-reduced-motion` equivalent that preserves meaning without spatial animation.

## 9. Scroll storytelling

The page should have rhythm rather than uniform sections.

Use a mixture of:

- editorial text-only moments;
- short native UI fragments;
- wide schedule composition;
- one real product-proof moment;
- one structured boundary diagram;
- a quiet conversion ending.

Do not repeat `headline + paragraph + big visual card` eight times.

If sticky positioning is used, it must never cover headings or trap the user. Mobile should default to natural document flow unless a sticky treatment is proven to improve comprehension.

## 10. Responsive art direction

Mobile is a separate composition, not a compressed desktop layout.

Hero mobile order:

1. session state;
2. incoming message;
3. new contact;
4. next step;
5. time slot / confirmation.

Rules:

- no horizontal scrolling to understand the story;
- no text below comfortable reading size;
- no desktop two-column diagram simply stacked without reconsidering hierarchy;
- motion duration may be shortened on mobile;
- all content must remain meaningful with motion disabled.

Target QA viewports include at minimum 390px mobile, 768px tablet, 1440px desktop, and a larger desktop width.

## 11. Component architecture

V5 must not reuse V4 presentation components merely for convenience.

Suggested structure:

```text
app/v5/page.tsx
app/v5/v5.module.css
components/v5/
  V5Header.tsx
  V5Hero.tsx
  InterSessionPressure.tsx
  InboundFlow.tsx
  WeekFlow.tsx
  RealProductProof.tsx
  LeoraBoundaryV5.tsx
  EndOfDay.tsx
  V5Conversion.tsx
  V5Footer.tsx
  visual/
    Signal.tsx
    Thread.tsx
    AdminMessage.tsx
    ContactObject.tsx
    AppointmentSlot.tsx
    StatusLabel.tsx
```

Small visual primitives should have one clear job and remain independently testable.

The existing API/lead flow may be reused only after verifying its current contract. V5 presentation must not duplicate business logic unnecessarily.

## 12. Data and content model

The landing is primarily static marketing content.

Illustrative UI data should be declared in local typed fixtures rather than scattered through JSX. This makes wording review and product-truth review easier.

Every illustrative data set must avoid sensitive real-person information and must be clearly synthetic.

Any feature claim must be classified as one of:

- verified real capability;
- illustrative explanation of a verified capability;
- unverified — prohibited from production copy.

## 13. Accessibility

Baseline target: WCAG 2.2 AA.

Requirements:

- semantic heading order;
- keyboard-visible focus;
- sufficient contrast;
- no essential information available only through hover;
- `prefers-reduced-motion` support;
- decorative animation hidden from assistive technology where appropriate;
- live-updating marketing simulations must not spam screen readers;
- synthetic UI fragments should use accessible explanatory text rather than imitating an inaccessible application canvas.

AAA is welcome where practical but is not a blanket project requirement.

## 14. Performance

Use Core Web Vitals as real-world gates rather than arbitrary perfect numbers.

Targets at the 75th percentile where measurable:

- LCP ≤ 2.5 s;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

Internal ambition should be better than these thresholds, but no fake guarantee such as `CLS = 0.000` is required.

Performance rules:

- hero copy renders without waiting for animation JS;
- no heavy 3D runtime;
- no autoplay full-screen marketing video;
- lazy-load non-critical visual code below the fold;
- prefer native text/SVG/DOM over raster artwork when practical;
- avoid adding an animation dependency until the static prototype is approved.

## 15. Testing and QA

### Unit / component

- section copy and semantic structure;
- illustrative-vs-real labels;
- reduced-motion behavior where testable;
- lead-flow contract if reused;
- no unsupported feature copy introduced by fixtures.

### E2E

- V5 route loads without horizontal overflow;
- primary CTA is reachable and works;
- hero visual sequence reaches its intended final state;
- mobile narrative remains legible;
- reduced-motion renders an equivalent static story;
- keyboard focus remains visible;
- no sticky element obscures section headings.

### Visual QA

Automated screenshots at mobile and desktop widths are required for each implementation milestone.

A green test suite is not sufficient approval for visual design.

## 16. Professional-quality gates

### Gate A — Static hero

Before any motion library is added, the hero must look professionally art-directed in a static screenshot.

If the hero still looks like a generic SaaS template, stop and redesign it.

### Gate B — Hero motion

Only after Gate A passes, add the cause/effect sequence.

The motion must make the concept clearer, not merely more impressive.

### Gate C — Mobile hero

Approve mobile independently before building the rest of the page.

### Gate D — First three sections

Hero + inter-session pressure + inbound flow must establish a coherent Loomie visual language before the remaining sections are implemented.

### Gate E — Full page

Only after the visual system survives the full narrative do we replace the root `/` route.

## 17. Anti-pattern checklist

Reject any implementation that introduces:

- giant full-product screenshots;
- browser/laptop mockups;
- unreadable product text;
- floating explanatory bubbles;
- generic bento grids;
- pastel icon circles;
- oversized pill buttons everywhere;
- colored glow;
- random gradients;
- excessive glassmorphism;
- stock photography of smiling therapists;
- decorative AI imagery;
- unverified clinical or product claims;
- fake metrics;
- repeating identical section compositions;
- desktop layouts simply squeezed onto mobile;
- motion whose purpose cannot be explained in one sentence.

## 18. Approval criterion

V5 is ready to replace V4 only when a reviewer can truthfully answer yes to all of the following:

1. Does the first screen feel specific to a psychologist's routine rather than generic SaaS?
2. Does the page remain recognizable without the Loomie logo?
3. Can every illustrated product object be read at normal scale?
4. Are real product proof and illustrative marketing visualization clearly distinguishable?
5. Does each animation explain a real cause/effect relationship?
6. Does mobile feel intentionally composed?
7. Are all product claims verified?
8. Does the page look excellent before motion is enabled?
9. Does the page remain understandable with reduced motion?
10. Would we still choose this direction if no competitor reference were visible beside it?

## 19. Implementation sequence after specification approval

No production implementation begins until this specification is explicitly approved.

After approval:

1. write an implementation plan;
2. create V5 route shell and isolated style foundation;
3. implement the static hero first;
4. produce desktop/mobile visual QA;
5. iterate until Gate A/C pass;
6. add causal hero motion;
7. implement sections 02 and 03;
8. validate Gate D;
9. build the remaining narrative;
10. validate performance, accessibility, E2E, and visual QA;
11. request final approval before moving V5 to `/`.
