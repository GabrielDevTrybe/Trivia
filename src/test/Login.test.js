import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes componente Login', () => {
  test('Testa se os inputs aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    const idName = 'input-player-name';
    const idEmail = 'input-gravatar-email';

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  test('Verifica se um button com texto Play é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const btnPlay = screen.getByRole('button', {
      name: /play/i,
    });

    expect(btnPlay).toBeInTheDocument();
  });
  test('Verifica se é possivel digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const msgInput = 'Digitando...';
    const idName = 'input-player-name';
    const idEmail = 'input-gravatar-email';

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);

    userEvent.type(inputName, msgInput);
    userEvent.type(inputEmail, msgInput);
  });
});
