import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Teste Feedback', () => {
  test('Verifica se os botões sao renderizados', () => {
    renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByRole('button', {
      name: /play again/i,
    });

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i,
    });

    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });

  test('Verifica se o texto Could be better esta na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const text = screen.getByText(/could be better\.\.\./i);

    expect(text).toBeInTheDocument();
  });

  test('Verifica se o botao ranking encaminha para pagina correta', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i,
    });

    userEvent.click(btnRanking);

    const { pathname } = history.location;

    expect(pathname).toBe('/ranking');
  });
});
