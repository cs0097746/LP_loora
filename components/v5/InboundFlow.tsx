import { AdminMessage } from '@/components/v5/visual/AdminMessage';
import { AppointmentSlot } from '@/components/v5/visual/AppointmentSlot';
import { ContactObject } from '@/components/v5/visual/ContactObject';
import { Signal } from '@/components/v5/visual/Signal';
import { StatusLabel } from '@/components/v5/visual/StatusLabel';
import { V5_HERO, V5_INBOUND } from '@/content/v5';
import styles from '@/app/v5/v5.module.css';

export function InboundFlow() {
  return (
    <section className={styles.inbound} id="fluxo" aria-labelledby="v5-inbound-title" data-testid="v5-inbound">
      <div className={styles.shell}>
        <div className={styles.inboundGrid}>
          <div className={styles.sectionCopy}>
            <p className={styles.sectionEyebrow}>CONTEXTO · ESTADO · PRÓXIMO PASSO</p>
            <h2 id="v5-inbound-title">{V5_INBOUND.title}</h2>
            <p>
              O que chega deixa de depender de uma conversa solta e passa a ter contexto, estado e próximo passo.
            </p>
          </div>

          <div className={styles.inboundFlow} data-testid="v5-inbound-flow" aria-label="Exemplo ilustrativo do fluxo administrativo">
            <p className={styles.inboundLabel}>EXEMPLO ILUSTRATIVO · DO CONTATO À AGENDA</p>
            <div className={styles.inboundRail} aria-hidden="true" />

            <div className={styles.inboundNode} data-kind="mensagem">
              <span className={styles.inboundSignal} aria-hidden="true"><Signal active /></span>
              <small className={styles.inboundStep}>01 · mensagem</small>
              <AdminMessage time="09:12">{V5_HERO.message}</AdminMessage>
            </div>

            <div className={styles.inboundNode} data-kind="contato">
              <span className={styles.inboundSignal} aria-hidden="true"><Signal active /></span>
              <small className={styles.inboundStep}>02 · contato</small>
              <ContactObject name={V5_HERO.contactName} state="novo" />
            </div>

            <div className={styles.inboundNode} data-kind="proximo-passo">
              <span className={styles.inboundSignal} aria-hidden="true"><Signal active /></span>
              <small className={styles.inboundStep}>03 · próximo passo</small>
              <article className={styles.nextStepObject}>
                <div className={styles.objectTopline}>
                  <span>PRÓXIMO PASSO</span>
                  <StatusLabel state="proximo-passo" />
                </div>
                <strong>Ver horário disponível</strong>
                <small>rotina administrativa</small>
              </article>
            </div>

            <div className={styles.inboundNode} data-kind="agenda">
              <span className={styles.inboundSignal} aria-hidden="true"><Signal active /></span>
              <small className={styles.inboundStep}>04 · agenda</small>
              <AppointmentSlot time={V5_HERO.slot} state="confirmado" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
