import { TrackedLink } from '@/components/TrackedLink';

export function V4Hero() {
  return (
    <section className="v4-hero" id="top" aria-labelledby="v4-hero-title">
      <div className="v4-hero__glow" aria-hidden="true" />
      <div className="shell v4-hero__inner">
        <div className="v4-hero__copy">
          <p className="v4-kicker"><span aria-hidden="true" /> CRM + automações para psicólogos</p>
          <h1 id="v4-hero-title">Você entra em sessão. <span>O WhatsApp não para.</span></h1>
          <p className="v4-hero__lede">
            A Loomie organiza novos contatos, confirmações, agenda e follow-ups enquanto você cuida de quem está na sua frente.
          </p>
          <div className="v4-hero__actions">
            <TrackedLink className="button button-large" href="#demo" event="cta_hero_click">
              Ver como funciona na minha clínica <span aria-hidden="true">↗</span>
            </TrackedLink>
            <a className="v4-text-link" href="https://crm.loomiecrm.com/">Acessar o CRM <span aria-hidden="true">→</span></a>
          </div>
          <div className="v4-hero__proof" aria-label="Rotinas administrativas centralizadas">
            <span>novos contatos</span><i>·</i><span>agenda</span><i>·</i><span>confirmações</span><i>·</i><span>follow-ups</span>
          </div>
        </div>

        <div className="v4-hero__product" aria-describedby="v4-hero-demo-note">
          <div className="v4-product-window v4-product-window--hero">
            <div className="v4-product-window__bar" aria-hidden="true">
              <span /><span /><span /><small>Clínica Horizonte · ambiente demo</small>
            </div>
            <div className="v4-product-window__viewport">
              <img
                data-testid="v4-hero-product"
                src="/product-v4/kanban-left.webp"
                width="2048"
                height="1407"
                alt="Kanban real do ambiente demonstrativo do Loomie com contatos fictícios organizados por etapa administrativa"
              />
              <div className="v4-hero__focus" aria-hidden="true"><span>Novo contato</span></div>
            </div>
          </div>

          <aside className="v4-wa-card" aria-label="Mensagem administrativa fictícia usada na demonstração visual">
            <div className="v4-wa-card__head"><span aria-hidden="true">●</span> WhatsApp <small>14:32</small></div>
            <p>Oi! Gostaria de saber os horários disponíveis.</p>
          </aside>

          <div className="v4-leora-cue" aria-hidden="true">
            <span>Leora</span><strong>próximo passo sinalizado</strong>
          </div>
          <div className="v4-hero__status" aria-hidden="true"><span /> contato organizado no fluxo</div>
        </div>

        <p id="v4-hero-demo-note" className="v4-demo-note">
          Interface real do ambiente demonstrativo. Mensagem, destaques e movimento são uma ilustração da jornada administrativa; dados exibidos são fictícios.
        </p>
      </div>
    </section>
  );
}
