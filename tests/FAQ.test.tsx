import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQ } from '@/components/FAQ';

describe('FAQ', () => {
  it('expands a question and tracks the opened doubt', async () => {
    const user = userEvent.setup();
    window.dataLayer = [];
    render(<FAQ />);

    const summary = screen.getByText('A Loomie substitui meu atendimento?');
    const details = summary.closest('details');
    expect(details).not.toHaveAttribute('open');

    await user.click(summary);

    expect(details).toHaveAttribute('open');
    expect(screen.getByText(/não substitui psicoterapia/i)).toBeInTheDocument();
    expect(window.dataLayer).toContainEqual({
      event: 'faq_open',
      question: 'A Loomie substitui meu atendimento?',
    });
  });
});
