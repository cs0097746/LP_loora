const steps = [
  ['01', 'Entendemos sua rotina', 'Começamos pelo que hoje depende de WhatsApp, agenda, confirmações e acompanhamento manual.'],
  ['02', 'Configuramos seu fluxo', 'Etapas, responsáveis e rotinas administrativas são organizados de acordo com a operação do consultório.'],
  ['03', 'Loomie organiza o operacional', 'O trabalho repetitivo ganha um fluxo visível; você continua assumindo tudo que exige decisão profissional.'],
] as const;

export function ClinicFit() {
  return (
    <section className="v4-fit" id="como-funciona" aria-labelledby="v4-fit-title">
      <div className="shell">
        <div className="v4-section-head">
          <p className="v4-kicker">Sem reinventar seu consultório</p>
          <h2 id="v4-fit-title">A Loomie entra na rotina em três movimentos.</h2>
        </div>
        <ol className="v4-fit__steps">
          {steps.map(([index, title, body]) => (
            <li key={index}>
              <span>{index}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
