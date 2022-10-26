import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa o componente Login', () => {
  test('', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  it('', () => {
    const { history } = renderWithRouter(<App />);

    const inputSecondEmail = screen.getByTestId('email-input');
    const inputSecondPassword = screen.getByTestId('password-input');
    const secondButtonEnter = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(secondButtonEnter).toBeDisabled();

    userEvent.type(inputSecondEmail, 'testTrybe@gmail.com');
    userEvent.type(inputSecondPassword, '1234567');

    expect(secondButtonEnter).toBeEnabled();

    userEvent.click(secondButtonEnter);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/meals');
  });
});
