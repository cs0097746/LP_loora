import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('landing page V4', () => {
  it('tells a compact pain-first product story with real product proof', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /você entra em sessão\. o whatsapp não para\./i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('v4-hero-product')).toHaveAttribute('src', '/product-v4/kanban-left.webp');
    expect(screen.getByText(/o problema não é falta de organização\. é que sua atenção já tem dono\./i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /tudo que chega encontra um lugar\./i })).toBeInTheDocument();

    expect(screen.getByText('14:32')).toBeInTheDocument();
    expect(screen.getByText('14:35')).toBeInTheDocument();
    expect(screen.getByText('14:40')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /o repetitivo não precisa disputar sua atenção\./i })).toBeInTheDocument();
    expect(screen.getByText('VOCÊ DECIDE')).toBeInTheDocument();
    expect(screen.getByText(/avaliação, decisão e conduta clínica continuam com você\./i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /você não precisa lembrar onde aquela conversa parou\./i })).toBeInTheDocument();
    expect(screen.getByText('QUANDO')).toBeInTheDocument();
    expect(screen.getByText('ENTÃO')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /você olha uma vez e sabe o que está acontecendo\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quanto da sua semana ainda está preso no operacional\?/i })).toBeInTheDocument();
  });

  it('keeps conversion paths, human boundaries and the existing lead form', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /ver como funciona na minha clínica/i })).toHaveAttribute('href', '#demo');
    expect(screen.getByRole('button', { name: /quero ver a loomie na minha rotina/i })).toBeInTheDocument();
    expect(screen.getByText(/automação para o administrativo/i)).toBeInTheDocument();

    expect(
      screen.queryByText(/100% lgpd|criptografia ponta-a-ponta|em conformidade com o cfp|20 horas|4 a 5 horas/i),
    ).not.toBeInTheDocument();
  });
});
