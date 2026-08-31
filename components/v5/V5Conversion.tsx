import { LeadForm } from '@/components/LeadForm';
import baseStyles from '@/app/v5/v5.module.css';
import styles from '@/app/v5/v5-conversion.module.css';

export function V5Conversion() {
  return (
    <section className={styles.conversion} id="demo" aria-labelledby="v5-conversion-title" data-testid="v5-conversion">
      <div className={baseStyles.shell}>
        <div className={styles.conversionGrid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>UMA DEMONSTRAÇÃO · NA SUA ROTINA</p>
            <h2 id="v5-conversion-title">Você cuida da sessão. A Loomie ajuda a manter o restante em ordem.</h2>
            <p>
              A demonstração parte da sua rotina administrativa para mostrar como contatos, horários, confirmações e próximos passos podem ganhar contexto e estado sem disputar sua atenção clínica.
            </p>
          </div>

          <div className={styles.formShell}>
            <p className={styles.formLabel}>
              <strong>CONHECER A LOOMIE</strong>
              <span>não envie informações clínicas de pacientes</span>
            </p>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
