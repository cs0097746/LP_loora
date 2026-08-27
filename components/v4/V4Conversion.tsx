import { LeadForm } from '@/components/LeadForm';

const benefits = [
  'novos contatos em um fluxo visível',
  'rotinas administrativas configuráveis',
  'próximos passos sem depender da memória',
] as const;

export function V4Conversion() {
  return (
    <section className="v4-conversion" id="demo" aria-labelledby="v4-conversion-title">
      <div className="v4-conversion__orb" aria-hidden="true" />
      <div className="shell v4-conversion__grid">
        <div className="v4-conversion__copy">
          <p className="v4-kicker v4-kicker--light">Demonstração aplicada à sua rotina</p>
          <h2 id="v4-conversion-title">Quanto da sua semana ainda está preso no operacional?</h2>
          <p>Mostramos a Loomie a partir do fluxo que você já tem — sem transformar a conversa comercial em coleta de informações clínicas de pacientes.</p>
          <ul>
            {benefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}
          </ul>
          <div className="v4-conversion__mini" aria-hidden="true">
            <span>WhatsApp</span><i>→</i><span>Loomie</span><i>→</i><strong>próximo passo</strong>
          </div>
        </div>
        <div className="v4-conversion__form">
          <div className="v4-conversion__form-head"><span>DEMONSTRAÇÃO</span><small>leva poucos campos para começar</small></div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
