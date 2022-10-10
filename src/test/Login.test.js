import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';

describe('Teste component Login', () => {
  test('Verifica se a pagina eta na rota /', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('Verifica se o input Usuario é renderizado', () => {
    renderWithRouterAndRedux(<Login />);

    const inputUsuario = screen.getByTestId('input-player-name');

    expect(inputUsuario).toBeInTheDocument();
  });

  test('Verifica se o input Email é renderizado', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId('input-gravatar-email');

    expect(inputEmail).toBeInTheDocument();
  });

  test('Verifica se após clicar no botao play, a api é chamada', async () => {
    renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 0,
        response_message: 'Token Generated Successfully!',
        token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
      }),
    });

    const btnPlay = screen.getByTestId('btn-play');

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputName, 'Kananda');
    userEvent.type(inputEmail, 'kananda@kananda.com');

    expect(btnPlay).toBeEnabled();

    userEvent.click(btnPlay);

    expect(global.fetch).toBeCalled();
  });

  test('Verifica se botao settings é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnSettings = screen.getByTestId('btn-settings');

    expect(btnSettings).toBeInTheDocument();

    userEvent.click(btnSettings);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings');
  });
});
