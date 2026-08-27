const steps = [
  {
    number: '01',
    title: 'Conectamos sua rotina',
    body: 'Partimos do jeito que novos contatos, agenda e follow-ups já funcionam hoje — sem inventar um processo bonito só para a demonstração.',
  },
  {
    number: '02',
    title: 'Configuramos seu fluxo',
    body: 'Etapas, lembretes, responsáveis e automações administrativas são ajustados ao que faz sentido para o consultório.',
  },
  {
    number: '03',
    title: 'A Loomie passa a organizar o operacional',
    body: 'O repetitivo ganha continuidade no CRM e o que realmente precisa da sua atenção fica mais fácil de enxergar.',
  },
] as const;

export function HowItFits() {
  return (
    <section className="v3-fit" id="como-funciona" aria-labelledby="v3-fit-title">
      <div className="shell">
        <header className="v3-fit__header">
          <p className="v3-section-kicker">Como entra na rotina</p>
          <h2 id="v3-fit-title">Conectamos sua rotina. Não pedimos que você vire operador de software.</h2>
          <p>O ponto de partida é o seu fluxo administrativo atual; a tecnologia entra para dar continuidade, não para criar mais uma tarefa.</p>
        </header>

        <ol className="v3-fit__steps">
          {steps.map((step, index) => (
            <li className="v3-fit-step" key={step.number}>
              <span className="v3-fit-step__number">{step.number}</span>
              <div className="v3-fit-step__line" aria-hidden="true"><i /></div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {index < steps.length - 1 ? <span className="v3-fit-step__arrow" aria-hidden="true">↘</span> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
