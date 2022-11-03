import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../../Pages/Profile';
import { renderWithRouter } from './renderWithRouter';
import Provider from '../../context/myProvider';

describe('Testando o componente Header', () => {
  test('Verificando o profileDoneBtn ', () => {
    renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(profileDoneBtn);
    expect(profileDoneBtn).toBeInTheDocument();
  });
  test('Verificando os test id ', () => {
    renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileDoneBtn);
    userEvent.click(profileFavoriteBtn);
    userEvent.click(profileLogoutBtn);
    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });
  test('Verificando as mudanças das rotas', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    act(() => { history.push('/favorite-recipes'); });
    expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => { history.push('/'); });
    expect(history.location.pathname).toBe('/');
    act(() => { history.push('/done-recipes'); });
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
