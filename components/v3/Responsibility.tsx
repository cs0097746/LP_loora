const principles = [
  {
    title: 'Controle humano no centro',
    body: 'Avaliação, decisão e conduta clínica permanecem com o profissional. A Loomie não substitui julgamento clínico.',
  },
  {
    title: 'Automação administrativa configurável',
    body: 'Confirmações, lembretes, organização de contatos e follow-ups são definidos conforme o fluxo do consultório.',
  },
  {
    title: 'Dados tratados como rotina de consultório',
    body: 'A configuração deve considerar necessidade, acesso e cuidado com os dados usados na operação — sem promessas absolutas de segurança.',
  },
] as const;

export function Responsibility() {
  return (
    <section className="v3-responsibility" id="responsabilidade" aria-labelledby="v3-responsibility-title">
      <div className="shell v3-responsibility__grid">
        <div className="v3-responsibility__copy">
          <p className="v3-section-kicker">Responsabilidade</p>
          <p className="v3-responsibility__lead">Automação para o administrativo.</p>
          <h2 id="v3-responsibility-title">Julgamento profissional continua sendo profissional.</h2>
          <p>
            A tecnologia pode reduzir trabalho repetitivo sem transformar automação administrativa em decisão clínica.
          </p>
        </div>

        <div className="v3-responsibility__principles">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
