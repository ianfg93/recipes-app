import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Header', () => {
  test('Verificando os data-test', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const pageTitle = screen.getByTestId('page-title');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(pageTitle).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    expect(searchTopBtn).toBeInTheDocument();
  });
  test('Verificando os clicks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const verificandoProfileBtn = screen.getByTestId('profile-top-btn');
    const verificandoSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(verificandoProfileBtn);
    userEvent.click(verificandoSearchBtn);
  });
  test('Verificando as rotas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');
    act(() => { history.push('/drinks'); });
    expect(history.location.pathname).toBe('/drinks');
    act(() => { history.push('/profile'); });
    expect(history.location.pathname).toBe('/profile');
    act(() => { history.push('/done-recipes'); });
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => { history.push('/favorite-recipes'); });
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
