function SceneShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="product-window">
      <div className="product-window-bar">
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>{label}</span>
        <span className="window-secure">loomie</span>
      </div>
      {children}
    </div>
  );
}

export function WhatsAppScene() {
  return (
    <SceneShell label="Conversas">
      <div className="scene scene-chat">
        <aside className="chat-sidebar" aria-hidden="true">
          <strong>Conversas</strong>
          <span className="fake-search" />
          <div className="fake-contact active"><i>MC</i><span><b>Marina C.</b><small>Novo contato</small></span></div>
          <div className="fake-contact"><i>RS</i><span><b>Rafael S.</b><small>Confirmação</small></span></div>
          <div className="fake-contact"><i>AC</i><span><b>Ana C.</b><small>Follow-up</small></span></div>
        </aside>
        <div className="chat-thread">
          <div className="thread-title"><strong>Marina C.</strong><span>WhatsApp conectado</span></div>
          <div className="bubble incoming">Oi, vi seu perfil e queria saber como funciona o atendimento.</div>
          <div className="system-chip">Contato criado · Triagem inicial</div>
          <div className="bubble outgoing">Olá, Marina. Posso organizar algumas informações e te mostrar os próximos horários disponíveis.</div>
        </div>
      </div>
    </SceneShell>
  );
}

export function PipelineScene() {
  const cols = [
    ['Triagem inicial', ['Marina C.', 'Luiza A.']],
    ['Fila de espera', ['Carlos M.']],
    ['Em tratamento', ['Rafael S.', 'Ana C.']],
  ] as const;
  return (
    <SceneShell label="Pipeline do consultório">
      <div className="scene scene-pipeline">
        {cols.map(([title, names]) => (
          <div className="kanban-col" key={title}>
            <div className="kanban-title"><strong>{title}</strong><span>{names.length}</span></div>
            {names.map((name, index) => (
              <div className="kanban-card" key={name}>
                <b>{name}</b>
                <small>{index === 0 ? 'WhatsApp · hoje' : 'Próxima ação registrada'}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SceneShell>
  );
}

export function SchedulingScene() {
  return (
    <SceneShell label="Agenda e confirmação">
      <div className="scene scene-schedule">
        <div className="calendar-mini">
          <div className="calendar-head"><strong>Terça, 25 ago.</strong><span>Agenda</span></div>
          <div className="appointment"><time>14:30</time><div><b>Sessão em andamento</b><small>até 15:20</small></div><span className="status-blue">agora</span></div>
          <div className="appointment"><time>16:00</time><div><b>Rafael S.</b><small>confirmado pelo WhatsApp</small></div><span className="status-green">confirmado</span></div>
          <div className="appointment"><time>17:00</time><div><b>Horário disponível</b><small>enviado para novo contato</small></div><span className="status-violet">ofertado</span></div>
        </div>
      </div>
    </SceneShell>
  );
}

export function BillingScene() {
  return (
    <SceneShell label="Administrativo financeiro">
      <div className="scene scene-billing">
        <div className="billing-rule">
          <span className="rule-icon">↻</span>
          <div><small>REGRA ADMINISTRATIVA</small><strong>Consulta realizada → acompanhar pagamento</strong></div>
        </div>
        <div className="billing-flow" aria-hidden="true">
          <div><span>1</span><b>Consulta registrada</b><small>18 ago.</small></div>
          <i>→</i>
          <div><span>2</span><b>Lembrete enviado</b><small>WhatsApp</small></div>
          <i>→</i>
          <div><span>3</span><b>Status atualizado</b><small>no CRM</small></div>
        </div>
      </div>
    </SceneShell>
  );
}
