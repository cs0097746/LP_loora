export function AutomationProof() {
  return (
    <section className="v4-proof v4-proof--automation" aria-labelledby="v4-automation-title">
      <div className="shell">
        <div className="v4-section-head">
          <p className="v4-kicker">Automação configurável</p>
          <h2 id="v4-automation-title">Quando algo acontece, o próximo passo não precisa sumir da rotina.</h2>
          <p>Gatilhos e próximos passos aparecem como partes do mesmo sistema administrativo — com clareza sobre o que é tela real e o que é exemplo.</p>
        </div>

        <div className="v4-causal">
          <figure className="v4-causal__side v4-causal__side--when">
            <div className="v4-causal__label"><span>QUANDO</span><strong>uma etapa muda</strong></div>
            <div className="v4-product-window">
              <div className="v4-product-window__bar" aria-hidden="true"><span /><span /><span /><small>Automações · demo</small></div>
              <div className="v4-product-window__viewport v4-causal__viewport">
                <img data-testid="v4-automation-image" src="/product/loomie-automations.webp" width="700" height="259" alt="Tela real do Loomie com gatilhos administrativos demonstrativos e inativos" />
              </div>
            </div>
          </figure>

          <div className="v4-causal__connector" aria-hidden="true"><span>Entrou em Agendado</span><i>→</i><span>rotina configurada</span></div>

          <figure className="v4-causal__side v4-causal__side--then">
            <div className="v4-causal__label"><span>ENTÃO</span><strong>uma pendência fica visível</strong></div>
            <div className="v4-causal__viewport v4-task-example" data-testid="v4-task-example">
              <div className="v4-task-example__topline">
                <span>EXEMPLO ILUSTRATIVO</span>
                <small>próximo passo administrativo</small>
              </div>

              <div className="v4-task-example__card">
                <div>
                  <small>Tarefa</small>
                  <strong>Confirmar presença</strong>
                </div>
                <span>Hoje · 17:30</span>
              </div>

              <dl className="v4-task-example__meta">
                <div><dt>Origem</dt><dd>Entrada em “Agendado”</dd></div>
                <div><dt>Responsável</dt><dd>Rotina administrativa</dd></div>
                <div><dt>Próximo passo</dt><dd>Fica visível para acompanhamento</dd></div>
              </dl>
            </div>
          </figure>
        </div>
        <p className="v4-causal__disclaimer">A tela de Automações é uma captura do ambiente demo. O cartão de próximo passo é uma representação ilustrativa do resultado administrativo de uma rotina configurada.</p>
      </div>
    </section>
  );
}
