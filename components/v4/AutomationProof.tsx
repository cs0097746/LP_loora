export function AutomationProof() {
  return (
    <section className="v4-proof v4-proof--automation" aria-labelledby="v4-automation-title">
      <div className="shell">
        <div className="v4-section-head">
          <p className="v4-kicker">Automação configurável</p>
          <h2 id="v4-automation-title">Quando algo acontece, o próximo passo não precisa sumir da rotina.</h2>
          <p>Gatilhos e tarefas aparecem como partes do mesmo sistema administrativo — não como dois prints desconectados.</p>
        </div>

        <div className="v4-causal">
          <figure className="v4-causal__side v4-causal__side--when">
            <div className="v4-causal__label"><span>QUANDO</span><strong>uma etapa muda</strong></div>
            <div className="v4-product-window">
              <div className="v4-product-window__bar" aria-hidden="true"><span /><span /><span /><small>Automações · demo</small></div>
              <div className="v4-product-window__viewport v4-causal__viewport">
                <img data-testid="v4-automation-image" src="/product-v4/automations.webp" width="1800" height="460" alt="Tela real do Loomie com gatilhos administrativos demonstrativos e inativos" />
              </div>
            </div>
          </figure>

          <div className="v4-causal__connector" aria-hidden="true"><span>Entrou em Agendado</span><i>→</i><span>rotina configurada</span></div>

          <figure className="v4-causal__side v4-causal__side--then">
            <div className="v4-causal__label"><span>ENTÃO</span><strong>uma pendência fica visível</strong></div>
            <div className="v4-product-window">
              <div className="v4-product-window__bar" aria-hidden="true"><span /><span /><span /><small>Tarefas · demo</small></div>
              <div className="v4-product-window__viewport v4-causal__viewport">
                <img data-testid="v4-task-image" src="/product-v4/tasks.webp" width="1800" height="540" alt="Tela real do Loomie com uma tarefa administrativa fictícia no ambiente demonstrativo" />
              </div>
            </div>
          </figure>
        </div>
        <p className="v4-causal__disclaimer">Exemplo ilustrativo de relação administrativa. Os gatilhos exibidos no ambiente demo estão inativos e são configuráveis.</p>
      </div>
    </section>
  );
}
