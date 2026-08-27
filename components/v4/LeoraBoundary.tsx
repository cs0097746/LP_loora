const flow = ['Contato', 'Organizar', 'Confirmar', 'Lembrar', 'Sinalizar', 'VOCÊ DECIDE'] as const;

export function LeoraBoundary() {
  return (
    <section className="v4-leora" aria-labelledby="v4-leora-title">
      <div className="v4-leora__grid" aria-hidden="true" />
      <div className="shell v4-leora__inner">
        <div className="v4-leora__copy">
          <p className="v4-kicker v4-kicker--light">Leora · assistência operacional</p>
          <h2 id="v4-leora-title">O repetitivo não precisa disputar sua atenção.</h2>
          <p>A Leora ajuda nas rotinas administrativas configuradas no Loomie e sinaliza quando o próximo passo exige você.</p>
        </div>

        <ol className="v4-leora__flow" aria-label="Fluxo administrativo da Leora até a decisão humana">
          {flow.map((label, index) => (
            <li className={index === flow.length - 1 ? 'v4-leora__node v4-leora__node--human' : 'v4-leora__node'} key={label} style={{ '--v4-flow-index': index } as React.CSSProperties}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
              {index < flow.length - 1 && <i aria-hidden="true">→</i>}
            </li>
          ))}
        </ol>

        <div className="v4-leora__boundary">
          <span aria-hidden="true">✦</span>
          <p><strong>Avaliação, decisão e conduta clínica continuam com você.</strong> O fluxo administrativo termina onde começa o julgamento profissional.</p>
        </div>
      </div>
    </section>
  );
}
