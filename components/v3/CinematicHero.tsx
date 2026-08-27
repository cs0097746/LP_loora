'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/lib/config';
import { track } from '@/lib/analytics';
import { TrackedLink } from '@/components/TrackedLink';
import { DemoWhatsApp } from './DemoWhatsApp';
import { ProductCanvas } from './ProductCanvas';

export function CinematicHero() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const element = sequenceRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || tracked.current) return;
        tracked.current = true;
        track('hero_sequence_view');
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v3-hero" id="top" aria-labelledby="v3-hero-title">
      <div className="v3-hero__grid" aria-hidden="true" />
      <div className="shell v3-hero__inner">
        <div className="v3-hero__copy">
          <div className="v3-hero__eyebrow">
            <span className="v3-hero__eyebrow-dot" aria-hidden="true" />
            CRM + automações para psicólogos
          </div>
          <h1 id="v3-hero-title">Sua clínica continua andando <span>enquanto você está em sessão.</span></h1>
          <p className="v3-hero__lede">
            A Loomie organiza novos contatos, confirmações, agenda e follow-ups. A Leora cuida do repetitivo e sinaliza o que precisa da sua atenção.
          </p>
          <div className="v3-hero__actions">
            <TrackedLink className="button button-large v3-hero__primary" href="#demo" eventName="hero_demo_cta_click">
              Ver a Loomie funcionando
              <span aria-hidden="true">↗</span>
            </TrackedLink>
            <TrackedLink className="v3-hero__secondary" href={siteConfig.crmUrl} eventName="crm_login_click">
              Acessar o CRM
              <span aria-hidden="true">→</span>
            </TrackedLink>
          </div>
          <div className="v3-hero__microproof" aria-label="Rotinas administrativas que o Loomie organiza">
            <span>Novos contatos</span>
            <span>Agenda</span>
            <span>Confirmações</span>
            <span>Follow-ups</span>
          </div>
        </div>

        <div ref={sequenceRef} className="v3-hero__visual v3-hero-sequence" aria-describedby="v3-hero-demo-note">
          <div className="v3-product-aura" aria-hidden="true" />
          <ProductCanvas>
            <DemoWhatsApp />
            <div className="v3-demo-card" aria-hidden="true">
              <span>Contato organizado</span>
              <strong>Ana Ribeiro</strong>
              <small>Novo contato → Agendado</small>
            </div>
            <div className="v3-complete-pill" aria-hidden="true">
              <span>✓</span>
              fluxo atualizado
            </div>
          </ProductCanvas>
          <div className="v3-hero__caption">
            <span>Produto real · dados fictícios</span>
            <span>camada animada demonstrativa</span>
          </div>
          <p className="sr-only" id="v3-hero-demo-note">
            O Kanban é uma tela real do ambiente demonstrativo da Loomie. A mensagem e a movimentação destacadas sobre a tela são uma demonstração visual fictícia de um fluxo administrativo.
          </p>
        </div>
      </div>
    </section>
  );
}
