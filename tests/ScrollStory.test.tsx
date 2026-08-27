import { render, screen } from '@testing-library/react';
import { ScrollStory } from '@/components/v3/ScrollStory';

it('contains the complete administrative story in chronological order', () => {
  render(<ScrollStory />);

  ['14:32', '14:33', '14:35', '14:40'].forEach((time) => {
    expect(screen.getAllByText(new RegExp(time)).length).toBeGreaterThanOrEqual(1);
  });

  expect(screen.getByText(/chegou um novo contato/i)).toBeInTheDocument();
  expect(screen.getByText(/o contexto entrou no loomie/i)).toBeInTheDocument();
  expect(screen.getByText(/o próximo passo ficou claro/i)).toBeInTheDocument();
  expect(screen.getByText(/o follow-up já está organizado/i)).toBeInTheDocument();
});
