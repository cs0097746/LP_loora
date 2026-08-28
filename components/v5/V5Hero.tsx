import { TrackedLink } from '@/components/TrackedLink';
import { V5_HERO } from '@/content/v5';
import { AdminMessage } from '@/components/v5/visual/AdminMessage';
import { AppointmentSlot } from '@/components/v5/visual/AppointmentSlot';
import { ContactObject } from '@/components/v5/visual/ContactObject';
import { Signal } from '@/components/v5/visual/Signal';
import { StatusLabel } from '@/components/v5/visual/StatusLabel';
import { Thread } from '@/components/v5/visual/Thread';
import styles from '@/app/v5/v5.module.css';
import flowStyles from '@/app/v5/v5-flow.module.css';

export function V5Hero() {
  return (
    <section className={styles.hero} id="v5-top" aria-labelledby="v5-hero-title" data-testid="v5-hero">
      <div className={styles.shell}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{V5_HERO.eyebrow}</p>
            <h1 id="v5-hero-title">{V5_HERO.title}</h1>
            <p className={styles.heroBody}>{V5_HERO.body}</p>
            <TrackedLink className={styles.primaryAction} href="/#demo" eventName="v5_hero_cta_click">
              {V5_HERO.cta}
              <span aria-hidden="true">↗</span>
            </TrackedLink>
          </div>

          <div
            className={styles.heroStage}
            data-testid="v5-hero-stage"
            aria-label="Exemplo ilustrativo de uma rotina administrativa organizada"
          >
            <p className={styles.stageLabel}>EXEMPLO ILUSTRATIVO · UMA ROTINA EM MOVIMENTO</p>

            <div className={flowStyles.heroFlow}>
              <div className={flowStyles.flowThread} aria-hidden="true">
                <Thread direction="vertical" active />
              </div>

              <div className={`${flowStyles.flowNode} ${flowStyles.flowSession}`} data-testid="v5-session">
                <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active /></span>
                <div className={styles.sessionRail}>
                  <span>{V5_HERO.session}</span>
                  <small>você está atendendo</small>
                </div>
              </div>

              <div className={`${flowStyles.flowNode} ${flowStyles.flowMessage}`} data-testid="v5-message">
                <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal /></span>
                <AdminMessage time={V5_HERO.messageTime}>{V5_HERO.message}</AdminMessage>
              </div>

              <div className={`${flowStyles.flowNode} ${flowStyles.flowContact}`} data-testid="v5-contact">
                <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active /></span>
                <ContactObject name={V5_HERO.contactName} state="novo" />
              </div>

              <div className={`${flowStyles.flowNode} ${flowStyles.flowNextStep}`} data-testid="v5-next-step">
                <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active /></span>
                <article className={styles.nextStepObject}>
                  <div className={styles.objectTopline}>
                    <span>PRÓXIMO PASSO</span>
                    <StatusLabel state="proximo-passo" />
                  </div>
                  <strong>Ver horário disponível</strong>
                  <small>rotina administrativa</small>
                </article>
              </div>

              <div className={`${flowStyles.flowNode} ${flowStyles.flowSlot}`} data-testid="v5-slot">
                <span className={`${styles.nodeSignal} ${flowStyles.nodeSignal}`} aria-hidden="true"><Signal active /></span>
                <AppointmentSlot time={V5_HERO.slot} state="confirmado" />
              </div>
            </div>

            <div className={styles.stageFooter} aria-hidden="true">
              <span>14:00</span>
              <i />
              <span>14:50</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
