export type V5State = 'novo' | 'proximo-passo' | 'aguardando' | 'confirmado';

export const V5_HERO = {
  eyebrow: 'Loomie para psicólogos',
  title: 'Sua atenção está na sessão. A rotina continua acontecendo.',
  body: 'Novos contatos, horários, confirmações e próximos passos não precisam disputar sua atenção enquanto você atende.',
  cta: 'Ver a Loomie na minha rotina',
  session: 'Sessão · 14:00–14:50',
  messageTime: '14:17',
  message: 'Oi, queria saber se tem horário esta semana.',
  contactName: 'Marina',
  slot: 'Qua · 16:30',
} as const;

export const V5_PRESSURE_ITEMS = [
  'confirmar amanhã',
  'responder novo contato',
  'reagendamento',
  'retornar mensagem',
  'ver próximo horário',
] as const;

export const V5_INBOUND = {
  title: 'Uma coisa chega. Ela sabe para onde ir.',
  steps: ['mensagem', 'contato', 'próximo passo', 'agenda'] as const,
} as const;
