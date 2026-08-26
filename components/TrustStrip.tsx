const trustItems = [
  'Rotinas administrativas centralizadas',
  'Automação configurável',
  'Decisão clínica sempre humana',
] as const;

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Princípios da Loomie para psicólogos">
      <div className="shell trust-strip-inner">
        {trustItems.map((item, index) => (
          <div className="trust-item" key={item}>
            <span className="trust-index" aria-hidden="true">0{index + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
