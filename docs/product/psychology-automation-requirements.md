# Loomie para Psicólogos — Inventário de Requisitos de Automação

**Data:** 2026-08-25  
**Status:** requisitos de produto fornecidos pelo fundador; ainda não é especificação técnica aprovada para implementação backend  
**Uso:** fonte de verdade para a LP e base para futuras specs de produto

## 1. Objetivo do produto

Transformar a Loomie em um CRM verticalizado para psicólogos, com automações de atendimento administrativo, triagem, agenda, acompanhamento, cobrança, fidelização e registro de informações, mantendo cada clínica/workspace isolada.

A LP pode demonstrar fluxos operacionais já previstos neste documento, mas não deve apresentar funcionalidades clínicas sensíveis como concluídas, autônomas ou juridicamente validadas antes de implementação, testes e revisão específica.

---

## 2. Consentimento inicial

### Mensagem 01 — aceite para interação com agente de IA

Antes da primeira automação conversacional, o contato deve receber uma mensagem clara de aceite para ser atendido por um agente de IA.

Requisito de registro:

- ID do contato;
- workspace/clínica;
- texto/versão do consentimento apresentado;
- resposta recebida;
- timestamp;
- canal/origem.

Sem aceite, o agente não inicia a coleta automatizada de dados sensíveis.

---

## 3. Automações

### Automação 01 — Agente de acolhimento / triagem inicial

Responsabilidade: receber o primeiro contato, coletar informações configuradas pelo psicólogo e rotear o lead.

Informações básicas esperadas:

- nome;
- confirmação se o atendimento é para a própria pessoa ou terceiro;
- idade do paciente;
- descrição do motivo da busca;
- informações adicionais configuradas pelo psicólogo.

Cada informação customizada deve possuir:

- nome/label;
- descrição do que deve ser coletado;
- exemplo de resposta aceitável.

Ferramentas previstas:

- `obter_lead(contact_id)` — busca o negócio/lead associado ao contato;
- `salvar_atributo(lead_id, label, value)` — cria/salva atributo, evitando duplicação; `label` é definido na configuração do psicólogo;
- `agendar_lead(lead_id)` — transfere o fluxo para o agente de agendamento sem anunciar uma “transferência de bot” ao usuário;
- `enviar_lead(lead_id, destination)` — move para `fila_de_espera` ou `em_tratamento` segundo capacidade e regras.

Regra de retomada:

- se o contato ficar mais de 1 hora sem responder durante a triagem, enviar uma mensagem de retomada configurada.

Regras de destino:

- `em_tratamento` apenas quando houver vaga disponível;
- sem vaga, enviar para `fila_de_espera`;
- fila de espera deve suportar tags de priorização;
- considerar indicação de gravidade/urgência apenas como sinal configurável para avaliação humana, nunca como diagnóstico automático;
- considerar tag de ex-paciente quando aplicável.

---

### Automação 02 — Agente de acompanhamento

Responsabilidade: conduzir interações de acompanhamento configuradas pelo profissional e registrar informações para consulta posterior.

Capacidades previstas:

- `verificar_emocao` — analisar texto e classificar segundo taxonomia configurada, registrando no diário;
- `enviar_exercicio` — entregar material previamente aprovado/configurado pelo psicólogo;
- `crise_protocolo` — sinalizar imediatamente o profissional quando critérios configurados forem atingidos.

Formato de configuração de emoções/materiais:

- nome da emoção/categoria;
- descrição;
- no mínimo 3 sinais/sintomas observáveis descritos pelo profissional;
- instruções de identificação;
- material de apoio vinculado: áudio, exercício, visualização ou arquivo.

Limite de segurança:

- o agente não deve diagnosticar, prometer contenção clínica, substituir atendimento, decidir conduta terapêutica ou se apresentar como serviço de emergência;
- `crise_protocolo` é mecanismo de alerta/escalonamento ao profissional.

---

### Automação 03 — Follow-up / fidelização

Responsabilidade: disparar mensagens por tempo no funil e registrar feedback.

Mecânica prevista:

- schedule verifica há quanto tempo o lead está no funil/estágio;
- envia mensagem de follow-up;
- um agente recebe o retorno;
- registra feedback no CRM;
- agradece e encerra a interação de forma simples.

Uso esperado no funil de fidelização:

- 30 dias;
- 90 dias;
- 180 dias;
- 365 dias;
- base de clientes.

---

### Automação 04 — Cobrança

Responsabilidade: calcular cobrança e enviar mensagem administrativa.

Modo por sessão:

- consultar sessões realizadas/agendadas no período definido;
- usar valor por sessão configurado pelo profissional;
- calcular total;
- gerar/enviar cobrança administrativa;
- criar/mover item no funil financeiro.

Modo pacote:

- requisito ainda aberto;
- não implementar até definir regras de pacote, consumo, validade, estorno e sessões remanescentes.

---

### Automação 05 — Confirmação de consulta

Responsabilidade: confirmar consulta antes do horário.

Configuração:

- disparo por intervalo configurável antes da consulta;
- mensagem de confirmação;
- registrar resposta/estado da confirmação;
- refletir estado no CRM/agenda de forma consultável.

Estados mínimos sugeridos para futura spec:

- aguardando confirmação;
- confirmado;
- solicitou remanejamento;
- não respondeu.

---

### Automação 06 — Formulário personalizado → criação de cliente

Responsabilidade: captar dados em LP/formulário personalizado do psicólogo e criar o lead diretamente no workspace correto.

Requisitos:

- formulário deve estar vinculado à credencial/workspace Loomie do profissional;
- criar contato/lead no kanban correto;
- preservar origem/campanha;
- evitar duplicidade de contato conforme regra a ser definida na spec técnica.

---

### Automação 07 — Agente de agendamento e remanejamento

Responsabilidade: agendar ou remarcar consultas para leads/pacientes vindos de outros fluxos.

Origens principais:

- Automação 01;
- Automação 02;
- Automação 05 quando houver pedido de remanejamento.

Ferramentas previstas:

- `verificar_disponibilidades(...)`;
- `agendar_consulta(...)`.

Regra de capacidade para pacientes novos:

- antes de agendar novo paciente, contar leads no estágio `Em Tratamento`;
- só permitir entrada quando quantidade atual for menor que o limite definido pelo profissional no painel de automação;
- se não houver vaga, encaminhar para fila de espera.

---

### Automação 08 — Check-in recorrente + diário do paciente

Responsabilidade: disparar check-ins periódicos, transferir para o agente da Automação 02 e gerar registro estruturado para consulta do profissional.

Configuração:

- frequência diária ou semanal definida pelo profissional;
- mensagem disparada por schedule;
- interação conduzida pelo agente de acompanhamento;
- conversa analisada e transformada em registro de diário/relatório.

Requisitos de diário:

- armazenar o registro fora do contexto bruto do LLM quando possível;
- separar dados de identificação do conteúdo resumido;
- permitir visualização segura dentro do CRM;
- suportar anexos/materiais quando necessário;
- registrar data, origem e versão do processamento;
- preservar vínculo com paciente/lead sem expor conteúdo a outros workspaces.

Pseudonimização deve ser tratada como uma camada adicional de minimização de dados, não como garantia de anonimização jurídica.

---

## 4. Kanbans

### Kanban Operacional

1. `Triagem Inicial` — entrada da Automação 01;
2. `Fila de Espera` — priorização configurável por tags;
3. `Em Tratamento` — pacientes ativos; Automação 02/08 podem atuar conforme configuração;
4. `Em Observação` — permanência por X dias definida pelo profissional;
5. `Ganho` — conclusão automática após regra de observação configurada.

Observação: numeração original pulava o estágio 05; nesta documentação a sequência foi normalizada sem alterar o significado.

### Kanban Fidelização

1. `30 dias`;
2. `90 dias`;
3. `180 dias`;
4. `365 dias`;
5. `Base de Clientes`.

A movimentação deverá ser definida na futura spec de lifecycle para evitar duplicação entre estágio e schedule.

### Kanban Financeiro

1. `Envio de Cobrança` — mensagem enviada;
2. `Aguardando Pagamento` — após disparo/registro da cobrança;
3. `Pago` — conclusão automática após confirmação de pagamento;
4. `Em Atraso` — mover após mais de 3 dias em `Aguardando Pagamento`, salvo configuração diferente futura.

A fonte de verdade de “pagamento confirmado” ainda precisa ser definida (webhook de gateway, confirmação manual, conciliação etc.).

---

## 5. Planos comerciais de automação

### PSICO_BASIC

Inclui:

- Automação 01;
- Automação 02 limitada;
- Automação 03;
- Automação 04;
- Automação 05;
- Automação 07.

Automação 02 no Basic:

- acompanhamento básico;
- sem materiais personalizados de crise;
- em situação sinalizada, apenas notifica o profissional segundo protocolo configurado.

### PSICO_INTERMEDIATE

Inclui:

- tudo do Basic;
- materiais padrão de apoio/alerta definidos pelo produto e revisados antes de publicação;
- Automação 06.

### PSICO_ADVANCED

Inclui:

- tudo do Intermediate;
- personalização de materiais;
- diário do paciente / Automação 08;
- capacidades avançadas somente após validação técnica e de compliance.

---

## 6. Infraestrutura e isolamento — requisitos, não decisão final de stack

Objetivos:

- isolamento rígido por workspace/clínica;
- nenhum acesso cruzado entre profissionais;
- autorização em toda leitura/escrita sensível;
- armazenamento privado de arquivos;
- trilha de auditoria para ações críticas.

Direções propostas pelo fundador:

- banco relacional como PostgreSQL/Supabase;
- Row-Level Security quando compatível com a arquitetura real da Loomie;
- storage privado como S3 com bloqueio de acesso público;
- backend emitindo URLs temporárias/autorizadas para acesso a arquivos.

Essas tecnologias precisam ser confrontadas com a arquitetura atual do Loomie CRM antes da implementação. Não duplicar infraestrutura apenas para esta vertical se o CRM já possuir mecanismos equivalentes.

---

## 7. LGPD, segurança e compliance — requisitos funcionais

### Consentimento

- consentimento registrado com versão + timestamp + contato + workspace;
- mecanismo de revogação/cessação precisa existir na spec técnica;
- base legal e texto final devem passar por revisão jurídica adequada ao fluxo real.

### Minimização

- coletar apenas campos necessários e configurados;
- não enviar dados desnecessários a modelos externos;
- separar conteúdo operacional de conteúdo sensível sempre que possível.

### Isolamento

- workspace/tenant deve fazer parte explícita de cada consulta de dados;
- políticas de autorização devem ser testáveis;
- arquivos nunca devem ser públicos por padrão.

### IA e memória

Direção desejada:

- não depender de histórico bruto ilimitado de conversa como “memória”;
- extrair fatos estruturados/minimizados quando necessário;
- manter documentos clínicos fora da memória geral do agente;
- registrar qual modelo/processo gerou cada resumo relevante;
- definir política de retenção e exclusão em spec própria.

### Arquivos/relatórios

Direção desejada:

- visualização autenticada dentro do CRM;
- quando download externo for necessário, usar mecanismo temporário/autorizado;
- não expor bucket/storage diretamente.

### Importante

RLS, S3 privado, pseudonimização e URLs temporárias são controles técnicos úteis, mas isoladamente não tornam o produto “adequado integralmente à LGPD”. A implementação precisa ser acompanhada de decisões sobre finalidade, base legal, retenção, direitos do titular, suboperadores, incidentes e contratos/políticas.

---

## 8. Decomposição recomendada para implementação futura

Este escopo é grande demais para uma única spec executável. Deve ser dividido em subprojetos independentes e testáveis:

### Subprojeto A — Consentimento + Triagem + Capacidade

- Mensagem 01;
- Automação 01;
- parte de Automação 07;
- Kanban Operacional inicial;
- tags e limite de vagas.

### Subprojeto B — Agenda + Confirmação + Remanejamento

- Automação 05;
- restante da Automação 07;
- integração com calendário existente.

### Subprojeto C — Financeiro

- Automação 04;
- Kanban Financeiro;
- conciliação/estado de pagamento;
- modelo por sessão primeiro;
- pacote somente após regras fechadas.

### Subprojeto D — Fidelização

- Automação 03;
- Kanban Fidelização;
- lifecycle 30/90/180/365.

### Subprojeto E — Acompanhamento + Alertas

- Automação 02;
- materiais configuráveis;
- alertas ao profissional;
- limites explícitos de atuação do agente.

### Subprojeto F — Diário + Arquivos + Check-ins

- Automação 08;
- armazenamento e visualização segura;
- minimização/pseudonimização;
- extração estruturada;
- retenção e exclusão.

### Subprojeto G — Forms personalizados

- Automação 06;
- vínculo seguro com workspace;
- deduplicação;
- tracking de origem.

### Subprojeto H — Planos e entitlement

- PSICO_BASIC;
- PSICO_INTERMEDIATE;
- PSICO_ADVANCED;
- feature flags/limites por plano;
- upgrade/downgrade e comportamento quando automação deixa de estar disponível.

Cada subprojeto deve passar por design/spec próprios antes de implementação.

---

## 9. O que a LP v1 pode demonstrar com segurança

A landing page aprovada pode usar como exemplos concretos:

- novo contato entrando pelo WhatsApp;
- triagem administrativa e coleta de dados configurados;
- organização automática no CRM;
- checagem de vagas;
- oferta de horários;
- confirmação e remanejamento;
- follow-up;
- cobrança administrativa;
- fila de espera;
- movimentação de pipeline;
- formulário personalizado criando lead.

Recursos de acompanhamento emocional, alerta de crise, materiais e diário podem aparecer apenas em contexto limitado e responsável, sem promessa de decisão clínica autônoma e preferencialmente depois que suas specs específicas estiverem aprovadas.
