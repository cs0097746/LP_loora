import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LeadForm } from '@/components/LeadForm';

describe('LeadForm', () => {
  it('shows useful validation messages before sending', async () => {
    const user = userEvent.setup();
    render(<LeadForm />);

    await user.click(screen.getByRole('button', { name: /quero ver na minha rotina/i }));

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Informe um WhatsApp com DDD.')).toBeInTheDocument();
    expect(screen.getByText('Selecione uma faixa de atendimentos.')).toBeInTheDocument();
  });
});
