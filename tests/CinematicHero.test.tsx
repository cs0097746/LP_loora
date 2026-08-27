import { render, screen } from '@testing-library/react';
import { CinematicHero } from '@/components/v3/CinematicHero';

describe('CinematicHero', () => {
  it('presents real product proof with an explicitly demonstrative administrative flow', () => {
    render(<CinematicHero />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua clínica continua andando enquanto você está em sessão/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/oi, gostaria de saber os horários disponíveis/i)).toBeInTheDocument();
    expect(screen.getByText(/leora organizando/i)).toBeInTheDocument();
    expect(screen.getAllByText(/demonstração visual/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId('hero-crm-image')).toHaveAttribute('src', '/product/loomie-kanban.webp');
    expect(screen.getByRole('link', { name: /ver a loomie funcionando/i })).toHaveAttribute('href', '#demo');
    expect(screen.getByRole('link', { name: /acessar o crm/i })).toHaveAttribute('href', 'https://crm.loomiecrm.com/');
  });

  it('does not imply clinical automation', () => {
    render(<CinematicHero />);

    expect(screen.queryByText(/diagnóstico|terapia automática|respiração|conduta clínica automática/i)).not.toBeInTheDocument();
  });
});
