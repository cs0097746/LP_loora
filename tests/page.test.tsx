import { render, screen, within } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page V5 home cutover', () => {
  it('serves the complete V5 narrative from the production home route', () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua atenção está na sessão\. a rotina continua acontecendo\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('v5-pressure')).toBeInTheDocument();
    expect(screen.getByTestId('v5-inbound')).toBeInTheDocument();
    expect(screen.getByTestId('v5-week')).toBeInTheDocument();
    expect(screen.getByTestId('v5-proof-kanban')).toHaveAttribute('src', '/product-v4/kanban-left.webp');
    expect(screen.getByTestId('v5-proof-history')).toHaveAttribute('src', '/product-v4/contact-history.webp');

    expect(screen.getByRole('heading', { name: /leora: uma fronteira clara\./i })).toBeInTheDocument();
    expect(screen.getAllByText(/avaliação, decisão e conduta clínica continuam com você/i).length).toBeGreaterThanOrEqual(1);

    const endOfDay = screen.getByTestId('v5-end-of-day');
    expect(within(endOfDay).getByText('EXEMPLO ILUSTRATIVO')).toBeInTheDocument();

    expect(container.querySelector('#demo')).not.toBeNull();
    expect(screen.getByRole('button', { name: /quero ver a loomie na minha rotina/i })).toBeInTheDocument();
  });

  it('keeps real product proof distinct from illustrative examples and avoids unsupported claims', () => {
    const { container } = render(<HomePage />);

    expect(screen.getAllByText('CAPTURA REAL DO PRODUTO')).toHaveLength(2);
    expect(screen.getAllByText(/EXEMPLO ILUSTRATIVO/i).length).toBeGreaterThanOrEqual(2);
    expect(container.textContent).not.toMatch(
      /100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas|\d+% de economia/i,
    );
  });
});
