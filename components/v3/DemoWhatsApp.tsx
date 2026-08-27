export function DemoWhatsApp() {
  return (
    <aside className="v3-whatsapp" aria-label="Demonstração visual de uma mensagem administrativa fictícia">
      <div className="v3-whatsapp__topline">
        <span className="v3-demo-label">Demonstração visual</span>
        <span className="v3-whatsapp__status" aria-hidden="true">online</span>
      </div>
      <div className="v3-whatsapp__identity">
        <span className="v3-whatsapp__avatar" aria-hidden="true">AR</span>
        <div>
          <strong>Novo contato</strong>
          <small>WhatsApp administrativo</small>
        </div>
      </div>
      <div className="v3-whatsapp__message">
        <p>Oi, gostaria de saber os horários disponíveis.</p>
        <span>14:32</span>
      </div>
      <div className="v3-leora-state">
        <span className="v3-leora-state__spark" aria-hidden="true">✦</span>
        <span>Leora organizando</span>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </div>
    </aside>
  );
}
