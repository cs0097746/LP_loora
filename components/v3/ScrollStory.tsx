'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { storySteps, type StoryScene } from './story-data';

function StoryStage({ active }: { active: StoryScene }) {
  return (
    <div className="v3-story-stage" data-active-scene={active} aria-label="Demonstração visual da jornada administrativa no Loomie">
      <div className="v3-story-stage__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <small>Jornada administrativa · ambiente demo</small>
      </div>

      <div className="v3-story-scene v3-story-scene--contact" data-scene="contact">
        <Image
          className="v3-story-scene__kanban"
          src="/product/loomie-kanban.webp"
          alt="Kanban demonstrativo do Loomie com contatos fictícios"
          width={1000}
          height={439}
          unoptimized
        />
        <div className="v3-story-message" aria-hidden="true">
          <span>WhatsApp · 14:32</span>
          <p>Oi, gostaria de saber os horários disponíveis.</p>
        </div>
        <div className="v3-story-beacon v3-story-beacon--new" aria-hidden="true">novo contato</div>
      </div>

      <div className="v3-story-scene v3-story-scene--kanban" data-scene="kanban">
        <Image
          className="v3-story-scene__kanban v3-story-scene__kanban--zoom"
          src="/product/loomie-kanban.webp"
          alt="Kanban real do ambiente demonstrativo do Loomie"
          width={1000}
          height={439}
          unoptimized
        />
        <div className="v3-story-focus-card" aria-hidden="true">
          <span>contexto registrado</span>
          <strong>Ana Ribeiro</strong>
          <small>Primeiro contato pelo WhatsApp</small>
        </div>
      </div>

      <div className="v3-story-scene v3-story-scene--progress" data-scene="progress">
        <Image
          className="v3-story-scene__kanban v3-story-scene__kanban--progress"
          src="/product/loomie-kanban.webp"
          alt="Jornada administrativa no Kanban do Loomie"
          width={1000}
          height={439}
          unoptimized
        />
        <div className="v3-story-path" aria-hidden="true">
          <span>Novo contato</span>
          <i>→</i>
          <span>Aguardando horário</span>
          <i>→</i>
          <strong>Agendado</strong>
        </div>
      </div>

      <div className="v3-story-scene v3-story-scene--follow" data-scene="follow-up">
        <figure className="v3-story-task-card">
          <Image
            src="/product/loomie-tasks.webp"
            alt="Tarefa administrativa demonstrativa agendada no Loomie"
            width={900}
            height={339}
            unoptimized
          />
        </figure>
        <figure className="v3-story-trigger-card">
          <Image
            src="/product/loomie-automations.webp"
            alt="Gatilhos administrativos demonstrativos no Loomie"
            width={900}
            height={254}
            unoptimized
          />
        </figure>
        <div className="v3-story-follow-label" aria-hidden="true">follow-up organizado</div>
      </div>
    </div>
  );
}

function MobileScene({ scene }: { scene: StoryScene }) {
  if (scene === 'follow-up') {
    return (
      <div className="v3-story-mobile-media v3-story-mobile-media--stack">
        <Image src="/product/loomie-automations.webp" alt="Gatilhos administrativos demonstrativos no Loomie" width={900} height={254} unoptimized />
        <Image src="/product/loomie-tasks.webp" alt="Tarefa administrativa demonstrativa no Loomie" width={900} height={339} unoptimized />
      </div>
    );
  }

  return (
    <div className="v3-story-mobile-media">
      <Image src="/product/loomie-kanban.webp" alt="Kanban demonstrativo do Loomie" width={1000} height={439} unoptimized />
      <span aria-hidden="true">{scene === 'contact' ? 'mensagem → contato' : scene === 'kanban' ? 'contexto no Loomie' : 'próximo passo visível'}</span>
    </div>
  );
}

export function ScrollStory() {
  const [active, setActive] = useState<StoryScene>('contact');
  const seen = useRef(new Set<string>());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-story-step]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const scene = (visible.target as HTMLElement).dataset.scene as StoryScene | undefined;
        const stepId = (visible.target as HTMLElement).dataset.storyStep;
        if (!scene) return;
        setActive(scene);

        if (stepId && !seen.current.has(stepId)) {
          seen.current.add(stepId);
          track('story_step_view', { step: stepId });
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v3-story" aria-labelledby="v3-story-title">
      <div className="shell">
        <div className="v3-story__intro">
          <p className="v3-section-kicker">Enquanto você atende</p>
          <h2 id="v3-story-title">O operacional não precisa esperar você terminar a sessão.</h2>
          <p>Uma jornada administrativa simples, mostrada em ordem cronológica com dados totalmente fictícios.</p>
        </div>

        <div className="v3-story__layout">
          <div className="v3-story__steps">
            {storySteps.map((step) => (
              <article
                className="v3-story-step"
                data-story-step={step.id}
                data-scene={step.scene}
                aria-current={active === step.scene ? 'step' : undefined}
                key={step.id}
              >
                <div className="v3-story-step__time">{step.time}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <MobileScene scene={step.scene} />
              </article>
            ))}
          </div>
          <div className="v3-story__stage-wrap">
            <StoryStage active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
