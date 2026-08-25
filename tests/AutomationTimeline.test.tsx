import { render, screen } from '@testing-library/react';
import { AutomationTimeline } from '@/components/AutomationTimeline';

describe('AutomationTimeline', () => {
  it('shows administrative activity without a clinical intervention claim', () => {
    render(<AutomationTimeline />);
    expect(screen.getByText('Novo contato chegou pelo WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Consulta confirmada')).toBeInTheDocument();
    expect(screen.queryByText(/crise|diagnóstico|terapia automática/i)).not.toBeInTheDocument();
  });
});
