export const timelineEvents = [
  { time: '14:30', text: 'Você iniciou uma sessão', tone: 'session' },
  { time: '14:32', text: 'Novo contato chegou pelo WhatsApp', tone: 'whatsapp' },
  { time: '14:33', text: 'Dados organizados no CRM', tone: 'automation' },
  { time: '14:34', text: 'Horários disponíveis enviados', tone: 'automation' },
  { time: '14:36', text: 'Consulta confirmada', tone: 'success' },
  { time: '14:37', text: 'Contato movido para “Agendado”', tone: 'success' },
  { time: '14:40', text: 'Pendência administrativa sinalizada', tone: 'attention' },
] as const;

export const painItems = [
  ['Novo contato', 'Responder enquanto outra sessão está começando.'],
  ['Agenda', 'Conferir horários, sugerir opções e lembrar da confirmação.'],
  ['Remarcação', 'Voltar à agenda, negociar horário e reorganizar o fluxo.'],
  ['Cobrança', 'Lembrar pagamentos sem misturar o papel clínico e o administrativo.'],
  ['Follow-up', 'Não deixar contatos e pacientes sumirem no histórico do WhatsApp.'],
] as const;

export const workflowSteps = [
  ['WhatsApp', 'A conversa chega pelo canal que seu consultório já usa.'],
  ['Organização', 'A Loomie registra e direciona o contato para o fluxo correto.'],
  ['Agenda', 'Disponibilidade, confirmação e remanejamento ficam conectados à rotina.'],
  ['CRM', 'Você encontra cada pessoa no estágio certo quando voltar ao sistema.'],
  ['Follow-up', 'Regras administrativas lembram o que precisa acontecer depois.'],
] as const;

export const howItWorks = [
  ['Entendemos sua rotina', 'Mapeamos horários, mensagens, etapas e tarefas repetitivas do consultório.'],
  ['Conectamos a operação', 'Configuramos CRM, WhatsApp e as automações que fazem sentido para o seu fluxo.'],
  ['Você acompanha na Loomie', 'O operacional fica organizado em um único lugar, com você no controle das decisões.'],
] as const;

export const faqItems = [
  {
    question: 'Preciso trocar meu WhatsApp?',
    answer: 'A implantação é desenhada para aproveitar o fluxo de WhatsApp da sua operação. Na demonstração, validamos o cenário técnico do seu número e explicamos a configuração indicada.',
  },
  {
    question: 'Preciso entender de automação?',
    answer: 'Não. A proposta é você definir regras da sua rotina — horários, etapas, mensagens e limites — enquanto a parte técnica fica na configuração da Loomie.',
  },
  {
    question: 'A Loomie substitui meu atendimento?',
    answer: 'Não. A Loomie organiza tarefas administrativas e operacionais. Ela não substitui psicoterapia, avaliação, diagnóstico, atendimento de urgência ou decisões profissionais.',
  },
  {
    question: 'Como funciona a implantação?',
    answer: 'Começamos entendendo sua rotina, conectamos os canais e configuramos os fluxos escolhidos. O desenho final depende das automações que você quer usar.',
  },
  {
    question: 'Posso começar com poucas automações?',
    answer: 'Sim. A implantação pode priorizar os gargalos mais claros primeiro, como novos contatos, confirmação, organização do pipeline ou cobrança.',
  },
  {
    question: 'Como meus dados ficam organizados?',
    answer: 'A operação é estruturada por workspace no CRM, com contatos, etapas e atividades reunidos no fluxo correspondente. Detalhes técnicos de segurança são apresentados conforme a configuração contratada.',
  },
  {
    question: 'A Loomie funciona para clínicas pequenas?',
    answer: 'Sim. Esta página é focada principalmente em psicólogos autônomos, mas clínicas pequenas com uma operação parecida também podem usar a mesma estrutura.',
  },
  {
    question: 'Quanto custa?',
    answer: 'O valor depende do volume, dos canais e das automações escolhidas. Na demonstração, entendemos seu cenário e apresentamos a configuração comercial adequada sem inventar um pacote que não combine com a sua rotina.',
  },
] as const;
