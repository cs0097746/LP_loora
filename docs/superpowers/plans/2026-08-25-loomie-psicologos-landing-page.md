# Loomie para Psicólogos Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir e publicar uma landing page responsiva, acessível e instrumentada para vender a vertical Loomie para Psicólogos, usando fluxos operacionais reais do produto como prova visual.

**Architecture:** Aplicação Next.js App Router com componentes focados por responsabilidade, conteúdo comercial centralizado em dados tipados, UI própria baseada nos tokens Loomie e um único elemento de motion dominante no hero. Tracking, UTM e configuração externa ficam desacoplados da UI para permitir troca de CTA, analytics e campanhas sem reescrever componentes.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, React Testing Library, Playwright, ESLint, Next Metadata API.

**Spec:** `docs/superpowers/specs/2026-08-25-loomie-psicologos-landing-page-design.md`

**Product requirements source:** `docs/product/psychology-automation-requirements.md`

## Global Constraints

- A marca principal da v1 é **Loomie para Psicólogos**.
- Headline principal: **“Enquanto você atende, sua clínica continua funcionando.”**
- Predominância visual: `#316DBD` + branco; `#7ED957` e `#8C52FF` somente como sinais funcionais.
- Não inventar métricas, depoimentos, logos, resultados ou certificações.
- Não afirmar “100% LGPD”, “adequação integral”, “inviolável” ou equivalentes sem evidência jurídica/técnica específica.
- Não apresentar a IA como substituta de psicoterapia, avaliação, diagnóstico, emergência ou julgamento profissional.
- A LP v1 pode demonstrar: triagem administrativa, organização no CRM, fila de espera, checagem de vagas, agendamento/remanejamento, confirmação, follow-up, cobrança e forms personalizados.
- Recursos de acompanhamento emocional, crise e diário devem ser apresentados apenas em linguagem limitada e responsável, ou omitidos da v1.
- Mobile-first, foco visível, navegação por teclado e `prefers-reduced-motion` são requisitos de aceite.
- Nenhuma integração opcional pode quebrar a página quando a variável correspondente não estiver configurada.
- Seguir TDD para todo comportamento novo: teste falhando → implementação mínima → teste passando → refatoração.

---

## File Structure

```text
app/
  layout.tsx                    # metadata global, fontes e shell
  page.tsx                      # composição da landing page
  globals.css                   # tokens, base, motion e utilitários próprios
  robots.ts                     # robots.txt
  sitemap.ts                    # sitemap.xml
  api/
    lead/route.ts               # endpoint interno de captura de lead
components/
  Header.tsx                    # navegação e CTAs do topo
  Hero.tsx                      # tese, CTA e composição principal
  AutomationTimeline.tsx        # sequência “enquanto você está em sessão”
  PainSequence.tsx              # sequência de tarefas administrativas
  Workflow.tsx                  # WhatsApp → triagem → agenda → CRM → follow-up
  ProductShowcase.tsx           # demonstrações de produto baseadas em fluxos reais
  product/
    WhatsAppScene.tsx           # representação fiel do primeiro contato
    PipelineScene.tsx           # representação do kanban operacional
    SchedulingScene.tsx         # representação de agenda/confirmação
    BillingScene.tsx            # representação de cobrança administrativa
  HowItWorks.tsx                # 3 passos de implantação/uso
  Security.tsx                  # claims responsáveis e configuráveis
  LeadForm.tsx                  # captura de lead e estados
  FAQ.tsx                       # accordion acessível
  ClosingCTA.tsx                # fechamento da página
  Footer.tsx                    # links institucionais
content/
  landing.ts                    # copy, FAQs, features e cenas como dados tipados
lib/
  config.ts                     # URLs e integrações externas
  analytics.ts                  # eventos GA4/Meta sem acoplar UI
  utm.ts                        # leitura e persistência de parâmetros
  lead-schema.ts                # schema de validação do formulário
  cn.ts                         # helper mínimo de classes, se necessário
tests/
  setup.ts                      # setup RTL/Vitest
  config.test.ts                # config fallback
  utm.test.ts                   # captura/persistência UTM
  analytics.test.ts             # ausência/presença de IDs e payloads
  lead-schema.test.ts           # validação do formulário
  AutomationTimeline.test.tsx   # conteúdo e reduced motion
  LeadForm.test.tsx             # estados do formulário
  FAQ.test.tsx                  # acessibilidade do accordion
  page.test.tsx                 # conteúdo crítico e CTAs
playwright/
  landing.spec.ts               # smoke, mobile, teclado e formulário
public/
  loomie-mark.svg               # marca vetorial local, se houver asset aprovado
  og-loomie-psicologos.png      # OG final gerada/aprovada durante execução
.env.example                    # variáveis suportadas
package.json
next.config.ts
tailwind.config.ts              # se a versão adotada exigir arquivo explícito
postcss.config.mjs
vitest.config.ts
playwright.config.ts
tsconfig.json
eslint.config.mjs
README.md
```

---

### Task 1: Scaffold do projeto + ambiente de testes

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/setup.ts`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `README.md`

**Interfaces:**
- Produces: comandos `npm run dev`, `npm run build`, `npm run lint`, `npm test`, `npm run test:e2e`.
- Produces: alias `@/*` para imports internos.

- [ ] **Step 1: criar um teste smoke que falha antes do scaffold**

Create `tests/page.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page', () => {
  it('renders the Loomie psychology headline', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /enquanto você atende, sua clínica continua funcionando/i,
      }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: rodar o teste e confirmar RED**

Run:

```bash
npm test -- tests/page.test.tsx
```

Expected: FAIL porque o projeto/configuração/componente ainda não existem.

- [ ] **Step 3: criar package/configuração mínima**

`package.json` deve conter scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Instalar versões compatíveis atuais de:

```text
next react react-dom typescript
@types/node @types/react @types/react-dom
eslint eslint-config-next
vitest jsdom @vitejs/plugin-react
@testing-library/react @testing-library/jest-dom @testing-library/user-event
@playwright/test
postcss tailwindcss @tailwindcss/postcss
```

`app/page.tsx` mínimo:

```tsx
export default function HomePage() {
  return <h1>Enquanto você atende, sua clínica continua funcionando.</h1>;
}
```

- [ ] **Step 4: rodar testes, lint e build**

```bash
npm test -- tests/page.test.tsx
npm run lint
npm run build
```

Expected: PASS / sem erros.

- [ ] **Step 5: commit**

```bash
git add .
git commit -m "chore: scaffold Loomie psychology landing page"
```

---

### Task 2: Configuração externa, tokens visuais e metadata

**Files:**
- Create: `lib/config.ts`
- Create: `tests/config.test.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Modify: `.env.example`

**Interfaces:**
- Produces: `siteConfig` com `crmUrl`, `demoUrl`, `instagramUrl`, `siteUrl`, `gaId`, `metaPixelId`.
- Consumes: variáveis `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMO_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`.

- [ ] **Step 1: escrever teste de fallback de configuração**

`tests/config.test.ts`:

```ts
import { siteConfig } from '@/lib/config';

describe('siteConfig', () => {
  it('keeps the CRM URL stable without env configuration', () => {
    expect(siteConfig.crmUrl).toBe('https://crm.loomiecrm.com/');
  });

  it('uses a safe demo fallback', () => {
    expect(siteConfig.demoUrl).toBeTruthy();
  });
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/config.test.ts
```

Expected: FAIL porque `lib/config.ts` não existe.

- [ ] **Step 3: implementar `siteConfig`**

```ts
export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loomiecrm.com',
  crmUrl: 'https://crm.loomiecrm.com/',
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? '#demo',
  instagramUrl: 'https://www.instagram.com/loomiecrm/',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
} as const;
```

- [ ] **Step 4: definir tokens em `globals.css`**

Implementar CSS variables:

```css
:root {
  --loomie-blue: #316dbd;
  --loomie-cloud: #f7faff;
  --loomie-white: #ffffff;
  --loomie-ink: #0b1b33;
  --loomie-leaf: #7ed957;
  --loomie-violet: #8c52ff;
  --loomie-muted: #5f6f86;
  --loomie-line: #dbe6f4;
}
```

Adicionar base de foco:

```css
:focus-visible {
  outline: 3px solid var(--loomie-violet);
  outline-offset: 3px;
}
```

E reduced motion global:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: configurar fontes e metadata**

Usar `next/font/google` para:

- Bricolage Grotesque;
- Source Sans 3;
- IBM Plex Mono.

Metadata base:

```ts
export const metadata = {
  title: 'Loomie para Psicólogos | CRM + automações para o consultório',
  description:
    'Organize WhatsApp, novos contatos, confirmações, cobranças e follow-ups em um CRM pensado para a rotina de psicólogos.',
};
```

- [ ] **Step 6: implementar robots/sitemap e validar**

Run:

```bash
npm test -- tests/config.test.ts
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: commit**

```bash
git add app lib tests .env.example
git commit -m "feat: add brand tokens configuration and metadata"
```

---

### Task 3: UTM + analytics desacoplados

**Files:**
- Create: `lib/utm.ts`
- Create: `lib/analytics.ts`
- Create: `tests/utm.test.ts`
- Create: `tests/analytics.test.ts`

**Interfaces:**
- Produces: `UTMData`.
- Produces: `readUtm(searchParams)`, `persistUtm(data)`, `readPersistedUtm()`.
- Produces: `track(eventName, properties?)`.

- [ ] **Step 1: escrever testes de UTM**

```ts
import { readUtm } from '@/lib/utm';

describe('readUtm', () => {
  it('extracts supported campaign parameters only', () => {
    const params = new URLSearchParams(
      'utm_source=instagram&utm_medium=paid&utm_campaign=psico&utm_content=hero&x=ignore',
    );

    expect(readUtm(params)).toEqual({
      utm_source: 'instagram',
      utm_medium: 'paid',
      utm_campaign: 'psico',
      utm_content: 'hero',
    });
  });
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/utm.test.ts
```

- [ ] **Step 3: implementar UTM mínimo**

```ts
export type UTMData = Partial<
  Record<
    'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term',
    string
  >
>;

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export function readUtm(params: URLSearchParams): UTMData {
  return Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = params.get(key)?.trim();
      return value ? [[key, value]] : [];
    }),
  );
}
```

Persistência deve usar `sessionStorage` no browser e ser no-op no servidor.

- [ ] **Step 4: escrever teste de analytics no-op**

```ts
import { track } from '@/lib/analytics';

describe('track', () => {
  it('does not throw when analytics providers are absent', () => {
    expect(() => track('cta_click_hero')).not.toThrow();
  });
});
```

- [ ] **Step 5: implementar `track`**

Contrato:

```ts
export type AnalyticsEvent =
  | 'cta_click_header'
  | 'cta_click_hero'
  | 'cta_click_midpage'
  | 'cta_click_closing'
  | 'crm_login_click'
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'lead_form_success'
  | 'faq_open'
  | 'product_showcase_view';

export function track(
  eventName: AnalyticsEvent,
  properties: Record<string, unknown> = {},
): void;
```

Comportamento:

- chamar `window.gtag('event', ...)` somente se existir;
- chamar `window.fbq('trackCustom', ...)` somente se existir;
- nunca lançar erro por provider ausente.

- [ ] **Step 6: rodar testes**

```bash
npm test -- tests/utm.test.ts tests/analytics.test.ts
```

Expected: PASS.

- [ ] **Step 7: commit**

```bash
git add lib tests
git commit -m "feat: add campaign attribution and analytics events"
```

---

### Task 4: Conteúdo tipado + Header + Hero + timeline assinatura

**Files:**
- Create: `content/landing.ts`
- Create: `components/Header.tsx`
- Create: `components/Hero.tsx`
- Create: `components/AutomationTimeline.tsx`
- Create: `tests/AutomationTimeline.test.tsx`
- Modify: `tests/page.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `landingContent.hero`, `landingContent.timeline`, `landingContent.nav`.
- Produces: `<AutomationTimeline items={TimelineItem[]} />`.
- Consumes: `siteConfig`, `track()`.

- [ ] **Step 1: escrever teste da timeline**

```tsx
import { render, screen } from '@testing-library/react';
import { AutomationTimeline } from '@/components/AutomationTimeline';

const items = [
  { time: '14:32', text: 'Novo contato chegou pelo WhatsApp', kind: 'message' as const },
  { time: '14:36', text: 'Consulta confirmada', kind: 'success' as const },
];

describe('AutomationTimeline', () => {
  it('renders operational events with real timestamps', () => {
    render(<AutomationTimeline items={items} />);
    expect(screen.getByText('14:32')).toBeInTheDocument();
    expect(screen.getByText(/novo contato chegou/i)).toBeInTheDocument();
    expect(screen.getByText(/consulta confirmada/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/AutomationTimeline.test.tsx
```

- [ ] **Step 3: criar `landingContent` com copy real**

Estrutura:

```ts
export const landingContent = {
  hero: {
    eyebrow: 'Loomie para Psicólogos',
    title: 'Enquanto você atende, sua clínica continua funcionando.',
    body: 'A Loomie organiza WhatsApp, novos contatos, confirmações, cobranças e follow-ups em um CRM pensado para a rotina de psicólogos.',
    primaryCta: 'Ver a Loomie funcionando',
    secondaryCta: 'Já conheço. Quero acessar o CRM.',
    microcopy: 'CRM + WhatsApp + automações em um só lugar.',
  },
  timeline: [
    { time: '14:30', text: 'Você iniciou uma sessão', kind: 'session' },
    { time: '14:32', text: 'Novo contato chegou pelo WhatsApp', kind: 'message' },
    { time: '14:33', text: 'Dados organizados no CRM', kind: 'automation' },
    { time: '14:34', text: 'Horários disponíveis enviados', kind: 'automation' },
    { time: '14:36', text: 'Consulta confirmada', kind: 'success' },
    { time: '14:37', text: 'Contato movido para “Agendado”', kind: 'automation' },
    { time: '14:40', text: 'Pendência administrativa sinalizada', kind: 'notice' },
  ],
} as const;
```

- [ ] **Step 4: implementar timeline com motion CSS-only**

Cada item recebe `animation-delay` via CSS custom property. Exemplo:

```tsx
<li
  className="timelineItem"
  style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}
>
```

CSS:

```css
.timelineItem {
  opacity: 0;
  transform: translateY(8px);
  animation: timeline-in 420ms ease-out forwards;
  animation-delay: var(--delay);
}

@keyframes timeline-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

O reduced motion global da Task 2 deve remover a sequência sem esconder conteúdo.

- [ ] **Step 5: implementar Header e Hero**

Requisitos:

- header com marca, âncoras, login e CTA;
- hero desktop assimétrico 2 colunas;
- hero mobile em 1 coluna;
- CTA primário aponta para `#demo` quando `demoUrl` for fallback;
- login aponta para `siteConfig.crmUrl`;
- clicks disparam `track()` correspondente.

- [ ] **Step 6: atualizar teste de página**

Adicionar asserts:

```tsx
expect(screen.getByRole('link', { name: /ver a loomie funcionando/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /acessar o crm/i })).toHaveAttribute(
  'href',
  'https://crm.loomiecrm.com/',
);
```

- [ ] **Step 7: validar**

```bash
npm test -- tests/AutomationTimeline.test.tsx tests/page.test.tsx
npm run lint
```

- [ ] **Step 8: commit**

```bash
git add app components content tests
git commit -m "feat: build Loomie hero and operational timeline"
```

---

### Task 5: Dor operacional + workflow real

**Files:**
- Create: `components/PainSequence.tsx`
- Create: `components/Workflow.tsx`
- Modify: `content/landing.ts`
- Modify: `app/page.tsx`
- Modify: `tests/page.test.tsx`

**Interfaces:**
- Produces: `landingContent.painItems`, `landingContent.workflowSteps`.

- [ ] **Step 1: escrever teste de conteúdo crítico**

```tsx
it('explains the operational job instead of generic AI benefits', () => {
  render(<HomePage />);
  expect(screen.getByText(/responder um novo contato/i)).toBeInTheDocument();
  expect(screen.getByText(/confirmar consulta/i)).toBeInTheDocument();
  expect(screen.getByText(/lembrar de pagamento/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/page.test.tsx
```

- [ ] **Step 3: adicionar dados de dor**

```ts
painItems: [
  'Responder um novo contato',
  'Conferir a agenda',
  'Enviar horários',
  'Confirmar consulta',
  'Lembrar de pagamento',
  'Reorganizar o paciente no fluxo',
  'Fazer follow-up',
],
```

Mensagem de fechamento:

```text
O problema não é uma tarefa isolada. É precisar trocar de papel o dia inteiro.
```

- [ ] **Step 4: implementar `PainSequence` sem grade genérica**

Usar uma faixa/lista sequencial com separadores, alternando pequenos sinais de canal/status. Não usar seis cards idênticos.

- [ ] **Step 5: implementar `Workflow`**

Passos visuais:

```text
WhatsApp → triagem administrativa → agenda/confirmação → pipeline → follow-up
```

Usar conectores somente entre etapas reais. Em mobile, trocar linha horizontal por pilha vertical.

- [ ] **Step 6: validar**

```bash
npm test -- tests/page.test.tsx
npm run lint
```

- [ ] **Step 7: commit**

```bash
git add components content app tests
git commit -m "feat: explain administrative pain and workflow"
```

---

### Task 6: Product showcase baseado nas automações reais

**Files:**
- Create: `components/ProductShowcase.tsx`
- Create: `components/product/WhatsAppScene.tsx`
- Create: `components/product/PipelineScene.tsx`
- Create: `components/product/SchedulingScene.tsx`
- Create: `components/product/BillingScene.tsx`
- Modify: `content/landing.ts`
- Modify: `app/page.tsx`
- Modify: `tests/page.test.tsx`

**Interfaces:**
- Produces quatro cenas visuais compostas em código; nenhuma depende de imagem ou screenshot para funcionar.
- Consumes requisitos das Automações 01, 04, 05 e 07.

- [ ] **Step 1: escrever teste de prova de produto**

```tsx
it('shows concrete product operations', () => {
  render(<HomePage />);
  expect(screen.getByText(/triagem inicial/i)).toBeInTheDocument();
  expect(screen.getByText(/fila de espera/i)).toBeInTheDocument();
  expect(screen.getByText(/consulta confirmada/i)).toBeInTheDocument();
  expect(screen.getByText(/aguardando pagamento/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/page.test.tsx
```

- [ ] **Step 3: implementar `WhatsAppScene`**

Mostrar uma conversa administrativa fictícia claramente representativa, sem dado pessoal real:

```text
Novo contato
“Oi, gostaria de saber sobre atendimento.”

Loomie
“Posso te fazer algumas perguntas para organizar seu primeiro contato?”

Status: dados básicos organizados
```

Não usar linguagem clínica diagnóstica.

- [ ] **Step 4: implementar `PipelineScene`**

Colunas visíveis:

```text
Triagem Inicial | Fila de Espera | Em Tratamento | Em Observação
```

Cards devem usar nomes neutros como `Contato A`, `Contato B`; nunca nomes reais.

- [ ] **Step 5: implementar `SchedulingScene`**

Mostrar:

```text
14:00 disponível
15:30 reservado
17:00 disponível
```

E estado:

```text
Consulta confirmada
```

- [ ] **Step 6: implementar `BillingScene`**

Mostrar fluxo financeiro sem prometer gateway:

```text
Envio de cobrança → Aguardando pagamento → Pago / Em atraso
```

Usar texto “cobrança administrativa” e não “pagamento automático” se não houver integração comprovada.

- [ ] **Step 7: montar showcase com narrativa situação → Loomie → resultado**

Exemplo de item:

```ts
{
  title: 'Novo contato sem interromper sua sessão',
  situation: 'Uma pessoa chama no WhatsApp enquanto você está atendendo.',
  action: 'A Loomie organiza o primeiro contato e coloca a conversa no fluxo certo.',
  result: 'Quando a sessão termina, você encontra o contexto organizado no CRM.'
}
```

- [ ] **Step 8: validar**

```bash
npm test -- tests/page.test.tsx
npm run lint
```

- [ ] **Step 9: commit**

```bash
git add components content app tests
git commit -m "feat: add product proof scenes from real automation flows"
```

---

### Task 7: Como funciona + segurança/responsabilidade

**Files:**
- Create: `components/HowItWorks.tsx`
- Create: `components/Security.tsx`
- Modify: `content/landing.ts`
- Modify: `app/page.tsx`
- Modify: `tests/page.test.tsx`

**Interfaces:**
- Produces seções de implantação e limites de produto.

- [ ] **Step 1: escrever teste de claims responsáveis**

```tsx
it('states that Loomie does not replace professional care', () => {
  render(<HomePage />);
  expect(
    screen.getByText(/não substitui avaliação, atendimento psicológico/i),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/page.test.tsx
```

- [ ] **Step 3: implementar `HowItWorks`**

Passos:

```text
1. Entendemos sua rotina
2. Conectamos a operação
3. Você acompanha tudo na Loomie
```

Numeração é permitida aqui porque há sequência real.

- [ ] **Step 4: implementar `Security` sem claims absolutos**

Copy mínima:

```text
Tecnologia administrativa com responsabilidade.

A Loomie foi pensada para organizar a rotina do consultório sem substituir avaliação, atendimento psicológico ou decisões profissionais.
```

Mostrar somente controles confirmados no produto. Até a auditoria técnica do CRM, não renderizar badges específicos de criptografia/RLS/storage.

- [ ] **Step 5: validar ausência de termos proibidos**

Adicionar teste:

```tsx
const body = document.body.textContent?.toLowerCase() ?? '';
expect(body).not.toContain('100% lgpd');
expect(body).not.toContain('inviolável');
expect(body).not.toContain('zero atrito');
```

- [ ] **Step 6: rodar testes e commit**

```bash
npm test -- tests/page.test.tsx
npm run lint
git add components content app tests
git commit -m "feat: add onboarding and responsible security messaging"
```

---

### Task 8: Lead form + endpoint + estados de conversão

**Files:**
- Create: `lib/lead-schema.ts`
- Create: `tests/lead-schema.test.ts`
- Create: `components/LeadForm.tsx`
- Create: `tests/LeadForm.test.tsx`
- Create: `app/api/lead/route.ts`
- Modify: `app/page.tsx`
- Modify: `.env.example`

**Interfaces:**
- Produces: `LeadInput` e `validateLead(input)`.
- Produces: `POST /api/lead`.
- Consumes: UTM persistida e `track()`.

- [ ] **Step 1: escrever teste de schema**

```ts
import { validateLead } from '@/lib/lead-schema';

describe('validateLead', () => {
  it('rejects a lead without name or WhatsApp', () => {
    expect(validateLead({ name: '', whatsapp: '' }).success).toBe(false);
  });

  it('accepts the minimum valid lead', () => {
    expect(
      validateLead({
        name: 'Ana',
        whatsapp: '11999999999',
        volume: '21-40',
      }).success,
    ).toBe(true);
  });
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/lead-schema.test.ts
```

- [ ] **Step 3: implementar schema sem biblioteca extra**

```ts
export type LeadInput = {
  name: string;
  whatsapp: string;
  volume?: '1-10' | '11-20' | '21-40' | '41+';
  pain?: string;
  utm?: Record<string, string>;
};

export function validateLead(input: Partial<LeadInput>) {
  const name = input.name?.trim() ?? '';
  const whatsapp = input.whatsapp?.replace(/\D/g, '') ?? '';

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Informe seu nome.';
  if (whatsapp.length < 10) errors.whatsapp = 'Informe um WhatsApp válido.';

  return {
    success: Object.keys(errors).length === 0,
    errors,
    data: { ...input, name, whatsapp },
  };
}
```

- [ ] **Step 4: escrever testes do form**

```tsx
it('shows validation errors and does not submit invalid data', async () => {
  const user = userEvent.setup();
  render(<LeadForm />);
  await user.click(screen.getByRole('button', { name: /ver a loomie funcionando/i }));
  expect(await screen.findByText(/informe seu nome/i)).toBeInTheDocument();
});
```

E teste de sucesso com `fetch` substituído por fake controlado para o endpoint local.

- [ ] **Step 5: implementar `POST /api/lead`**

Comportamento v1:

1. validar payload;
2. se `LEAD_WEBHOOK_URL` estiver configurada, encaminhar JSON server-side;
3. se não estiver configurada, retornar `202` com sucesso local e `mode: 'local'` para permitir QA sem integração;
4. nunca logar conteúdo completo do formulário em produção;
5. timeout do webhook via `AbortSignal.timeout(5000)`.

Resposta:

```json
{ "ok": true }
```

ou erro 400:

```json
{ "ok": false, "errors": { "whatsapp": "Informe um WhatsApp válido." } }
```

- [ ] **Step 6: implementar LeadForm**

Campos:

```text
Nome
WhatsApp
Volume aproximado de atendimentos/pacientes
Qual parte do administrativo mais toma seu tempo? (opcional)
```

Estados:

```text
idle → submitting → success
               ↘ error
```

Microcopy de privacidade:

```text
Use apenas seus dados de contato. Não envie informações de pacientes neste formulário.
```

- [ ] **Step 7: tracking**

- primeiro foco em um campo → `lead_form_start`;
- clique submit válido → `lead_form_submit`;
- resposta OK → `lead_form_success`.

- [ ] **Step 8: validar**

```bash
npm test -- tests/lead-schema.test.ts tests/LeadForm.test.tsx
npm run lint
npm run build
```

- [ ] **Step 9: commit**

```bash
git add app components lib tests .env.example
git commit -m "feat: add demo lead capture flow"
```

---

### Task 9: FAQ + closing CTA + Footer

**Files:**
- Create: `components/FAQ.tsx`
- Create: `tests/FAQ.test.tsx`
- Create: `components/ClosingCTA.tsx`
- Create: `components/Footer.tsx`
- Modify: `content/landing.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces accordion com `<button aria-expanded>`.
- Consumes `track('faq_open')`, `siteConfig`.

- [ ] **Step 1: escrever teste do accordion**

```tsx
it('exposes FAQ state accessibly', async () => {
  const user = userEvent.setup();
  render(<FAQ />);
  const trigger = screen.getByRole('button', { name: /preciso entender de automação/i });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});
```

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/FAQ.test.tsx
```

- [ ] **Step 3: adicionar FAQs reais**

Perguntas:

```text
Preciso trocar meu WhatsApp?
Preciso entender de automação?
A Loomie substitui meu atendimento?
Como funciona a implantação?
Posso usar apenas algumas automações?
Como meus dados ficam organizados?
A Loomie funciona para clínicas pequenas?
Quanto custa?
```

Para “Quanto custa?”, resposta v1:

```text
A configuração depende das automações e do volume da operação. Na demonstração, entendemos sua rotina e apresentamos a opção adequada sem criar um plano fictício nesta página.
```

- [ ] **Step 4: implementar ClosingCTA**

Headline:

```text
Pare de administrar o consultório entre uma sessão e outra.
```

CTA aponta para `#demo`/demo configurada e dispara `cta_click_closing`.

- [ ] **Step 5: implementar Footer**

Incluir:

- Loomie;
- CRM;
- Instagram;
- política/privacidade apenas se URL real estiver configurada; caso contrário, não inventar rota.

- [ ] **Step 6: validar e commit**

```bash
npm test -- tests/FAQ.test.tsx tests/page.test.tsx
npm run lint
git add components content app tests
git commit -m "feat: complete FAQ and conversion close"
```

---

### Task 10: Analytics scripts + campaign hydration

**Files:**
- Create: `components/Analytics.tsx`
- Create: `components/CampaignCapture.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/analytics.test.ts`

**Interfaces:**
- `<Analytics />` insere providers somente com IDs válidos.
- `<CampaignCapture />` persiste UTM na primeira renderização client-side.

- [ ] **Step 1: adicionar teste de provider ausente/presente**

Testar que helper de configuração retorna `false` para string vazia e `true` para ID válido.

- [ ] **Step 2: confirmar RED**

```bash
npm test -- tests/analytics.test.ts
```

- [ ] **Step 3: implementar scripts de forma condicional**

Regras:

- usar `next/script`;
- nenhum script quando ID for vazio;
- GA e Meta nunca devem bloquear renderização do conteúdo;
- consent banner/cookie management não deve ser inventado dentro desta task; integração futura deve ser compatível com bloqueio condicional dos scripts.

- [ ] **Step 4: implementar `CampaignCapture`**

No mount:

```ts
const params = new URLSearchParams(window.location.search);
persistUtm(readUtm(params));
```

Não reescrever UTMs existentes por valores vazios.

- [ ] **Step 5: validar**

```bash
npm test -- tests/analytics.test.ts tests/utm.test.ts
npm run build
```

- [ ] **Step 6: commit**

```bash
git add components app tests
git commit -m "feat: wire optional analytics and campaign capture"
```

---

### Task 11: E2E, responsividade e acessibilidade

**Files:**
- Create: `playwright/landing.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `app/globals.css`
- Modify: componentes que falharem no QA

**Interfaces:**
- Produces teste E2E da experiência crítica em desktop e mobile.

- [ ] **Step 1: escrever E2E antes das correções finais**

```ts
import { test, expect } from '@playwright/test';

test('visitor can understand and start the demo flow', async ({ page }) => {
  await page.goto('/?utm_source=instagram&utm_campaign=psico');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /enquanto você atende, sua clínica continua funcionando/i,
    }),
  ).toBeVisible();

  await page.getByRole('link', { name: /ver a loomie funcionando/i }).first().click();
  await expect(page.locator('#demo')).toBeInViewport();

  await page.getByLabel('Nome').fill('Ana');
  await page.getByLabel('WhatsApp').fill('11999999999');
  await page.getByRole('button', { name: /ver a loomie funcionando/i }).last().click();

  await expect(page.getByText(/recebemos seus dados/i)).toBeVisible();
});
```

Adicionar projeto mobile no Playwright usando viewport de dispositivo equivalente a 390×844.

- [ ] **Step 2: rodar e observar falhas**

```bash
npm run test:e2e
```

- [ ] **Step 3: corrigir somente falhas reais detectadas**

Critérios obrigatórios:

- nenhum overflow horizontal a 320px;
- CTA acima da dobra em viewport móvel comum;
- timeline legível em pilha;
- foco percorre header → hero CTA → conteúdo → formulário → FAQ → footer;
- accordion funciona via teclado;
- formulário possui labels associados;
- nenhuma animação essencial quando `reducedMotion: 'reduce'`.

- [ ] **Step 4: adicionar teste reduced motion**

Playwright:

```ts
test.use({ reducedMotion: 'reduce' });

test('content stays visible with reduced motion', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/novo contato chegou pelo whatsapp/i)).toBeVisible();
});
```

- [ ] **Step 5: rodar suite completa**

```bash
npm test
npm run test:e2e
npm run lint
npm run build
```

Expected: tudo PASS.

- [ ] **Step 6: commit**

```bash
git add playwright app components
git commit -m "test: verify landing accessibility and responsive conversion flow"
```

---

### Task 12: SEO estruturado, OG e revisão comercial final

**Files:**
- Create: `components/StructuredData.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Create/Modify: `public/og-loomie-psicologos.png`
- Modify: `README.md`
- Modify: `content/landing.ts`

**Interfaces:**
- Produces JSON-LD básico de `Organization` + `SoftwareApplication` somente com dados verificáveis.

- [ ] **Step 1: escrever teste de conteúdo proibido/obrigatório**

No `page.test.tsx`:

```tsx
it('keeps claims concrete and non-clinical', () => {
  render(<HomePage />);
  const copy = document.body.textContent?.toLowerCase() ?? '';

  expect(copy).toContain('crm');
  expect(copy).toContain('whatsapp');
  expect(copy).toContain('confirma');
  expect(copy).not.toContain('cura');
  expect(copy).not.toContain('diagnóstico por ia');
  expect(copy).not.toContain('acolhimento de crise 24/7');
});
```

- [ ] **Step 2: confirmar teste**

```bash
npm test -- tests/page.test.tsx
```

- [ ] **Step 3: implementar StructuredData**

Somente propriedades verificáveis:

```ts
{
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Loomie para Psicólogos',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web'
}
```

Não incluir `aggregateRating`, preço ou review sem fonte real.

- [ ] **Step 4: criar OG coerente com a identidade**

Composição:

```text
Loomie para Psicólogos
Enquanto você atende,
sua clínica continua funcionando.

[pequena timeline operacional]
```

Azul/branco dominante; sem stock photo de terapeuta.

- [ ] **Step 5: revisar copy inteira contra requisitos de produto**

Checklist manual:

```text
[ ] Automação 01 aparece somente como triagem administrativa
[ ] Automação 04 aparece como cobrança administrativa
[ ] Automação 05 aparece como confirmação
[ ] Automação 07 aparece como agendamento/remanejamento
[ ] Automação 03 pode aparecer como follow-up
[ ] Automação 02/08 não são vendidas como atendimento clínico autônomo
[ ] nenhum recurso de pacote financeiro é prometido
[ ] nenhum gateway de pagamento é presumido
[ ] nenhuma prova social fictícia
```

- [ ] **Step 6: atualizar README**

Documentar:

- instalação;
- variáveis de ambiente;
- comandos de teste/build;
- como alterar demo URL;
- como ativar GA/Meta;
- fonte dos textos comerciais (`content/landing.ts`);
- regra de não incluir dados reais de pacientes nos mocks.

- [ ] **Step 7: verificação final**

```bash
npm test
npm run test:e2e
npm run lint
npm run build
```

Expected: tudo PASS sem warnings relevantes.

- [ ] **Step 8: commit**

```bash
git add .
git commit -m "feat: finalize Loomie psychology landing page"
```

---

## Post-Implementation Review Gate

Antes de merge/publicação:

1. abrir a página em desktop e mobile;
2. validar visualmente se a timeline domina como assinatura sem transformar a página em “dashboard genérico”;
3. remover decoração que não ajude compreensão/conversão;
4. confirmar que nenhum texto promete funcionalidade não implementada;
5. revisar formulário e destino real do lead;
6. verificar políticas/URLs reais antes de exibir links legais;
7. executar `npm test && npm run test:e2e && npm run lint && npm run build`;
8. comparar a implementação com a spec e com `docs/product/psychology-automation-requirements.md`.

## Scope Explicitly Deferred

Não faz parte deste plano de landing page:

- implementação backend das 8 automações;
- RLS/multi-tenant do CRM;
- integração S3/arquivos do diário;
- memória semântica do agente;
- protocolo de alerta/crise;
- conciliação de pagamentos;
- modelo financeiro de pacotes;
- feature entitlement dos planos Basic/Intermediate/Advanced;
- painel de configuração das automações.

Esses itens estão preservados em `docs/product/psychology-automation-requirements.md` e serão implementados em specs separadas para evitar um único projeto impossível de revisar/testar com segurança.
