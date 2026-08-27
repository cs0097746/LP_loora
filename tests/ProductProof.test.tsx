import { render, screen } from '@testing-library/react';
import { ProductProof } from '@/components/v3/ProductProof';

it('uses authentic demo surfaces instead of generic feature cards', () => {
  render(<ProductProof />);

  expect(screen.getByRole('img', { name: /histórico administrativo/i })).toHaveAttribute('src', '/product/loomie-contact-history.webp');
  expect(screen.getByRole('img', { name: /gatilhos administrativos/i })).toHaveAttribute('src', '/product/loomie-automations.webp');
  expect(screen.getByRole('img', { name: /tarefa administrativa/i })).toHaveAttribute('src', '/product/loomie-tasks.webp');
  expect(screen.getByText(/você não precisa lembrar onde aquela conversa parou/i)).toBeInTheDocument();
});
