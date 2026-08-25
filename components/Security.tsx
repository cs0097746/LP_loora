export function Security() {
  return (
    <section className="section security-section" id="seguranca" aria-labelledby="security-title">
      <div className="shell security-grid">
        <div>
          <p className="section-label">Responsabilidade</p>
          <h2 id="security-title">Tecnologia administrativa, com limites claros.</h2>
          <p className="security-lede">
            A Loomie foi pensada para organizar a operação do consultório sem se apresentar como psicólogo, serviço de emergência ou substituta do julgamento profissional.
          </p>
        </div>
        <div className="security-principles">
          <article><span>01</span><div><h3>Operação por workspace</h3><p>Contatos e fluxos são organizados no contexto da conta correspondente no CRM.</p></div></article>
          <article><span>02</span><div><h3>Você continua no controle</h3><p>Automações executam regras administrativas; decisões profissionais continuam com o psicólogo.</p></div></article>
          <article><span>03</span><div><h3>Sem claims absolutos</h3><p>Segurança e privacidade devem ser explicadas com controles técnicos verificáveis, não com promessas como “inviolável”.</p></div></article>
        </div>
      </div>
    </section>
  );
}
