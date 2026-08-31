import { V5_PRESSURE_ITEMS } from '@/content/v5';
import styles from '@/app/v5/v5.module.css';

const PRESSURE_TIMES = ['14:52', '14:54', '14:56', '14:58', '15:00'] as const;

export function InterSessionPressure() {
  return (
    <section className={styles.pressure} id="entre-sessoes" aria-labelledby="v5-pressure-title" data-testid="v5-pressure">
      <div className={styles.shell}>
        <div className={styles.pressureGrid}>
          <div className={styles.sectionCopy}>
            <p className={styles.sectionEyebrow}>ENTRE SESSÕES · O ACÚMULO</p>
            <h2 id="v5-pressure-title">Entre uma sessão e outra, dez minutos viram vinte pequenas decisões.</h2>
            <p>
              O intervalo que deveria devolver contexto para o próximo atendimento pode virar uma fila de retornos,
              confirmações e encaixes que precisam continuar na cabeça.
            </p>
          </div>

          <ol className={styles.pressureFragments} aria-label="Exemplos de pequenas decisões administrativas">
            {V5_PRESSURE_ITEMS.map((item, index) => (
              <li className={styles.pressureItem} key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
                <time>{PRESSURE_TIMES[index]}</time>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
