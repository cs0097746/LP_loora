import { render, screen } from '@testing-library/react';
import { LeoraFlow } from '@/components/v3/LeoraFlow';

it('ends automation at human judgment', () => {
  render(<LeoraFlow />);

  ['Novo contato', 'Organizar', 'Confirmar', 'Lembrar', 'Sinalizar', 'Você decide'].forEach((label) => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  expect(screen.getByText(/avaliação, decisão e conduta clínica continuam humanas/i)).toBeInTheDocument();
  expect(screen.queryByText(/respiração|diagnóstico|crise tratada automaticamente/i)).not.toBeInTheDocument();
});
