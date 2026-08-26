'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';
import { TrackedLink } from './TrackedLink';
import { BillingScene, PipelineScene, SchedulingScene, WhatsAppScene } from './product/ProductScenes';

const showcases = [
  {
    eyebrow: '01 · NOVOS CONTATOS',
    title: 'A conversa chega. O CRM já sabe onde organizar.',
    body: 'O primeiro contato deixa de ser mais uma conversa solta. A Loomie conecta o WhatsApp ao fluxo operacional para você retomar com contexto quando sair da sessão.',
    result: 'Situação: novo contato → Ação: organizar → Resultado: próxima etapa visível',
    Scene: WhatsAppScene,
  },
  {
    eyebrow: '02 · PIPELINE',
    title: 'Cada pessoa no estágio certo, sem depender da memória.',
    body: 'Triagem, fila de espera, pacientes ativos e próximos passos ficam visíveis no mesmo fluxo. O Kanban deixa claro o que está parado e o que precisa acontecer.',
    result: 'Situação: vários contatos → Ação: categorizar → Resultado: operação legível',
    Scene: PipelineScene,
  },
  {
    eyebrow: '03 · AGENDA',
    title: 'Confirmação e disponibilidade conectadas à rotina.',
    body: 'Horários disponíveis, confirmações e pedidos de remanejamento podem seguir regras configuradas, reduzindo o vai-e-volta administrativo entre sessões.',
    result: 'Situação: agenda muda → Ação: atualizar → Resultado: menos pingue-pongue',
    Scene: SchedulingScene,
  },
  {
    eyebrow: '04 · ADMINISTRATIVO',
    title: 'A cobrança vira processo, não uma lembrança desconfortável.',
    body: 'Regras administrativas podem sinalizar pendências e organizar o acompanhamento financeiro dentro do CRM, sem transformar a relação terapêutica em planilha mental.',
    result: 'Situação: consulta realizada → Ação: acompanhar → Resultado: pendência organizada',
    Scene: BillingScene,
  },
] as const;

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (tracked.current || !entries.some((entry) => entry.isIntersecting)) return;
        tracked.current = true;
        track('product_showcase_view');
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section showcase-section" aria-labelledby="showcase-title">
      <div className="shell">
        <div className="section-heading showcase-heading">
          <p className="section-label">Produto, não promessa</p>
          <h2 id="showcase-title">Veja a rotina tomando forma dentro da Loomie.</h2>
          <p>Quatro cenas operacionais para mostrar o que muda no dia a dia — sem dashboard de números inventados.</p>
        </div>

        <div className="showcase-list">
          {showcases.map(({ eyebrow, title, body, result, Scene }, index) => (
            <article className={`showcase-row ${index % 2 ? 'showcase-reverse' : ''}`} key={title}>
              <div className="showcase-copy">
                <span className="showcase-eyebrow">{eyebrow}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <span className="showcase-result">{result}</span>
              </div>
              <div className="showcase-visual"><Scene /></div>
            </article>
          ))}
        </div>

        <div className="midpage-cta">
          <div>
            <span className="showcase-eyebrow">SEU FLUXO</span>
            <strong>Quer ver essas etapas aplicadas ao seu consultório?</strong>
          </div>
          <TrackedLink className="button button-large" href="#demo" eventName="cta_click_midpage">
            Quero ver esse fluxo na minha rotina
            <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
