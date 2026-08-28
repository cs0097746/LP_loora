export function KanbanShowcase() {
  return (
    <section className="v4-kanban" id="produto" aria-labelledby="v4-kanban-title">
      <div className="shell">
        <div className="v4-section-head v4-section-head--wide">
          <p className="v4-kicker">Produto real, sem reconstrução</p>
          <h2 id="v4-kanban-title">Tudo que chega encontra um lugar.</h2>
          <p>Contatos, etapas e próximos passos aparecem no mesmo fluxo administrativo — com contexto suficiente para você retomar sem reconstruir a conversa de cabeça.</p>
        </div>

        <figure className="v4-kanban__stage">
          <div className="v4-product-window">
            <div className="v4-product-window__bar" aria-hidden="true">
              <span /><span /><span /><small>Jornada administrativa · ambiente demo</small>
            </div>
            <div className="v4-product-window__viewport v4-kanban__viewport">
              <img
                data-testid="v4-kanban-main"
                src="/product-v4/kanban-left.webp"
                width="1800"
                height="820"
                alt="Kanban demonstrativo do Loomie com contatos fictícios em diferentes etapas administrativas"
              />
              <div className="v4-kanban__spot v4-kanban__spot--new" aria-hidden="true"><b>Novo contato</b><small>entrada organizada</small></div>
              <div className="v4-kanban__spot v4-kanban__spot--wait" aria-hidden="true"><b>Aguardando horário</b><small>próximo passo claro</small></div>
              <div className="v4-kanban__spot v4-kanban__spot--booked" aria-hidden="true"><b>Agendado</b><small>etapa visível</small></div>
            </div>
          </div>
          <figcaption>Dados fictícios em ambiente demonstrativo. A interface exibida é do produto Loomie.</figcaption>
        </figure>
      </div>
    </section>
  );
}
