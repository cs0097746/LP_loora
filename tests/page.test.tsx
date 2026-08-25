import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page', () => {
  it('presents the operational promise and primary conversion path', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /enquanto você atende, sua clínica continua funcionando/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole('link', { name: /ver a loomie funcionando/i }).length,
    ).toBeGreaterThanOrEqual(2);

    expect(
      screen.getByRole('heading', {
        name: /o que acontece entre uma sessão e outra/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/novo contato chegou pelo whatsapp/i),
    ).toBeInTheDocument();
  });
});
