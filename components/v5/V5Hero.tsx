import { TrackedLink } from '@/components/TrackedLink';
import { HeroSequence } from '@/components/v5/HeroSequence';
import { V5_HERO } from '@/content/v5';
import styles from '@/app/v5/v5.module.css';

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
            <HeroSequence />

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
