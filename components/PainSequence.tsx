import { painItems } from '@/content/landing';

export function PainSequence() {
  return (
    <section className="section pain-section" aria-labelledby="pain-title">
      <div className="shell pain-layout">
        <div className="section-heading pain-heading">
          <p className="section-label">O custo de lembrar de tudo</p>
          <h2 id="pain-title">Você cuida do paciente. O operacional não pode depender da sua memória.</h2>
          <p>Entre uma sessão e outra, pequenas pendências viram dezenas de decisões administrativas espalhadas pelo dia.</p>
        </div>

        <div className="pain-list">
          {painItems.map(([title, description], index) => (
            <article className="pain-item" key={title}>
              <span className="pain-index">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
