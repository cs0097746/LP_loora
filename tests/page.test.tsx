import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page', () => {
  it('renders the Loomie psychology headline', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /enquanto você atende, sua clínica continua funcionando/i,
      }),
    ).toBeInTheDocument();
  });
});
