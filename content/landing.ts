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
  ['Novos contatos espalhados', 'Mensagens chegam quando você está atendendo e precisam continuar encontráveis depois.'],
  ['Agenda entre sessões', 'Confirmações e reagendamentos criam um vai-e-volta que fragmenta o dia.'],
  ['Follow-ups que dependem de lembrar', 'Quando a rotina aperta, o próximo passo fica preso na memória ou no histórico do WhatsApp.'],
] as const;

export const workflowSteps = [
  ['WhatsApp', 'A conversa chega pelo canal que seu consultório já usa.'],
  ['Organização', 'A Loomie registra e direciona o contato para o fluxo correto.'],
  ['Agenda', 'Disponibilidade, confirmação e remanejamento ficam conectados à rotina.'],
  ['CRM', 'Você encontra cada pessoa no estágio certo quando voltar ao sistema.'],
  ['Follow-up', 'Regras administrativas lembram o que precisa acontecer depois.'],
] as const;

export const howItWorks = [
  ['O contato entra', 'Uma nova demanda administrativa chega e deixa de depender de uma conversa solta.'],
  ['Loomie organiza', 'Dados, etapa, responsável e próximo passo ficam reunidos em um fluxo visível.'],
  ['Você assume o que exige você', 'Quando existe uma decisão humana ou clínica, você recebe o contexto e continua no controle.'],
] as const;

export const faqItems = [
  {
    question: 'A Loomie substitui meu atendimento?',
    answer: 'Não. A Loomie organiza tarefas administrativas e operacionais. Ela não substitui psicoterapia, avaliação, diagnóstico, atendimento de urgência ou decisões profissionais.',
  },
  {
    question: 'Preciso trocar meu WhatsApp?',
    answer: 'Na demonstração, validamos o cenário técnico do seu número e mostramos a forma indicada de integrar o fluxo atual ao Loomie. A configuração depende do canal e da operação que você já usa.',
  },
  {
    question: 'Preciso entender de automação?',
    answer: 'Não. Você define as regras da sua rotina — etapas, horários, lembretes e limites — e a configuração técnica é organizada na implantação.',
  },
  {
    question: 'O que a Leora pode automatizar?',
    answer: 'A Leora é posicionada como assistente operacional. Ela pode apoiar rotinas administrativas como organização de contatos, confirmações, lembretes e follow-ups conforme a configuração escolhida. Julgamento e conduta clínica continuam humanos.',
  },
  {
    question: 'A Loomie funciona para consultórios pequenos?',
    answer: 'Sim. Esta experiência foi desenhada especialmente para psicólogos autônomos e operações pequenas que ainda concentram WhatsApp, agenda e acompanhamento administrativo na própria profissional.',
  },
  {
    question: 'Como funciona a implantação?',
    answer: 'Primeiro entendemos sua rotina e seus gargalos. Depois configuramos o CRM e as automações priorizadas. A demonstração serve para validar o fluxo antes de definir a configuração comercial.',
  },
  {
    question: 'Como meus dados ficam organizados?',
    answer: 'Contatos, etapas, responsáveis, tags e atividades administrativas ficam reunidos no workspace correspondente. Detalhes técnicos de segurança e tratamento de dados devem ser avaliados conforme a configuração contratada.',
  },
  {
    question: 'Quanto custa?',
    answer: 'O valor depende do volume, dos canais e das automações escolhidas. Na demonstração, entendemos o cenário e apresentamos a configuração comercial adequada ao seu consultório.',
  },
] as const;
