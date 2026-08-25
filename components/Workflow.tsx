import { workflowSteps } from '@/content/landing';

export function Workflow() {
  return (
    <section className="section workflow-section" id="recursos" aria-labelledby="workflow-title">
      <div className="shell">
        <div className="section-heading centered-heading">
          <p className="section-label">Uma rotina, um sistema</p>
          <h2 id="workflow-title">Do primeiro “oi” ao próximo passo, sem espalhar a operação.</h2>
          <p>O fluxo administrativo deixa de viver em lembretes mentais e conversas perdidas.</p>
        </div>

        <div className="workflow-track" role="list" aria-label="Fluxo operacional da Loomie">
          {workflowSteps.map(([title, description], index) => (
            <div className="workflow-node" role="listitem" key={title}>
              <div className="workflow-icon" aria-hidden="true">
                {index === 0 ? 'W' : index === 1 ? '↳' : index === 2 ? '✓' : index === 3 ? 'L' : '↻'}
              </div>
              <strong>{title}</strong>
              <p>{description}</p>
              {index < workflowSteps.length - 1 ? <span className="workflow-connector" aria-hidden="true">→</span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
