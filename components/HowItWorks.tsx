import { howItWorks } from '@/content/landing';

export function HowItWorks() {
  return (
    <section className="section how-section" id="como-funciona" aria-labelledby="how-title">
      <div className="shell">
        <div className="section-heading how-intro">
          <p className="section-label">Como funciona</p>
          <h2 id="how-title">O sistema segura o contexto. Você entra onde sua presença importa.</h2>
          <p>Um fluxo simples para tirar o administrativo da memória sem tirar de você o controle profissional.</p>
        </div>

        <ol className="how-list">
          {howItWorks.map(([title, description], index) => (
            <li className="how-item" key={title}>
              <span className="how-number">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
