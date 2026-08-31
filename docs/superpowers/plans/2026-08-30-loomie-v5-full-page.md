# Loomie Psychology LP V5 — Full Page Completion Plan

**Status:** approved by user for autonomous execution on 2026-08-30.

## Goal

Complete the approved V5 narrative after Gate D, preserving the Calm Precision system, verified product boundaries, responsive behavior, accessibility baseline, lead flow, and a safe cutover from `/v5` to `/` only after Gate E passes.

## Constraints

- Preserve the approved V5 visual system: warm canvas, graphite type, restrained Loomie blue/green, hairlines, objects/states/time.
- No browser-frame gallery, bento SaaS layout, glassmorphism, glow, stock therapy imagery, fake metrics, or unsupported clinical claims.
- Keep illustrative marketing visuals explicitly labeled as illustrative.
- Keep real Loomie product proof explicitly labeled as real/demo data and use existing high-resolution V4 captures without artificial upscale.
- Leora copy must remain inside verified administrative/product-requirement boundaries; clinical assessment, decision and conduct remain human/professional.
- Reuse the existing `LeadForm` contract and `/api/lead`; keep `#demo` working after root cutover.
- Motion must communicate state/causality only, settle, not loop, and provide a reduced-motion equivalent.

## Task 1 — Define the full-page contract (RED)

Create `tests/v5-full-page.test.tsx` and extend `playwright/v5.spec.ts` before production implementation.

The tests must require:
- Section 04 heading: `Sua semana não deveria morar na sua cabeça.`
- A five-day schedule object with a pending confirmation that settles to confirmed.
- Section 05 heading: `O produto de verdade.`
- Exactly two primary real-product figures using `/product-v4/kanban-left.webp` and `/product-v4/contact-history.webp`, labeled `CAPTURA REAL DO PRODUTO` and not presented as clinical records.
- Section 06 heading: `Leora: uma fronteira clara.` and explicit administrative/human boundary language.
- Section 07 heading: `O último atendimento não deveria marcar o início da sua segunda jornada.` with `EXEMPLO ILUSTRATIVO` and no fake performance metrics.
- Section 08 heading: `Você cuida da sessão. A Loomie ajuda a manter o restante em ordem.`
- Existing lead form button and `#demo` target.
- Full-page no-horizontal-overflow checks at 1440, 768 and 390 widths.
- Reduced motion settling immediately for stateful section 04.

Verify the tests fail for missing sections/state before implementation.

## Task 2 — Section 04: WeekFlow

Create:
- `components/v5/WeekFlow.tsx`
- `app/v5/v5-week.module.css`

Implementation:
- Abstract Monday–Friday schedule as an editorial calendar surface, not a dashboard screenshot.
- Show a small number of appointments/admin states rather than a dense calendar UI.
- One state moves from `aguardando` to `confirmado` and then stays settled.
- Use one timer/state machine only; no loops.
- For `prefers-reduced-motion`, derive the settled final state rather than synchronously mutating state in an effect.
- Keep all semantic content mounted.

## Task 3 — Section 05: RealProductProof

Create:
- `components/v5/RealProductProof.tsx`
- `app/v5/v5-proof.module.css`

Implementation:
- Two readable figures maximum in the primary viewport:
  1. `/product-v4/kanban-left.webp` (1800×820)
  2. `/product-v4/contact-history.webp` (1800×820)
- No browser chrome reconstruction and no floating annotation bubbles.
- Simple structural crop/container only.
- Captions must say the interface is real Loomie product/demo data and that data is fictitious.
- Explain administrative context, not clinical records.

## Task 4 — Section 06: LeoraBoundaryV5

Create:
- `components/v5/LeoraBoundaryV5.tsx`
- styles in a dedicated or shared V5 section CSS module.

Verified wording basis:
- Existing approved V4 boundary: Leora helps with configured administrative routines and signals when the next step requires the professional.
- Product requirements are roadmap/requirements, not proof that every automation is already shipped.

Implementation:
- Left/admin domain: organize, confirm, remind, signal — framed as configured administrative routines.
- Boundary line.
- Right/human domain: assessment, decision and clinical conduct remain with the psychologist.
- Do not claim autonomous diagnosis, crisis care, clinical judgment, or legal/compliance certification.

## Task 5 — Section 07: EndOfDay

Create `components/v5/EndOfDay.tsx`.

Implementation:
- Lead with the approved headline.
- Show a quiet end-of-day illustrative ledger using only administrative events such as a new contact organized, a confirmation registered, and a next step visible.
- Explicitly label the ledger `EXEMPLO ILUSTRATIVO`.
- Do not use fabricated savings, percentages, hours saved, response rates, or clinical outcomes.

## Task 6 — Section 08: Conversion + Footer

Create:
- `components/v5/V5Conversion.tsx`
- `components/v5/V5Footer.tsx`
- `app/v5/v5-conversion.module.css`

Implementation:
- Closing headline: `Você cuida da sessão. A Loomie ajuda a manter o restante em ordem.`
- Reuse `LeadForm` inside section `id="demo"` so existing hero/header CTAs resolve correctly after root cutover.
- Explain demonstration as applied to the professional's administrative routine; tell visitors not to submit patient clinical data.
- Footer remains quiet and compact with Loomie identity and CRM login path.
- Add V5-scoped styling for the global `.lead-form` contract without changing submission logic.

## Task 7 — Gate E full-page QA

Run full CI and add/capture:
- 1440× full page screenshot
- 1728× full page screenshot
- 768× full page screenshot
- 390× full page screenshot
- Section-specific proof and conversion screenshots as useful

Verify:
- tests, lint, Next build, Playwright all green
- no horizontal overflow
- heading hierarchy and focus visibility
- readable real-product captures
- illustrative vs real labels are unambiguous
- no fixed/sticky mobile overlay regression
- reduced-motion equivalent
- no unsupported metrics/claims
- CTA reaches `#demo`

Inspect the generated screenshots manually before cutover.

## Task 8 — Root cutover (RED → GREEN)

Update root tests first so they require the V5 hero, V5 final sections, real product proof and existing lead form from `/`.

Then update `app/page.tsx` to render the V5 composition at root while keeping `/v5` available as a preview alias. Prefer extracting a shared `V5Landing` composition component so routes do not duplicate the full tree.

Update `V5Header` brand link/CTAs if necessary so root navigation resolves cleanly.

Re-run full CI and root Playwright screenshots.

## Task 9 — Review, PR, merge, release state

- Run a fresh final verification at the exact feature head.
- Inspect the diff for accidental V4/deploy/infra changes.
- Open a PR to `main` with a concise V5 summary and verification evidence.
- Because the user explicitly authorized completion/approval/merge in this session, squash-merge once the PR is mergeable and the exact head is green.
- Verify the PR is merged and `main` points to the merge commit.
- Inspect repository deployment mechanism. The repo currently exposes `deploy.sh` (`git pull origin main && docker compose up -d --build --force-recreate`) but has only a CI workflow; do not claim production deployment unless an actual deploy mechanism/run is available and verified.
