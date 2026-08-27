export const storySteps = [
  {
    id: 'contact',
    time: '14:32',
    title: 'Chegou um novo contato',
    body: 'Uma mensagem administrativa inicia a jornada sem depender de você interromper a sessão.',
    scene: 'contact',
  },
  {
    id: 'context',
    time: '14:33',
    title: 'O contexto entrou no Loomie',
    body: 'O contato ganha lugar no fluxo e deixa de ficar solto entre abas, conversas e memória.',
    scene: 'kanban',
  },
  {
    id: 'next-step',
    time: '14:35',
    title: 'O próximo passo ficou claro',
    body: 'Etapa e responsável deixam visível o que precisa acontecer agora.',
    scene: 'progress',
  },
  {
    id: 'follow-up',
    time: '14:40',
    title: 'O follow-up já está organizado',
    body: 'Tarefas e gatilhos administrativos sustentam a continuidade sem depender da sua memória.',
    scene: 'follow-up',
  },
] as const;

export type StoryScene = (typeof storySteps)[number]['scene'];
