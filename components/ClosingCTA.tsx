import { LeadForm } from './LeadForm';

export function ClosingCTA() {
  return (
    <section className="section demo-section" id="demo" aria-labelledby="demo-title">
      <div className="shell demo-grid">
        <div className="demo-copy">
          <p className="section-label light-label">Demonstração orientada ao seu fluxo</p>
          <h2 id="demo-title">Veja como esse fluxo ficaria no seu consultório.</h2>
          <p>
            Conte como você organiza hoje novos contatos, agenda e follow-ups. A demonstração parte da sua rotina — não de um roteiro genérico de CRM.
          </p>
          <div className="demo-points" aria-label="O que vamos entender na demonstração">
            <span>Seu volume</span>
            <span>Seus gargalos</span>
            <span>As automações que fazem sentido</span>
          </div>
          <p className="demo-boundary">Não envie informações clínicas de pacientes neste formulário.</p>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
