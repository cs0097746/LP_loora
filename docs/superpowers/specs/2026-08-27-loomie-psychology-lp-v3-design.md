# Loomie para Psicólogos — Landing Page V3 Design

**Date:** 2026-08-27  
**Branch:** `feat/loomie-psychology-lp-v3`  
**Status:** Approved visual direction + approved page structure

## 1. Goal

Refactor the current psychology landing page into a premium, product-cinematic experience that feels like a mature SaaS product rather than a generic AI-generated landing page.

The V3 must make the product tangible within seconds, use real Loomie CRM media as the primary proof, create one memorable signature interaction, and preserve the existing conversion, analytics, lead API and UTM foundations.

Primary conversion goal: generate qualified demo leads from psychologists who manage their own WhatsApp-heavy administrative routine.

## 2. Product Positioning

Primary brand: **Loomie para Psicólogos**.

Leora is positioned as an operational assistant inside Loomie, not as a clinical agent.

Core promise:

> **Sua clínica continua andando enquanto você está em sessão.**

Supporting idea:

> A Loomie organiza novos contatos, confirmações, agenda e follow-ups. A Leora cuida do repetitivo e sinaliza o que precisa da sua atenção.

Clinical boundary must remain explicit:

- Leora can organize administrative workflows.
- Leora can trigger configured reminders and follow-ups.
- Leora can surface attention signals.
- Clinical evaluation, judgment, interpretation and conduct remain human.

## 3. Design Principles

### 3.1 Product first

Real CRM surfaces should dominate the page. The product must look like something the visitor can understand, trust and imagine using.

Avoid relying on abstract illustrations, generic feature cards or decorative AI motifs.

### 3.2 One signature interaction

The page gets one primary memorable motion system: the hero CRM/WhatsApp sequence.

Supporting motion throughout the page must be restrained and subordinate to this interaction.

### 3.3 Editorial rhythm

The page should alternate between:

- large product moments;
- high-contrast narrative sections;
- concise editorial statements;
- breathing room.

Do not repeat the same `copy + image card` layout for every section.

### 3.4 Real media, art-directed

CRM screenshots remain authentic, but may be cropped, layered, masked, scaled and annotated for composition.

Do not alter underlying CRM values to fabricate outcomes.

### 3.5 No unsupported proof

Do not add absolute claims such as:

- `100% LGPD`;
- `criptografia ponta-a-ponta` unless technically verified;
- `em conformidade com o CFP` as an absolute badge;
- guaranteed time savings;
- invented conversion, revenue or retention metrics.

## 4. Visual Language

### Palette

- Loomie Blue: `#316DBD`
- Deep Blue: `#102E53`
- White: `#FFFFFF`
- Cloud: approximately `#F6F9FD`
- Ink: approximately `#0C1D34`
- Green: `#7ED957` — reserved for success/completion
- Violet: `#8C52FF` — sparse Leora/accent use only

### Typography

Current display/body pairing may remain if it continues to feel premium:

- Bricolage Grotesque for display
- Source Sans 3 for body
- IBM Plex Mono for micro labels/timestamps

The V3 should reduce oversized headline density compared with V2. Typography should feel editorial and composed, not like a standard startup template.

### Depth

Use:

- wide soft shadows;
- subtle technical grids/lines;
- layered interface crops;
- masked screenshot edges;
- controlled overlap;
- partial off-canvas product surfaces.

Avoid generic glowing blobs, neon gradients and decorative 3D shapes.

## 5. Page Architecture

## 5.1 Header

Sticky but visually quiet.

Keep:

- Loomie brand;
- `Produto` / relevant anchors;
- CRM login;
- primary demo CTA.

On mobile, simplify aggressively.

## 5.2 Hero — product happening, not product presented

### Copy

Headline:

> **Sua clínica continua andando enquanto você está em sessão.**

Supporting copy:

> A Loomie organiza novos contatos, confirmações, agenda e follow-ups. A Leora cuida do repetitivo e sinaliza o que precisa da sua atenção.

Primary CTA:

> **Ver a Loomie funcionando**

Secondary CTA:

> **Acessar o CRM**

### Composition

The CRM occupies approximately 60–70% of the hero visual weight.

The main surface is the real Loomie Kanban, presented as a large layered product composition rather than a screenshot inside a conventional card.

A small simulated WhatsApp conversation overlays the CRM. The conversation is clearly fictitious and administrative.

Example message:

> “Oi, gostaria de saber os horários disponíveis.”

### Signature sequence

On first load:

1. WhatsApp message appears.
2. A discreet state appears: `Leora organizando`.
3. A corresponding contact/card in the Loomie Kanban receives visual emphasis.
4. The card transitions into the appropriate administrative stage.
5. A small completion state may appear using the Loomie green.
6. Animation settles into a static state.

The interaction should run once by default, not loop aggressively.

With `prefers-reduced-motion`, show the final static state immediately.

## 5.3 Editorial manifesto

Replace a conventional badge/trust strip with three large statements:

> **WhatsApp organizado.**

> **Rotina administrativa automatizada.**

> **Decisão clínica sempre humana.**

Each statement has one concise supporting sentence.

Large typography, white background, strong spacing, minimal decoration.

Statements may enter progressively as the user scrolls.

## 5.4 Sticky scroll storytelling — “Enquanto você atende”

This is the secondary signature experience.

Desktop structure:

- left narrative column remains sticky;
- right product stage remains sticky or semi-sticky;
- scrolling changes the active story state.

Story states:

### State 1

`14:32 — chegou um novo contato`

Visual: simulated administrative WhatsApp message + contact cue.

### State 2

`14:33 — o contexto entrou no Loomie`

Visual: Kanban crop, new card highlighted in `Novo contato`.

### State 3

`14:35 — o próximo passo ficou claro`

Visual: transition/highlight toward `Aguardando horário` or `Agendado`.

### State 4

`14:40 — o follow-up já está organizado`

Visual: task/gatilho/history surfaces become active.

Transitions should use controlled fades, crop shifts and small translations instead of hard image swaps.

Mobile should not use a complex desktop sticky interaction. Use a sequential vertical story with one product scene per state and a concise sticky/anchored progress cue only if it remains stable.

## 5.5 Leora high-contrast section

Deep blue background: `#102E53`.

Primary headline:

> **O repetitivo acontece sem disputar sua atenção.**

Supporting copy:

> A Leora executa rotinas administrativas configuradas no Loomie e sinaliza quando algo exige você.

Central visual flow:

`Novo contato → Organizar → Confirmar → Lembrar → Sinalizar → Você decide`

Behavior:

- nodes activate sequentially;
- green indicates administrative completion;
- violet may identify the Leora processing step;
- final `Você decide` node is visually distinct and terminates the automation flow.

Boundary statement:

> **Avaliação, decisão e conduta clínica continuam humanas.**

Do not depict Leora providing therapy, diagnostic guidance, breathing techniques or autonomous crisis intervention.

## 5.6 Product composition — context/history

Headline direction:

> **Você não precisa lembrar onde aquela conversa parou.**

Use the real contact/business history screenshot as the main surface.

Art direction:

- one large authentic screenshot;
- a focused crop/zoom layer highlighting comments, tags or stage;
- thin callout lines;
- little or no generic card chrome.

Explain:

- stage;
- tags;
- responsible person;
- administrative context/history;
- next step.

Explicitly avoid implying this is a clinical record/prontuário.

## 5.7 Product composition — automations and tasks

Use the real Loomie triggers and scheduled-task surfaces.

Compose them as a connected process rather than two standalone screenshots.

Narrative:

- `quando acontece`;
- `o Loomie organiza`;
- `o que precisa de atenção chega até você`.

Demo automations shown should remain inactive or clearly marked as demo when appropriate.

## 5.8 Dashboard full-bleed proof

Headline:

> **Veja a operação inteira sem reconstruir o dia de cabeça.**

The dashboard should occupy a large/full-width visual stage.

Use small callouts anchored to real demo values, such as:

- `14 contatos no ambiente demo`;
- `6 etapas do fluxo`;
- `pendências visíveis` when supported by the screenshot/state.

Do not imply financial performance from zero-value dashboard metrics.

## 5.9 How it fits the routine

Simple three-step section:

1. **Conectamos sua rotina**
2. **Configuramos seu fluxo**
3. **A Loomie passa a organizar o operacional**

Use a restrained connecting-line animation on desktop.

No icon-heavy timeline.

Purpose: reduce implementation complexity objection.

## 5.10 Responsibility and privacy

Institutional, calm section.

Primary line:

> **Automação para o administrativo. Julgamento profissional continua sendo profissional.**

Supporting themes:

- human control;
- administrative organization;
- configurable automations;
- responsible handling of consultório data.

Do not use absolute compliance/security badges without technical evidence.

## 5.11 FAQ

Reduce FAQ to approximately four high-value objections.

Suggested topics:

- Does Loomie replace my clinical decision-making?
- Do I need to change the way I work?
- What can be automated?
- How does the demo/onboarding work?

Keep answers concise.

## 5.12 Final conversion section

Primary question:

> **Quanto da sua semana ainda está preso em WhatsApp, confirmações e follow-ups?**

Supporting copy:

> Mostramos como a Loomie se encaixaria no seu fluxo atual.

Layout:

- concise product/commercial proof on one side;
- existing lead form on the other;
- compact visual treatment;
- clear single primary action.

Primary CTA:

> **Quero ver a Loomie na minha rotina**

Preserve the existing lead form fields, validation, UTM capture and backend submission behavior unless implementation uncovers a verified reason to change them.

## 6. Motion System

Motion is purposeful, not decorative.

### Primary motion

Hero signature sequence.

### Supporting motion

- scroll storytelling state transitions;
- Leora flow activation;
- slight product parallax/translations;
- callout fade/slide;
- simple CTA hover/focus transitions;
- three-step connecting-line reveal.

### Constraints

- no continuously bouncing elements;
- no particle fields;
- no scroll hijacking;
- no excessive blur/glow;
- no animation that blocks reading or CTA use;
- no animation required to understand content.

`prefers-reduced-motion` must disable or simplify every non-essential transition.

## 7. Screenshot / Asset Strategy

Real current sources available from the demo tenant:

- Kanban / journey pipeline;
- contact/business history modal;
- sales dashboard;
- automatic triggers;
- scheduled tasks.

The empty calendar screenshot should not be used.

### Critical asset reliability requirement

The V2 exposed an asset-rendering defect. V3 implementation must not proceed to visual approval based only on DOM presence.

Each critical product image must be verified in a real browser with:

- successful HTTP response;
- decoded image;
- `naturalWidth > 0`;
- visible pixels in the final QA screenshot.

The hero Kanban is a release-blocking asset.

## 8. Responsive Strategy

Mobile is a separate composition, not a scaled desktop layout.

### Mobile priorities

- headline remains readable without oversized wrapping;
- primary CTA visible early;
- product scene uses deliberate horizontal crops rather than causing document overflow;
- sticky storytelling is replaced by stable vertical sequencing;
- screenshot annotations remain legible;
- no horizontal document overflow;
- final form stays easy to complete one-handed.

Test at minimum:

- 390px viewport;
- 1440px desktop viewport.

## 9. Analytics

Preserve current conversion instrumentation and add/adjust V3-specific events where useful.

Potential events:

- `hero_sequence_view`
- `hero_demo_cta_click`
- `story_step_view` with step identifier
- `leora_flow_view`
- `product_context_view`
- `product_automation_view`
- `product_dashboard_view`
- `lead_form_start`
- `lead_form_submit`
- `lead_form_success`

Avoid duplicate firing caused by repeated intersection events.

## 10. Accessibility

Requirements:

- semantic headings;
- keyboard-visible focus;
- functional navigation without motion;
- reduced-motion support;
- meaningful alt text for screenshots;
- decorative layers hidden from assistive technology;
- text contrast meeting normal accessibility expectations;
- product meaning not conveyed by color alone.

## 11. Performance

The product-cinematic direction must not create a heavy landing page.

Requirements:

- optimize screenshots without making UI text illegible;
- avoid loading a large video in the first V3 implementation unless a real, optimized product recording exists;
- use CSS/DOM motion where possible;
- avoid unnecessary animation libraries unless implementation clearly benefits from one;
- prioritize the hero product asset;
- lazy-load lower product media when appropriate.

## 12. Out of Scope for V3

- ROI calculator;
- fabricated time-saved estimates;
- fake customer logos/testimonials;
- clinical crisis-response demo;
- autonomous therapeutic behavior;
- empty calendar as marketing proof;
- generic AI avatar/persona illustration;
- replacing Loomie with Leora as the primary brand;
- public deployment configuration/secrets.

## 13. Acceptance Criteria

The V3 is ready for PR only when:

1. Hero visibly renders the real CRM product and signature sequence.
2. Critical screenshots decode and are visibly present in QA artifacts.
3. Page no longer follows a repeated generic `feature card` visual pattern.
4. Desktop storytelling has a clear progressive product narrative.
5. Mobile has no document-level horizontal overflow.
6. Leora is positioned operationally, with explicit human clinical boundary.
7. No unsupported security, regulatory or ROI claims are present.
8. Existing lead capture, UTM and analytics fundamentals remain functional.
9. Unit/integration tests pass.
10. Lint passes.
11. Production build passes.
12. Playwright desktop/mobile/reduced-motion/form flows pass.
13. Final desktop and mobile screenshots are manually inspected before the PR is called ready.

## 14. Implementation Direction

The implementation should prefer composable, focused sections over one monolithic page component.

Likely new/rewritten units include:

- cinematic hero/product scene;
- simulated administrative WhatsApp overlay;
- manifesto section;
- scroll story controller + scenes;
- Leora flow section;
- art-directed product proof compositions;
- dashboard callout layer;
- simplified how-it-works;
- final conversion section;
- motion/reduced-motion utilities if needed.

The next phase is a detailed implementation plan using TDD and visual QA checkpoints. No production code should be changed until this spec is reviewed and approved.
