import baseStyles from '@/app/v5/v5.module.css';
import styles from '@/app/v5/v5-sections.module.css';

const ROWS = [
  { time: '18:12', label: 'Novo contato organizado', state: 'novo' },
  { time: '18:16', label: 'Confirmação registrada', state: 'confirmado' },
  { time: '18:20', label: 'Próximo passo visível', state: 'próximo passo' },
] as const;

export function EndOfDay() {
  return (
    <section className={styles.endOfDay} id="fim-do-dia" aria-labelledby="v5-end-title" data-testid="v5-end-of-day">
      <div className={baseStyles.shell}>
        <div className={styles.endGrid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>FIM DO DIA · O QUE FICA VISÍVEL</p>
            <h2 id="v5-end-title">O último atendimento não deveria marcar o início da sua segunda jornada.</h2>
            <p>
              Quando o administrativo tem contexto, estado e próximo passo visível, o fim do dia não precisa começar por reconstruir mentalmente tudo o que aconteceu entre sessões.
            </p>
          </div>

          <div className={styles.ledger} aria-label="Exemplo ilustrativo de fechamento administrativo">
            <span className={styles.ledgerLabel}>EXEMPLO ILUSTRATIVO</span>
            {ROWS.map((row) => (
              <div className={styles.ledgerRow} key={row.time}>
                <time className={styles.ledgerTime}>{row.time}</time>
                <strong>{row.label}</strong>
                <span className={styles.ledgerState} data-state={row.state}>{row.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
