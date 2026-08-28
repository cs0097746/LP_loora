'use client';

import { useEffect, useState } from 'react';
import { V5_HERO } from '@/content/v5';
import { AdminMessage } from '@/components/v5/visual/AdminMessage';
import { AppointmentSlot } from '@/components/v5/visual/AppointmentSlot';
import { ContactObject } from '@/components/v5/visual/ContactObject';
import { Signal } from '@/components/v5/visual/Signal';
import { StatusLabel } from '@/components/v5/visual/StatusLabel';
import { Thread } from '@/components/v5/visual/Thread';
import styles from '@/app/v5/v5.module.css';
import flowStyles from '@/app/v5/v5-flow.module.css';

const PHASES = ['session', 'message', 'contact', 'next-step', 'slot', 'confirmed'] as const;
const STEP_DELAYS = [1_200, 1_400, 1_300, 1_300, 1_300] as const;

type HeroPhase = (typeof PHASES)[number];

export function HeroSequence() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const phase: HeroPhase = PHASES[phaseIndex];

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReduceMotion(media.matches);

    syncPreference();
    media.addEventListener?.('change', syncPreference);
    return () => media.removeEventListener?.('change', syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setPhaseIndex(PHASES.length - 1);
      return;
    }

    if (phaseIndex >= PHASES.length - 1) return;

    const timer = window.setTimeout(() => {
      setPhaseIndex((current) => Math.min(current + 1, PHASES.length - 1));
    }, STEP_DELAYS[phaseIndex]);

    return () => window.clearTimeout(timer);
  }, [phaseIndex, reduceMotion]);

  const messageActive = phaseIndex >= 1;
  const contactActive = phaseIndex >= 2;
  const nextStepActive = phaseIndex >= 3;
  const slotActive = phaseIndex >= 4;
  const confirmed = phaseIndex >= 5;

  return (
    <div className={flowStyles.heroFlow} data-testid="v5-hero-sequence" data-phase={phase}>
      <div className={flowStyles.flowThread} aria-hidden="true">
        <Thread direction="vertical" active />
      </div>

      <div className={`${flowStyles.flowNode} ${flowStyles.flowSession}`} data-testid="v5-session" data-active="true">
        <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active /></span>
        <div className={styles.sessionRail}>
          <span>{V5_HERO.session}</span>
          <small>você está atendendo</small>
        </div>
      </div>

      <div className={`${flowStyles.flowNode} ${flowStyles.flowMessage}`} data-testid="v5-message" data-active={messageActive}>
        <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active={messageActive} /></span>
        <AdminMessage time={V5_HERO.messageTime}>{V5_HERO.message}</AdminMessage>
      </div>

      <div className={`${flowStyles.flowNode} ${flowStyles.flowContact}`} data-testid="v5-contact" data-active={contactActive}>
        <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active={contactActive} /></span>
        <ContactObject name={V5_HERO.contactName} state="novo" />
      </div>

      <div className={`${flowStyles.flowNode} ${flowStyles.flowNextStep}`} data-testid="v5-next-step" data-active={nextStepActive}>
        <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active={nextStepActive} /></span>
        <article className={styles.nextStepObject}>
          <div className={styles.objectTopline}>
            <span>PRÓXIMO PASSO</span>
            <StatusLabel state="proximo-passo" />
          </div>
          <strong>Ver horário disponível</strong>
          <small>rotina administrativa</small>
        </article>
      </div>

      <div
        className={`${flowStyles.flowNode} ${flowStyles.flowSlot}`}
        data-testid="v5-slot"
        data-active={slotActive}
        data-confirmed={confirmed}
      >
        <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active={confirmed} /></span>
        <AppointmentSlot time={V5_HERO.slot} state="confirmado" />
      </div>
    </div>
  );
}
