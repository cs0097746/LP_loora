import { siteConfig } from '@/lib/config';
import { AutomationTimeline } from './AutomationTimeline';
import { TrackedLink } from './TrackedLink';

export function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="hero-grid shell">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="kicker-dot" aria-hidden="true" />
            CRM + automações para psicólogos
          </div>
          <h1>Enquanto você atende, <span>sua clínica continua funcionando.</span></h1>
          <p className="hero-lede">
            A Loomie organiza WhatsApp, novos contatos, confirmações, cobranças e follow-ups em um CRM pensado para a rotina de psicólogos.
          </p>
          <div className="hero-actions">
            <TrackedLink className="button button-large" href="#demo" eventName="cta_click_hero">
              Ver a Loomie funcionando
              <span aria-hidden="true">↗</span>
            </TrackedLink>
            <TrackedLink className="secondary-link" href={siteConfig.crmUrl} eventName="crm_login_click">
              Já conheço. Quero acessar o CRM
            </TrackedLink>
          </div>
          <p className="hero-microcopy">WhatsApp <span>·</span> CRM <span>·</span> automações em um só lugar.</p>
        </div>

        <div className="hero-visual">
          <div className="session-note" aria-hidden="true">
            <span className="session-time">14:30</span>
            <span className="session-line" />
            <span>50 min protegidos para atender</span>
          </div>
          <AutomationTimeline />
        </div>
      </div>
    </section>
  );
}
