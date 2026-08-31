import { render, screen, within } from '@testing-library/react';
import V5Page from '@/app/v5/page';

it('completes the V5 narrative with real proof, clear boundaries and the existing lead flow', () => {
  const { container } = render(<V5Page />);

  expect(screen.getByRole('heading', { name: /sua semana não deveria morar na sua cabeça\./i })).toBeVisible();
  const week = screen.getByTestId('v5-week');
  expect(week).toHaveTextContent(/seg/i);
  expect(week).toHaveTextContent(/ter/i);
  expect(week).toHaveTextContent(/qua/i);
  expect(week).toHaveTextContent(/qui/i);
  expect(week).toHaveTextContent(/sex/i);
  expect(week).toHaveTextContent(/aguardando|confirmado/i);

  expect(screen.getByRole('heading', { name: /o produto de verdade\./i })).toBeVisible();
  expect(screen.getByTestId('v5-proof-kanban')).toHaveAttribute('src', '/product-v4/kanban-left.webp');
  expect(screen.getByTestId('v5-proof-history')).toHaveAttribute('src', '/product-v4/contact-history.webp');
  expect(screen.getAllByText('CAPTURA REAL DO PRODUTO')).toHaveLength(2);

  expect(screen.getByRole('heading', { name: /leora: uma fronteira clara\./i })).toBeVisible();
  expect(screen.getByText('A Leora ajuda nas rotinas administrativas configuradas no Loomie e sinaliza quando o próximo passo exige você.')).toBeVisible();
  expect(screen.getByText(/avaliação, decisão e conduta clínica continuam com você/i)).toBeVisible();

  const endOfDay = screen.getByTestId('v5-end-of-day');
  expect(within(endOfDay).getByRole('heading', { name: /o último atendimento não deveria marcar o início da sua segunda jornada\./i })).toBeVisible();
  expect(within(endOfDay).getByText('EXEMPLO ILUSTRATIVO')).toBeVisible();

  expect(screen.getByRole('heading', { name: /você cuida da sessão\. a loomie ajuda a manter o restante em ordem\./i })).toBeVisible();
  expect(container.querySelector('#demo')).not.toBeNull();
  expect(screen.getByRole('button', { name: /quero ver a loomie na minha rotina/i })).toBeVisible();

  expect(container.textContent).not.toMatch(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas|\d+% de economia/i);
});
