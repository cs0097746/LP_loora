const moments = [
  ['01', 'Você está atendendo.'],
  ['02', 'Alguém está perguntando por horário.'],
  ['03', 'Outro paciente precisa confirmar.'],
  ['04', 'Um follow-up ficou para depois.'],
] as const;

export function PainThesis() {
  return (
    <section className="v4-pain" aria-labelledby="v4-pain-title">
      <div className="shell v4-pain__inner">
        <p className="v4-kicker">Enquanto sua atenção está na sessão</p>
        <div className="v4-pain__moments" aria-label="Situações administrativas comuns">
          {moments.map(([index, text]) => (
            <div className="v4-pain__moment" key={index}>
              <span>{index}</span><p>{text}</p>
            </div>
          ))}
        </div>
        <h2 id="v4-pain-title">O problema não é falta de organização. <span>É que sua atenção já tem dono.</span></h2>
      </div>
    </section>
  );
}
