import { render, screen } from '@testing-library/react';
import { AdminMessage } from '@/components/v5/visual/AdminMessage';
import { ContactObject } from '@/components/v5/visual/ContactObject';
import { AppointmentSlot } from '@/components/v5/visual/AppointmentSlot';

it('keeps illustrative administrative objects legible as native text', () => {
  render(
    <>
      <AdminMessage time="14:17">Oi, queria saber se tem horário esta semana.</AdminMessage>
      <ContactObject name="Marina" state="novo" />
      <AppointmentSlot time="Qua · 16:30" state="confirmado" />
    </>,
  );

  expect(screen.getByText('14:17')).toBeVisible();
  expect(screen.getByText(/queria saber se tem horário/i)).toBeVisible();
  expect(screen.getByText('Marina')).toBeVisible();
  expect(screen.getByText('NOVO CONTATO')).toBeVisible();
  expect(screen.getByText('Qua · 16:30')).toBeVisible();
  expect(screen.getByText('confirmado')).toBeVisible();
  expect(screen.getByText('EXEMPLO ILUSTRATIVO')).toBeVisible();
});
