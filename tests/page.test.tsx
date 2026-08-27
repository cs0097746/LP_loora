import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page V3', () => {
  it('leads with real product proof and an editorial operational story', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua clínica continua andando enquanto você está em sessão/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('hero-crm-image')).toHaveAttribute('src', '/product/loomie-kanban.webp');
    expect(screen.getAllByText(/demonstração visual/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/leora organizando/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'WhatsApp organizado.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /o operacional não precisa esperar você terminar a sessão/i })).toBeInTheDocument();
    expect(screen.getAllByText(/14:32/).length).toBeGreaterThanOrEqual(1);

    expect(
      screen.getByRole('heading', {
        name: /quando você volta para o contato, o contexto ainda está lá/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /a leora cuida do repetitivo/i }),
    ).toBeInTheDocument();
  });

  it('keeps conversion paths and avoids unsupported marketing claims', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /ver a loomie funcionando/i })).toHaveAttribute('href', '#demo');

    expect(
      screen.getByRole('link', { name: /quero ver esse fluxo no meu consultório/i }),
    ).toHaveAttribute('href', '#demo');

    expect(
      screen.queryByText(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas/i),
    ).not.toBeInTheDocument();
  });
});
