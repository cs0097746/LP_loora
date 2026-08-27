import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page V3', () => {
  it('tells the complete product-cinematic operational story', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sua clínica continua andando enquanto você está em sessão/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('hero-crm-image')).toHaveAttribute('src', '/product/loomie-kanban.webp');
    expect(screen.getByRole('heading', { name: 'WhatsApp organizado.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /o operacional não precisa esperar você terminar a sessão/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /o repetitivo acontece sem disputar sua atenção/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /contexto que continua existindo quando você fecha o whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /veja o que está acontecendo sem reconstruir sua rotina de cabeça/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /conectamos sua rotina/i })).toBeInTheDocument();
    expect(screen.getByText(/automação para o administrativo/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quanto da sua semana ainda está preso/i })).toBeInTheDocument();
  });

  it('keeps conversion paths, human boundaries and the existing lead form', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /ver a loomie funcionando/i })).toHaveAttribute('href', '#demo');
    expect(screen.getByRole('button', { name: /quero ver a loomie na minha rotina/i })).toBeInTheDocument();
    expect(screen.getByText(/avaliação, decisão e conduta clínica continuam humanas/i)).toBeInTheDocument();

    expect(
      screen.queryByText(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas/i),
    ).not.toBeInTheDocument();
  });
});
