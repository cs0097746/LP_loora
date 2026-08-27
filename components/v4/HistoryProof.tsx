export function HistoryProof() {
  return (
    <section className="v4-proof v4-proof--history" aria-labelledby="v4-history-title">
      <div className="shell v4-proof__grid">
        <div className="v4-proof__copy">
          <p className="v4-kicker">Contexto administrativo</p>
          <h2 id="v4-history-title">Você não precisa lembrar onde aquela conversa parou.</h2>
          <p>Comentários, etapa, tags e histórico administrativo ficam no mesmo contexto do contato. A ideia é retomar o operacional sem depender da memória.</p>
          <p className="v4-proof__note"><span aria-hidden="true">●</span> Ambiente demonstrativo com dados fictícios; não apresentado como prontuário clínico.</p>
        </div>

        <figure className="v4-history__art">
          <div className="v4-product-window">
            <div className="v4-product-window__bar" aria-hidden="true"><span /><span /><span /><small>Histórico do contato · demo</small></div>
            <div className="v4-product-window__viewport v4-history__viewport">
              <img
                data-testid="v4-history-image"
                src="/product-v4/contact-history.webp"
                width="1800"
                height="1120"
                alt="Tela real do ambiente demonstrativo do Loomie mostrando histórico administrativo de um contato fictício"
              />
            </div>
          </div>
          <div className="v4-history__detail" aria-hidden="true">
            <span>CONTEXTO</span>
            <strong>etapa + comentários + tags</strong>
            <small>sem ampliar um raster pequeno</small>
          </div>
          <figcaption>O recorte visual usa a mesma captura de alta resolução, sem upscale artificial.</figcaption>
        </figure>
      </div>
    </section>
  );
}
