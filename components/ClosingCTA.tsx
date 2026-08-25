import { LeadForm } from './LeadForm';

export function ClosingCTA() {
  return (
    <section className="section demo-section" id="demo" aria-labelledby="demo-title">
      <div className="shell demo-grid">
        <div className="demo-copy">
          <p className="section-label light-label">Sua rotina, aplicada</p>
          <h2 id="demo-title">Pare de administrar o consultório entre uma sessão e outra.</h2>
          <p>Conte o tamanho da sua rotina. A demonstração parte dos seus gargalos, não de uma lista genérica de funcionalidades.</p>
          <div className="demo-proofline">
            <span>01</span> Sem compromisso de trocar tudo de uma vez
            <span>02</span> Foco no operacional que mais pesa hoje
          </div>
        </div>
        <div className="demo-form-wrap">
          <div className="form-heading"><span>Demonstração Loomie</span><strong>Vamos começar pelo seu cenário.</strong></div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
