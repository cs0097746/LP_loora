import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page V2', () => {
  it('leads with real product proof and the new operational proposition', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua clínica continua andando enquanto você está em sessão/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole('img', { name: /kanban do loomie/i }).length,
    ).toBeGreaterThanOrEqual(2);

    expect(
      screen.getByRole('heading', {
        name: /quando você volta para o contato, o contexto ainda está lá/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /a leora cuida do repetitivo/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /veja o que está acontecendo sem reconstruir sua rotina de cabeça/i,
      }),
    ).toBeInTheDocument();
  });

  it('keeps conversion paths and avoids unsupported marketing claims', () => {
    render(<HomePage />);

    expect(
      screen.getAllByRole('link', {
        name: /ver uma demonstração|ver a loomie na minha rotina/i,
      }).length,
    ).toBeGreaterThanOrEqual(2);

    expect(
      screen.getByRole('link', { name: /quero ver esse fluxo no meu consultório/i }),
    ).toHaveAttribute('href', '#demo');

    expect(
      screen.queryByText(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas/i),
    ).not.toBeInTheDocument();
  });
});
