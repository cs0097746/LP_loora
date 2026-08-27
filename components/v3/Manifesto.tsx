const statements = [
  {
    title: 'WhatsApp organizado.',
    body: 'Novos contatos deixam de depender de abas abertas e memória.',
  },
  {
    title: 'Rotina administrativa automatizada.',
    body: 'Confirmações, lembretes e follow-ups entram em um fluxo configurado.',
  },
  {
    title: 'Decisão clínica sempre humana.',
    body: 'O Loomie organiza o operacional; avaliação e conduta continuam com você.',
  },
];

export function Manifesto() {
  return (
    <section className="v3-manifesto" aria-label="Princípios do Loomie para psicólogos">
      <div className="shell v3-manifesto__inner">
        <p className="v3-section-kicker">Menos ruído entre uma sessão e outra</p>
        <div className="v3-manifesto__list">
          {statements.map((statement) => (
            <article className="v3-manifesto__statement" key={statement.title}>
              <h2>{statement.title}</h2>
              <p>{statement.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
