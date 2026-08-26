import { howItWorks } from '@/content/landing';

export function HowItWorks() {
  return (
    <section className="section how-section" id="como-funciona" aria-labelledby="how-title">
      <div className="shell how-grid">
        <div className="how-intro">
          <p className="section-label light-label">Implantação</p>
          <h2 id="how-title">Você define a rotina. A Loomie conecta as peças.</h2>
          <p>Sem precisar aprender automação, webhooks ou ferramentas técnicas para começar.</p>
        </div>
        <ol className="how-list">
          {howItWorks.map(([title, description], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
