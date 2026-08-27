import { LeadForm } from '@/components/LeadForm';

export function FinalConversion() {
  return (
    <section className="v3-conversion" id="demo" aria-labelledby="v3-conversion-title">
      <div className="v3-conversion__grid" aria-hidden="true" />
      <div className="shell v3-conversion__layout">
        <div className="v3-conversion__copy">
          <p className="v3-section-kicker v3-section-kicker--light">Leve para a sua rotina</p>
          <h2 id="v3-conversion-title">Quanto da sua semana ainda está preso em WhatsApp, confirmações e follow-ups?</h2>
          <p>Mostramos como a Loomie se encaixaria no seu fluxo atual — usando o seu contexto administrativo como ponto de partida.</p>
          <div className="v3-conversion__signals" aria-label="O que levamos para a demonstração">
            <span>seu fluxo atual</span>
            <span>seus gargalos administrativos</span>
            <span>uma proposta de organização</span>
          </div>
        </div>

        <div className="v3-conversion__form-wrap">
          <div className="v3-conversion__form-topline">
            <span>Solicitar demonstração</span>
            <small>sem dados clínicos de pacientes</small>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
