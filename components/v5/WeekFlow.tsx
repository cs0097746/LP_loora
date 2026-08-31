'use client';

import { useEffect, useState } from 'react';
import { StatusLabel } from '@/components/v5/visual/StatusLabel';
import baseStyles from '@/app/v5/v5.module.css';
import styles from '@/app/v5/v5-week.module.css';

const DAYS = [
  { day: 'SEG', date: '02', entries: ['09:00 · Sessão', '14:30 · Sessão'] },
  { day: 'TER', date: '03', entries: ['11:00 · Retorno', '16:00 · Sessão'] },
  { day: 'QUA', date: '04', entries: ['10:30 · Sessão', '16:30 · Marina'] },
  { day: 'QUI', date: '05', entries: ['09:30 · Sessão', '15:00 · Sessão'] },
  { day: 'SEX', date: '06', entries: ['10:00 · Sessão', '13:30 · Retorno'] },
] as const;

export function WeekFlow() {
  const [settled, setSettled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const finalState = reduceMotion || settled;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduceMotion(media.matches);

    syncPreference();
    media.addEventListener?.('change', syncPreference);
    return () => media.removeEventListener?.('change', syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || settled) return;

    const timer = window.setTimeout(() => setSettled(true), 1_800);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, settled]);

  return (
    <section className={styles.weekSection} id="semana" aria-labelledby="v5-week-title">
      <div className={baseStyles.shell}>
        <div className={styles.weekIntro}>
          <p className={styles.eyebrow}>UMA SEMANA · MENOS COISAS NA CABEÇA</p>
          <h2 id="v5-week-title">Sua semana não deveria morar na sua cabeça.</h2>
          <p>
            Horários, confirmações e próximos passos podem ocupar um lugar visível — sem depender da sua memória entre um atendimento e outro.
          </p>
        </div>

        <div
          className={styles.weekBoard}
          data-testid="v5-week"
          data-state={finalState ? 'settled' : 'pending'}
          aria-label="Exemplo ilustrativo de uma semana organizada"
        >
          <div className={styles.weekTopline}>
            <span>EXEMPLO ILUSTRATIVO</span>
            <small>agenda administrativa · semana 02–06</small>
          </div>

          <div className={styles.days}>
            {DAYS.map((item) => (
              <article className={styles.day} key={item.day}>
                <header>
                  <span>{item.day}</span>
                  <strong>{item.date}</strong>
                </header>
                <div className={styles.dayEntries}>
                  {item.entries.map((entry, index) => {
                    const isTrackedSlot = item.day === 'QUA' && index === 1;
                    return (
                      <div className={`${styles.entry} ${isTrackedSlot ? styles.trackedEntry : ''}`} key={entry}>
                        <span>{entry}</span>
                        {isTrackedSlot ? (
                          <StatusLabel state={finalState ? 'confirmado' : 'aguardando'} />
                        ) : (
                          <small>agenda</small>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <p className={styles.weekNote} aria-live="polite">
            {finalState
              ? 'Qua · 16:30 · confirmação registrada; a agenda fica atualizada.'
              : 'Qua · 16:30 · aguardando confirmação; o estado continua visível.'}
          </p>
        </div>
      </div>
    </section>
  );
}
