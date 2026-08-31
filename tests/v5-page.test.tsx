import { render, screen } from '@testing-library/react';
import V5Page from '@/app/v5/page';

describe('Loomie V5 milestone route', () => {
  it('opens with the psychologist-routine thesis and keeps claims bounded', () => {
    render(<V5Page />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua atenção está na sessão\. a rotina continua acontecendo\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /ver a loomie na minha rotina/i })).toHaveAttribute('href', '/#demo');
    expect(
      screen.queryByText(/pix|recibo|100% lgpd|certificad[oa] pelo cfp|diagnóstico automático|20 horas economizadas/i),
    ).not.toBeInTheDocument();
  });
});
