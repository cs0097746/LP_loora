import { painItems } from '@/content/landing';

export function PainSequence() {
  return (
    <section className="section pain-section" aria-labelledby="pain-title">
      <div className="shell">
        <div className="section-heading split-heading">
          <div>
            <p className="section-label">O operacional invisível</p>
            <h2 id="pain-title">O que acontece entre uma sessão e outra?</h2>
          </div>
          <p>
            O problema não é uma tarefa isolada. É precisar trocar de papel o dia inteiro — psicólogo, agenda, atendimento, cobrança e organização.
          </p>
        </div>

        <div className="pain-ledger">
          {painItems.map(([title, description], index) => (
            <article className="pain-row" key={title}>
              <span className="pain-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="pain-status">manual</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
