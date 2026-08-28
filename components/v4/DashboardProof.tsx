export function DashboardProof() {
  return (
    <section className="v4-dashboard" aria-labelledby="v4-dashboard-title">
      <div className="shell">
        <div className="v4-section-head v4-section-head--wide">
          <p className="v4-kicker">Visibilidade operacional</p>
          <h2 id="v4-dashboard-title">Você olha uma vez e sabe o que está acontecendo.</h2>
          <p>O dashboard reúne o panorama da operação para você enxergar o fluxo sem reconstruir o dia de cabeça.</p>
        </div>

        <figure className="v4-dashboard__stage">
          <div className="v4-product-window">
            <div className="v4-product-window__bar" aria-hidden="true"><span /><span /><span /><small>Dashboard · ambiente demo</small></div>
            <div className="v4-product-window__viewport">
              <img data-testid="v4-dashboard-image" src="/product-v4/dashboard.webp" width="1800" height="820" alt="Dashboard real do ambiente demonstrativo do Loomie com dados fictícios da operação" />
              <div className="v4-dashboard__callout v4-dashboard__callout--contacts" aria-hidden="true"><b>14</b><span>contatos no ambiente demo</span></div>
              <div className="v4-dashboard__callout v4-dashboard__callout--pipeline" aria-hidden="true"><span>pipeline</span><b>visível por etapa</b></div>
              <div className="v4-dashboard__callout v4-dashboard__callout--next" aria-hidden="true"><span>próximos passos</span><b>organizados</b></div>
            </div>
          </div>
          <figcaption>Os números mostrados pertencem ao ambiente demonstrativo; não representam resultado ou promessa de performance.</figcaption>
        </figure>
      </div>
    </section>
  );
}
