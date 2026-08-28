const faq = [
  ['A Leora toma decisões clínicas por mim?', 'Não. A Leora atua no operacional: organiza rotinas administrativas, executa fluxos configurados e sinaliza o que precisa da sua atenção. Avaliação, decisão e conduta clínica continuam com você.'],
  ['Preciso mudar toda a minha rotina para usar a Loomie?', 'A proposta é mapear o fluxo que você já tem e organizar o operacional em etapas claras. A configuração deve partir da realidade do consultório, não obrigar uma reinvenção completa do atendimento.'],
  ['O que dá para automatizar no administrativo?', 'Rotinas como organização de contatos, confirmações, lembretes, tarefas e follow-ups podem ser configuradas conforme o fluxo do consultório e as funcionalidades disponíveis no produto.'],
  ['Como funciona a demonstração?', 'A demonstração mostra o produto e conversa sobre o seu fluxo atual. O objetivo é identificar onde a Loomie pode organizar o operacional sem transformar o contato comercial em coleta de informações clínicas de pacientes.'],
] as const;

export function V4FAQ() {
  return (
    <section className="v4-faq" id="faq" aria-labelledby="v4-faq-title">
      <div className="shell v4-faq__grid">
        <div className="v4-faq__intro">
          <p className="v4-kicker">Perguntas frequentes</p>
          <h2 id="v4-faq-title">O que costuma importar antes de ver a Loomie funcionando.</h2>
        </div>
        <div className="v4-faq__items">
          {faq.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<i aria-hidden="true">+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
