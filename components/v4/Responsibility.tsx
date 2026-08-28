const points = [
  ['Controle humano', 'A Loomie organiza e sinaliza. Avaliação, decisão e conduta profissional continuam com o psicólogo.'],
  ['Fluxos configuráveis', 'Automações administrativas devem refletir a rotina definida pelo consultório — não uma lógica clínica autônoma.'],
  ['Dados tratados com cuidado', 'A operação deve usar dados necessários para a finalidade administrativa, com acesso e processos adequados ao contexto do consultório.'],
] as const;

export function Responsibility() {
  return (
    <section className="v4-responsibility" id="responsabilidade" aria-labelledby="v4-responsibility-title">
      <div className="shell v4-responsibility__grid">
        <div>
          <p className="v4-kicker">Responsabilidade</p>
          <h2 id="v4-responsibility-title"><span>Automação para o administrativo.</span> Julgamento profissional continua sendo profissional.</h2>
        </div>
        <div className="v4-responsibility__points">
          {points.map(([title, body], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{body}</p></div></article>
          ))}
        </div>
      </div>
    </section>
  );
}
