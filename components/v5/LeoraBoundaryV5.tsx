import baseStyles from '@/app/v5/v5.module.css';
import styles from '@/app/v5/v5-sections.module.css';

export function LeoraBoundaryV5() {
  return (
    <section className={styles.boundary} id="leora" aria-labelledby="v5-leora-title" data-testid="v5-leora">
      <div className={baseStyles.shell}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>LEORA · ADMINISTRATIVO COM FRONTEIRA</p>
          <h2 id="v5-leora-title">Leora: uma fronteira clara.</h2>
          <p>
            A Leora ajuda nas rotinas administrativas configuradas no Loomie e sinaliza quando o próximo passo exige você.
          </p>
        </div>

        <div className={styles.boundaryGrid}>
          <div className={styles.boundaryColumn}>
            <span className={styles.boundaryLabel}>ONDE A ROTINA PODE AJUDAR</span>
            <h3>Organizar o administrativo sem transformar automação em julgamento.</h3>
            <div className={styles.adminActions} aria-label="Exemplos de ações administrativas">
              <span>organizar</span>
              <span>confirmar</span>
              <span>lembrar</span>
              <span>sinalizar</span>
            </div>
            <p>São rotinas administrativas configuradas para dar visibilidade a contexto, estado e próximo passo.</p>
          </div>

          <div className={styles.boundaryLine} aria-hidden="true" />

          <div className={styles.boundaryColumn}>
            <span className={styles.boundaryLabel}>ONDE COMEÇA O PROFISSIONAL</span>
            <h3>O sistema pode organizar. O julgamento profissional não é terceirizado.</h3>
            <p className={styles.humanStatement}>Avaliação, decisão e conduta clínica continuam com você.</p>
            <p>O fluxo administrativo termina onde começa o julgamento profissional. A Leora não diagnostica, não decide conduta terapêutica e não substitui atendimento.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
