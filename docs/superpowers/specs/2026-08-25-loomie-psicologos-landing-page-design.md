# Loomie para Psicólogos — Landing Page Design Specification

**Data:** 2026-08-25  
**Status:** Aprovado em direção; aguardando revisão final da especificação antes da implementação  
**Repositório:** `cs0097746/LP_loora`

## 1. Objetivo

Criar uma landing page de alta conversão para a vertical de psicologia do Loomie CRM, com foco inicial em psicólogos clínicos autônomos que usam WhatsApp para administrar novos contatos, confirmações, cobranças, remarcações e follow-ups entre sessões.

A página não deve vender um “CRM genérico” nem uma “IA terapeuta”. O produto deve ser apresentado como a camada operacional que mantém o consultório organizado enquanto o profissional está atendendo.

### Job-to-be-done principal

> Enquanto o psicólogo atende, a Loomie organiza o operacional do consultório.

### Resultado esperado da página

Converter tráfego frio ou morno vindo de anúncios, Instagram, indicação ou conteúdo em uma destas duas ações:

1. **CTA primário:** solicitar/ver uma demonstração da Loomie aplicada à rotina do consultório;
2. **CTA secundário:** acessar o CRM para usuários já conscientes do produto.

O CTA primário deve prevalecer visualmente em todos os pontos de conversão.

---

## 2. Público-alvo inicial

### ICP primário

Psicólogo clínico autônomo que:

- usa WhatsApp como principal canal administrativo;
- atende uma agenda recorrente de pacientes;
- não possui secretária dedicada ou ainda executa parte relevante do administrativo;
- precisa responder novos contatos entre sessões;
- lida manualmente com confirmações, faltas, remarcações e cobranças;
- sente que tarefas administrativas ocupam energia que deveria estar no atendimento;
- quer tecnologia prática, sem precisar aprender automações, webhooks ou ferramentas técnicas.

### Fora do foco da primeira versão

A página não será escrita prioritariamente para:

- grandes clínicas com equipes administrativas maduras;
- desenvolvedores de automações;
- agências que revendem CRM;
- público genérico de SaaS;
- pacientes buscando atendimento psicológico.

Clínicas pequenas podem converter, mas não devem diluir a mensagem principal da v1.

---

## 3. Posicionamento

### Marca recomendada

**Loomie para Psicólogos**

A Loomie permanece como marca principal. “Loora” pode ser usada futuramente como nome de uma assistente ou automação específica, mas não será a marca dominante desta landing page até que exista uma decisão marcária/SEO consciente.

Motivo: já existe uma marca internacional relevante chamada Loora AI, o que cria ruído potencial de busca e reconhecimento.

### Categoria

**CRM + automações para a rotina de psicólogos.**

### Promessa central

> **Enquanto você atende, sua clínica continua funcionando.**

Subpromessa:

> A Loomie organiza WhatsApp, novos contatos, confirmações, cobranças e follow-ups em um CRM pensado para a rotina de psicólogos.

### O que não prometer

A página não deve afirmar, sem evidência específica e verificável:

- “100% em conformidade” ou “adequação integral” à LGPD/CFP;
- que a tecnologia é “inviolável”;
- “zero atrito” financeiro;
- economia exata de horas sem dados próprios;
- redução exata de faltas sem dados próprios;
- suporte clínico autônomo em crises;
- substituição da avaliação ou do julgamento profissional;
- números de clientes, retenção ou resultados que não tenham fonte real;
- depoimentos, logos ou métricas fictícias.

### Linguagem

Usar português brasileiro simples, direto e operacional.

Evitar:

- psicologuês excessivo;
- jargão técnico de automação;
- termos como webhooks, n8n, multi-tenant e LLM na narrativa principal;
- metáforas abstratas como “escudo operacional” se puder ser dito concretamente;
- tom de “IA milagrosa”.

Preferir verbos e objetos reconhecíveis pelo público: responder, organizar, confirmar, cobrar, remarcar, acompanhar, agenda, paciente, WhatsApp, consulta.

---

## 4. Princípios de conversão

A arquitetura deve seguir esta ordem mental:

1. **Entendi em segundos para que serve.**
2. **Consigo visualizar funcionando na minha rotina.**
3. **Reconheço minhas tarefas/dor.**
4. **Vejo o produto resolvendo isso de forma concreta.**
5. **Entendo como começa.**
6. **Confio o suficiente para pedir uma demonstração.**

### Regra de copy

Cada seção deve responder a uma pergunta do visitante. Se uma seção não reduz dúvida, aumenta desejo, prova capacidade ou conduz à ação, ela deve ser removida.

### Prova antes de promessa

Sempre que possível, mostrar o produto, fluxo ou comportamento em vez de descrever benefícios abstratos.

---

## 5. Estrutura da página

### 5.1 Header

Objetivo: orientar sem criar rotas de fuga excessivas.

Itens:

- logo Loomie;
- âncoras opcionais: Como funciona, Recursos, Segurança, FAQ;
- link secundário “Entrar” apontando para `https://crm.loomiecrm.com/`;
- CTA primário “Ver a Loomie funcionando”.

Em mobile, reduzir navegação e preservar CTA.

---

### 5.2 Hero — tese da página

#### Headline

> **Enquanto você atende, sua clínica continua funcionando.**

#### Supporting copy

> A Loomie organiza WhatsApp, novos contatos, confirmações, cobranças e follow-ups em um CRM pensado para a rotina de psicólogos.

#### CTA primário

> **Ver a Loomie funcionando**

#### CTA secundário

> Já conheço. Quero acessar o CRM.

#### Microcopy

> CRM + WhatsApp + automações em um só lugar.

#### Elemento assinatura: “Enquanto você está em sessão”

O hero terá uma visualização própria que demonstra uma sessão em andamento e, paralelamente, eventos administrativos sendo processados.

Exemplo de timeline:

```text
14:30  Você iniciou uma sessão

14:32  Novo contato chegou pelo WhatsApp
14:33  Dados organizados no CRM
14:34  Horários disponíveis enviados
14:36  Consulta confirmada
14:37  Contato movido para “Agendado”
14:40  Pendência administrativa sinalizada
```

A timeline deve comunicar operação contínua e organização sem sugerir decisão clínica autônoma.

#### Motion

Um único momento orquestrado:

- no primeiro viewport, após entrada do hero, os eventos da timeline aparecem em sequência;
- animação curta, suave e funcional;
- respeitar `prefers-reduced-motion`;
- não repetir animações distrativas por toda a página.

---

### 5.3 Seção “O que acontece entre uma sessão e outra?”

Objetivo: espelhar o trabalho administrativo invisível.

Exemplos de situações:

- responder um novo contato;
- conferir agenda;
- enviar horários;
- confirmar consulta;
- lembrar de pagamento;
- reorganizar paciente no fluxo;
- lembrar de fazer follow-up.

A seção deve ser visualmente compacta, com microcenas ou uma sequência de tarefas, não uma grade genérica de seis cards.

Mensagem-chave:

> O problema não é uma tarefa isolada. É precisar trocar de papel o dia inteiro.

---

### 5.4 Seção de transformação — “Uma rotina, um sistema”

Objetivo: mostrar a integração do fluxo.

Visual recomendado:

```text
WHATSAPP
   ↓
NOVO CONTATO
   ↓
AGENDA / CONFIRMAÇÃO
   ↓
PIPELINE DO CRM
   ↓
FOLLOW-UP / ADMINISTRATIVO
```

Essa seção deve usar representações inspiradas no produto real, não mockups genéricos de dashboard.

---

### 5.5 Product showcase

Objetivo: provar que existe produto real por trás da promessa.

Mostrar 3–4 cenas principais:

1. **Conversas/WhatsApp** — contatos centralizados;
2. **Pipeline/Kanban** — etapas claras do relacionamento;
3. **Agenda/organização** — confirmação e acompanhamento;
4. **Automações** — ações operacionais acontecendo a partir de regras configuradas.

Cada cena segue a fórmula:

**situação → ação do sistema → resultado reconhecível**

Exemplo:

> Novo contato chegou → Loomie registra e organiza → você encontra a conversa no estágio certo quando terminar a sessão.

Evitar textos de engenharia.

---

### 5.6 Como funciona

Três passos reais, sem numeração decorativa fora desta seção:

1. **Entendemos sua rotina** — horários, mensagens, regras e etapas;
2. **Conectamos a operação** — CRM, WhatsApp e automações necessárias;
3. **Você acompanha tudo na Loomie** — com o fluxo rodando de forma organizada.

Se a implantação real for diferente, o texto deverá ser ajustado antes de produção.

---

### 5.7 Segurança e responsabilidade

Objetivo: reduzir risco percebido sem fazer claims absolutos.

A seção só poderá apresentar fatos técnicos que forem confirmados pelo produto.

Estrutura:

- dados por workspace/conta;
- controle de acesso;
- criptografia em trânsito e/ou repouso, se existente;
- logs e rastreabilidade, se existentes;
- política de privacidade;
- práticas relacionadas à LGPD;
- transparência sobre recursos automatizados.

Copy-base:

> **Tecnologia administrativa com responsabilidade.**
>
> A Loomie foi pensada para organizar a rotina do consultório sem substituir avaliação, atendimento psicológico ou decisões profissionais.

Para qualquer funcionalidade de IA que sinalize mensagens potencialmente urgentes, usar linguagem de “alerta/sinalização para o profissional”, nunca “gerenciamento clínico autônomo de crise”.

---

### 5.8 Social proof

Componente será preparado, mas só publicado com evidência real.

Tipos aceitos:

- depoimento identificado e autorizado;
- mini caso com antes/depois qualitativo;
- número real de usuários/clientes;
- screenshot autorizado;
- métricas próprias com metodologia documentada.

Fallback da v1 sem prova suficiente:

- remover a seção ou substituir por uma demonstração mais forte do produto.

Nunca preencher com conteúdo fictício.

---

### 5.9 Oferta / captura

CTA dominante:

> **Ver a Loomie funcionando na minha rotina**

Formulário inicial enxuto:

- nome;
- WhatsApp;
- faixa de volume de atendimentos ou pacientes;
- opcional: principal tarefa administrativa que deseja automatizar.

Não pedir informação clínica de pacientes.

Após envio:

- mostrar confirmação clara;
- registrar origem/UTM;
- encaminhar para próximo passo definido pelo negócio (WhatsApp, calendário ou página de confirmação).

O destino exato será configurável por variável/constante para permitir ajustes sem reescrever os componentes.

---

### 5.10 FAQ

Perguntas recomendadas:

- Preciso trocar meu WhatsApp?
- Preciso entender de automação?
- A Loomie substitui meu atendimento?
- Como funciona a implantação?
- Posso usar apenas algumas automações?
- Como meus dados ficam organizados?
- A Loomie funciona para clínicas pequenas?
- Quanto custa?

A resposta de preço deverá refletir a estratégia comercial real. Não inventar planos.

---

### 5.11 Closing CTA

Headline sugerida:

> **Pare de administrar o consultório entre uma sessão e outra.**

Supporting copy:

> Veja como a Loomie pode assumir partes repetitivas da sua operação e deixar sua rotina mais organizada.

CTA:

> **Ver a Loomie funcionando**

---

## 6. Sistema visual

### 6.1 Direção

A página deve parecer tecnologia madura aplicada à rotina de saúde, não “wellness genérico” e não “SaaS futurista de IA”.

Predominância: azul + branco.

### 6.2 Tokens de cor

- **Loomie Blue:** `#316DBD` — CTA, links, elementos principais;
- **Cloud:** `#F7FAFF` — superfícies secundárias;
- **White:** `#FFFFFF` — fundo dominante;
- **Ink:** `#0B1B33` — texto principal;
- **Leaf:** `#7ED957` — confirmações/status positivos, em uso contido;
- **Automation Violet:** `#8C52FF` — eventos de automação/IA, em uso contido.

Verde e roxo são sinais funcionais. Não devem competir com o azul como cores de marca dominante.

### 6.3 Tipografia

Direção inicial:

- **Display:** Bricolage Grotesque;
- **Body:** Source Sans 3;
- **Utility/data:** IBM Plex Mono.

A utility font deve aparecer em timestamps, status e pequenos elementos de sistema, reforçando a sensação de operação real.

Se houver problema de performance/licenciamento/disponibilidade, usar alternativas de mesma intenção visual antes de trocar por uma combinação genérica.

### 6.4 Layout

- max-width consistente;
- grande espaço em branco;
- ritmo vertical forte;
- menos cards; mais composição editorial/produto;
- screenshots e UI mockups tratados como evidência, não decoração;
- cantos moderados, evitando arredondamento excessivo;
- linhas e conectores usados apenas quando explicam fluxo.

### 6.5 Elemento assinatura

A timeline operacional do hero é o principal risco estético deliberado e o elemento memorável da página.

Todo o restante deve ser mais silencioso para deixá-la dominar.

### 6.6 O que evitar

- creme + sálvia + terracota como identidade principal;
- gradientes decorativos em todos os blocos;
- glassmorphism sem função;
- blobs, partículas ou ícones 3D de IA;
- grades repetitivas de cards idênticos;
- excesso de badges;
- animação em cada seção;
- dashboard falso cheio de números inventados.

---

## 7. Arquitetura técnica

### 7.1 Stack

Implementação planejada:

- Next.js (App Router);
- TypeScript;
- Tailwind CSS;
- componentes locais e sem dependência de um design system visual genérico;
- animações preferencialmente em CSS/React; biblioteca externa apenas se houver benefício claro.

### 7.2 Estrutura de componentes

Estrutura sugerida:

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Header.tsx
  Hero.tsx
  AutomationTimeline.tsx
  PainSequence.tsx
  Workflow.tsx
  ProductShowcase.tsx
  HowItWorks.tsx
  Security.tsx
  SocialProof.tsx
  LeadForm.tsx
  FAQ.tsx
  ClosingCTA.tsx
  Footer.tsx
lib/
  analytics.ts
  utm.ts
  constants.ts
public/
  ...
```

Separar conteúdo estático de comportamento quando isso simplificar testes e manutenção.

### 7.3 Configuração externa

Valores que podem mudar devem ficar centralizados:

- URL do CRM;
- destino do CTA/demo;
- WhatsApp comercial;
- IDs de analytics/pixels;
- dados de contato;
- redes sociais.

---

## 8. Tracking e CRO

### Eventos mínimos

- `cta_click_hero`;
- `cta_click_header`;
- `cta_click_midpage`;
- `cta_click_closing`;
- `crm_login_click`;
- `lead_form_start`;
- `lead_form_submit`;
- `lead_form_success`;
- `faq_open`;
- `product_showcase_view`.

Eventos devem carregar, quando disponíveis:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- landing path/referrer quando aplicável.

### Integrações

Preparar suporte configurável para:

- GA4;
- Meta Pixel;
- futura ferramenta de analytics/session replay.

Nenhuma integração deve quebrar a página quando não houver ID configurado.

### Hipóteses futuras de A/B test

Não implementar testes na primeira entrega; apenas deixar estrutura limpa para iterar.

Prioridades futuras:

1. headline operacional vs. headline de ganho de tempo;
2. CTA “Ver funcionando” vs. “Quero automatizar minha clínica”;
3. demo guiada vs. contato por WhatsApp;
4. screenshot real vs. timeline interativa no segundo viewport.

---

## 9. SEO

### Intenção principal

A página é transacional/comercial.

Termos a trabalhar naturalmente:

- CRM para psicólogos;
- software para psicólogos;
- automação para psicólogos;
- gestão de consultório de psicologia;
- WhatsApp para psicólogos;
- CRM para consultório de psicologia.

Evitar keyword stuffing.

### Entregáveis

- title e meta description;
- canonical configurável;
- OpenGraph/Twitter cards;
- sitemap;
- robots;
- structured data de software/organization quando adequado;
- headings semanticamente corretos;
- texto indexável suficiente sem sacrificar conversão.

---

## 10. Acessibilidade e performance

### Acessibilidade mínima

- HTML semântico;
- foco visível;
- navegação por teclado;
- labels reais em campos;
- contraste adequado;
- estados de erro claros;
- accordion acessível;
- `prefers-reduced-motion` respeitado;
- alt text útil em imagens que transmitam informação.

### Performance

- mobile-first;
- imagens otimizadas;
- fontes com estratégia de carregamento adequada;
- evitar JavaScript desnecessário acima da dobra;
- evitar bibliotecas grandes para efeitos simples;
- meta de Core Web Vitals saudável em condições reais.

---

## 11. Responsividade

### Mobile

O hero não deve virar apenas “desktop espremido”.

No mobile:

- headline primeiro;
- CTA primário visível rapidamente;
- timeline vira uma pilha vertical compacta;
- screenshots podem virar recortes focados;
- formulários em uma coluna;
- sticky CTA opcional somente se não prejudicar leitura/UX.

### Desktop

Hero em composição assimétrica:

```text
┌─────────────────────────┬──────────────────────────┐
│ Headline + copy + CTA   │ Sessão + timeline       │
│                         │ operacional              │
└─────────────────────────┴──────────────────────────┘
```

A página pode alternar blocos de texto e produto sem se prender a uma grade de cards.

---

## 12. Conteúdo regulatório e clínico

A v1 deve manter a proposta no território administrativo/operacional, onde a mensagem é mais simples e defensável.

Qualquer recurso futuro relacionado a:

- análise de mensagens clínicas;
- alerta de risco;
- diário do paciente;
- interação automatizada entre sessões;
- exercícios de regulação;
- recomendações clínicas;

deve ser tratado como um módulo separado de produto e submetido a revisão específica antes de entrar como promessa central da landing page.

A LP deve deixar claro que Loomie não substitui psicoterapia, avaliação, diagnóstico, atendimento de urgência ou julgamento profissional.

---

## 13. Fontes e referências estratégicas

Pesquisa inicial utilizada para calibrar posicionamento e estrutura:

- Pousio — https://pousio.com.br/
- Mensio — https://www.mensio.com.br/para/psicologo
- Cuidaty — https://cuidaty.com/
- SimplePractice — https://www.simplepractice.com/
- TherapyNotes — https://www.therapynotes.com/
- CFP — posicionamento sobre IA no contexto da prática psicológica: https://site.cfp.org.br/cfp-divulga-posicionamento-sobre-inteligencia-artificial-no-contexto-da-pratica-psicologica/
- CRP-12 — perguntas frequentes sobre tecnologias digitais: https://transparencia.cfp.org.br/crp12/pergunta-frequente/
- Frontend Design Skill — https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md

Essas referências informam o raciocínio; a implementação não deve copiar layouts, textos ou identidade visual de concorrentes.

---

## 14. Critérios de aceite da primeira entrega

### Design/copy

- [ ] visitante entende o produto e público-alvo no primeiro viewport;
- [ ] hero possui timeline operacional distintiva;
- [ ] azul/branco dominam a identidade;
- [ ] verde e roxo são usados como sinais funcionais;
- [ ] nenhuma métrica ou prova fictícia;
- [ ] nenhuma promessa clínica autônoma;
- [ ] CTAs usam linguagem concreta;
- [ ] página não se parece com template SaaS genérico.

### Produto

- [ ] fluxo WhatsApp → organização → pipeline → follow-up é compreensível;
- [ ] product showcase usa interface real ou representações fiéis;
- [ ] login do CRM está acessível como ação secundária;
- [ ] formulário de lead funciona e possui estados de erro/sucesso.

### Engenharia

- [ ] build de produção passa;
- [ ] TypeScript sem erros;
- [ ] lint passa;
- [ ] layout funciona em mobile/tablet/desktop;
- [ ] navegação por teclado funciona;
- [ ] reduced motion funciona;
- [ ] analytics não quebra sem IDs configurados;
- [ ] UTMs são preservadas para conversão;
- [ ] metadata/SEO básico completo.

### Conversão

- [ ] CTA principal acima da dobra;
- [ ] CTA reaparece após prova do produto e no fechamento;
- [ ] formulário pede somente dados necessários;
- [ ] eventos essenciais de funil são disparados;
- [ ] cada seção tem uma função clara no avanço da decisão.

---

## 15. Decisões que serão confirmadas durante implementação

Estas decisões não bloqueiam a arquitetura e podem ser configuradas na execução:

- URL/destino definitivo do CTA de demonstração;
- número de WhatsApp comercial;
- IDs de GA4/Meta Pixel;
- screenshots definitivos do CRM;
- preço, caso a oferta pública seja adotada;
- provas sociais reais disponíveis.

Enquanto esses itens não existirem, a implementação usará configuração neutra e nunca inventará conteúdo comercial.

---

## 16. Definição de sucesso

A v1 estará pronta quando uma pessoa que nunca ouviu falar da Loomie conseguir, em poucos segundos:

1. identificar que é uma solução para psicólogos;
2. entender que ela organiza o administrativo do consultório;
3. visualizar tarefas acontecendo enquanto o profissional atende;
4. reconhecer WhatsApp, agenda/pipeline, cobranças e follow-ups como parte do fluxo;
5. confiar que existe um software real;
6. saber exatamente qual ação tomar para ver uma demonstração.

A primeira implementação será otimizada para clareza e credibilidade. O próximo ciclo deve usar dados de tráfego e conversão para decidir o que mudar, em vez de adicionar complexidade antes da validação.