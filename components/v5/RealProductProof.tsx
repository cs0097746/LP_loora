import baseStyles from '@/app/v5/v5.module.css';
import styles from '@/app/v5/v5-proof.module.css';

export function RealProductProof() {
  return (
    <section className={styles.proof} id="produto" aria-labelledby="v5-proof-title" data-testid="v5-proof">
      <div className={baseStyles.shell}>
        <div className={styles.proofIntro}>
          <p className={styles.eyebrow}>PROVA DE PRODUTO · SEM CENOGRAFIA</p>
          <h2 id="v5-proof-title">O produto de verdade.</h2>
          <p>
            Quando faz sentido mostrar interface, a gente mostra a interface real: organização de contatos e histórico administrativo em um ambiente demonstrativo.
          </p>
        </div>

        <div className={styles.proofStack}>
          <figure className={styles.proofFigure}>
            <figcaption className={styles.figureHead}>
              <div>
                <span>CAPTURA REAL DO PRODUTO</span>
                <strong>Contatos com estado visível</strong>
              </div>
              <small>ambiente demo · dados fictícios</small>
            </figcaption>
            <div className={styles.imageFrame}>
              <img
                data-testid="v5-proof-kanban"
                src="/product-v4/kanban-left.webp"
                width="1800"
                height="820"
                loading="lazy"
                alt="Kanban real do Loomie em ambiente demonstrativo com contatos fictícios em etapas administrativas"
              />
            </div>
            <p>Interface real do Loomie em ambiente demonstrativo, com dados fictícios. O quadro organiza contexto e etapas administrativas; não representa prontuário clínico.</p>
          </figure>

          <figure className={styles.proofFigure}>
            <figcaption className={styles.figureHead}>
              <div>
                <span>CAPTURA REAL DO PRODUTO</span>
                <strong>Histórico administrativo no mesmo contexto</strong>
              </div>
              <small>ambiente demo · dados fictícios</small>
            </figcaption>
            <div className={styles.imageFrame}>
              <img
                data-testid="v5-proof-history"
                src="/product-v4/contact-history.webp"
                width="1800"
                height="820"
                loading="lazy"
                alt="Tela real do Loomie mostrando histórico administrativo de um contato fictício no ambiente demonstrativo"
              />
            </div>
            <p>Captura real do ambiente demonstrativo do Loomie. O histórico mostrado é administrativo e usa dados fictícios; não é um registro clínico de paciente.</p>
          </figure>
        </div>
      </div>
    </section>
  );
}
