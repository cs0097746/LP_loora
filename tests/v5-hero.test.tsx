import { render, screen } from '@testing-library/react';
import { V5Hero } from '@/components/v5/V5Hero';

it('explains the session-to-confirmation flow without a dashboard screenshot', () => {
  const { container } = render(<V5Hero />);

  expect(screen.getByTestId('v5-session')).toHaveTextContent('Sessão · 14:00–14:50');
  expect(screen.getByTestId('v5-message')).toHaveTextContent('14:17');
  expect(screen.getByTestId('v5-contact')).toHaveTextContent('Marina');
  expect(screen.getByTestId('v5-next-step')).toHaveTextContent(/próximo passo/i);
  expect(screen.getByTestId('v5-slot')).toHaveTextContent(/Qua · 16:30/i);
  expect(screen.getByTestId('v5-slot')).toHaveTextContent(/confirmado/i);
  expect(container.querySelector('img')).toBeNull();
  expect(container.textContent).not.toMatch(/ambiente demo|browser|dashboard/i);
});
