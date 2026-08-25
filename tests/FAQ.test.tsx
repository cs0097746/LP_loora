import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQ } from '@/components/FAQ';

describe('FAQ', () => {
  it('expands a question with an accessible native disclosure', async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const summary = screen.getByText('A Loomie substitui meu atendimento?');
    const details = summary.closest('details');
    expect(details).not.toHaveAttribute('open');
    await user.click(summary);
    expect(details).toHaveAttribute('open');
    expect(screen.getByText(/não substitui psicoterapia/i)).toBeInTheDocument();
  });
});
