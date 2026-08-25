import { timelineEvents } from '@/content/landing';

export function AutomationTimeline() {
  return (
    <div className="timeline-card" aria-label="Exemplo de tarefas acontecendo enquanto você está em sessão">
      <div className="timeline-topbar">
        <div>
          <span className="eyebrow-mono">SESSÃO EM ANDAMENTO</span>
          <strong>Enquanto você está atendendo</strong>
        </div>
        <span className="live-pill"><span aria-hidden="true" /> operação ativa</span>
      </div>

      <ol className="timeline-list">
        {timelineEvents.map((event, index) => (
          <li
            className={`timeline-event tone-${event.tone}`}
            key={`${event.time}-${event.text}`}
            style={{ '--event-index': index } as React.CSSProperties}
          >
            <time>{event.time}</time>
            <span className="timeline-dot" aria-hidden="true" />
            <span className="timeline-copy">{event.text}</span>
          </li>
        ))}
      </ol>

      <div className="timeline-footer">
        <span>Você continua na sessão.</span>
        <strong>A rotina continua organizada.</strong>
      </div>
    </div>
  );
}
