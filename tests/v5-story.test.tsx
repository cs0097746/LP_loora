import { render, screen } from '@testing-library/react';
import V5Page from '@/app/v5/page';

it('changes rhythm between recognition and system explanation', () => {
  render(<V5Page />);

  expect(screen.getByRole('heading', { name: /dez minutos viram vinte pequenas decisões/i })).toBeVisible();
  expect(screen.getByText('confirmar amanhã')).toBeVisible();
  expect(screen.getByText('responder novo contato')).toBeVisible();
  expect(screen.getByRole('heading', { name: /uma coisa chega\. ela sabe para onde ir\./i })).toBeVisible();
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/mensagem/i);
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/contato/i);
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/próximo passo/i);
  expect(screen.getByTestId('v5-inbound-flow')).toHaveTextContent(/agenda/i);
});
