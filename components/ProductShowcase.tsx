'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';
import { TrackedLink } from './TrackedLink';

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const eventName = (entry.target as HTMLElement).dataset.event;
          if (!eventName || seen.has(eventName)) continue;
          seen.add(eventName);
          track(eventName);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );

    section.querySelectorAll<HTMLElement>('[data-event]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section product-section" id="produto" aria-labelledby="product-title">
      <div className="shell">
        <div className="section-heading product-intro">
          <p className="section-label">Produto real, rotina visível</p>
          <h2 id="product-title">Do primeiro contato ao follow-up, sem reconstruir o dia na cabeça.</h2>
          <p>As telas abaixo são do Loomie em um ambiente demonstrativo criado apenas com dados fictícios.</p>
        </div>

        <article className="product-proof product-proof-wide" data-event="product_kanban_view">
          <div className="product-proof-copy">
            <span className="proof-number">01</span>
            <p className="section-label">Jornada administrativa</p>
            <h3>Um fluxo claro para saber onde cada contato está.</h3>
            <p>O Kanban organiza a jornada em etapas que fazem sentido para a rotina do consultório, deixando próximo passo e responsável visíveis.</p>
            <div className="stage-line" aria-label="Etapas do fluxo demonstrativo">
              <span>Novo contato</span><i>→</i><span>Triagem administrativa</span><i>→</i><span>Aguardando horário</span><i>→</i><span>Agendado</span><i>→</i><span>Confirmado</span><i>→</i><span>Follow-up</span>
            </div>
          </div>
          <figure className="product-figure product-figure-wide">
            <div className="product-frame">
              <Image
                className="product-image"
                src="/product/loomie-kanban.webp"
                alt="Kanban do Loomie com contatos fictícios distribuídos pelas etapas da jornada administrativa"
                width={1000}
                height={439}
                sizes="(max-width: 760px) 920px, 1180px"
              />
            </div>
            <figcaption>Ambiente demonstrativo com dados fictícios.</figcaption>
          </figure>
        </article>

        <article className="product-proof product-proof-split" data-event="product_history_view">
          <div className="product-proof-copy">
            <span className="proof-number">02</span>
            <p className="section-label">Contexto preservado</p>
            <h3>Quando você volta para o contato, o contexto ainda está lá.</h3>
            <p>Etapa, tags, comentários administrativos, dados do contato e histórico ficam reunidos para você entender o que aconteceu sem procurar em várias telas.</p>
            <ul className="proof-list">
              <li>etapa e responsável visíveis;</li>
              <li>tags para organizar situações administrativas;</li>
              <li>comentários e próximos passos no mesmo contexto.</li>
            </ul>
          </div>
          <figure className="product-figure">
            <div className="product-frame">
              <Image
                className="product-image"
                src="/product/loomie-contact-history.webp"
                alt="Detalhe de um negócio fictício no Loomie com etapa, tags e histórico administrativo"
                width={900}
                height={688}
                sizes="(max-width: 760px) 94vw, 580px"
              />
            </div>
            <figcaption>Registro demonstrativo. Não representa prontuário clínico.</figcaption>
          </figure>
        </article>

        <article className="product-proof product-proof-automation" data-event="product_automation_view">
          <div className="product-proof-copy automation-copy">
            <span className="proof-number">03</span>
            <p className="section-label">Leora + automações</p>
            <h3>A Leora cuida do repetitivo. Você continua no controle.</h3>
            <p>Confirmações, lembretes e follow-ups podem virar regras administrativas configuradas no Loomie. A Leora organiza e sinaliza o que exige atenção.</p>
            <div className="human-boundary">
              <strong>O limite é explícito.</strong>
              <span>Avaliação, decisão e conduta clínica são da psicóloga.</span>
            </div>
          </div>
          <div className="automation-media">
            <figure className="product-figure">
              <div className="product-frame product-frame-compact">
                <Image
                  className="product-image"
                  src="/product/loomie-automations.webp"
                  alt="Tela de gatilhos administrativos fictícios no Loomie, todos desativados no ambiente demo"
                  width={900}
                  height={254}
                  sizes="(max-width: 760px) 94vw, 520px"
                />
              </div>
              <figcaption>Gatilhos demo mantidos inativos.</figcaption>
            </figure>
            <figure className="product-figure automation-task-figure">
              <div className="product-frame product-frame-compact">
                <Image
                  className="product-image"
                  src="/product/loomie-tasks.webp"
                  alt="Tela de tarefa administrativa fictícia agendada no Loomie"
                  width={900}
                  height={339}
                  sizes="(max-width: 760px) 94vw, 520px"
                />
              </div>
              <figcaption>Nenhuma mensagem real é enviada pelo tenant demonstrativo.</figcaption>
            </figure>
          </div>
        </article>

        <article className="product-proof product-proof-split product-proof-dashboard" data-event="product_dashboard_view">
          <div className="product-proof-copy">
            <span className="proof-number">04</span>
            <p className="section-label">Visibilidade operacional</p>
            <h3>Veja o que está acontecendo sem reconstruir sua rotina de cabeça.</h3>
            <p>O dashboard transforma o pipeline em uma leitura rápida: volume por etapa, distribuição e pendências ficam disponíveis para orientar o próximo bloco administrativo.</p>
            <p className="demo-disclaimer">Os números visíveis na tela são exclusivamente registros do ambiente demo.</p>
          </div>
          <figure className="product-figure">
            <div className="product-frame">
              <Image
                className="product-image"
                src="/product/loomie-dashboard.webp"
                alt="Dashboard do Loomie com métricas geradas por registros fictícios do ambiente demonstrativo"
                width={1000}
                height={723}
                sizes="(max-width: 760px) 94vw, 620px"
              />
            </div>
          </figure>
        </article>

        <div className="midpage-cta">
          <div>
            <span className="section-label">Seu fluxo</span>
            <strong>Quer ver essas etapas aplicadas ao seu consultório?</strong>
          </div>
          <TrackedLink className="button button-large" href="#demo" eventName="cta_click_midpage">
            Quero ver esse fluxo no meu consultório
            <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
