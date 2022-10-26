import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Header', () => {
  test('Verificando os: page-title, profile-top-btn e search-top-btn ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const pageTitle = screen.getByTestId('page-title');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const searchInput = screen.getByTestId('search-input');
    userEvent.click(profileTopBtn);
    userEvent.click(searchTopBtn);
    userEvent.click(searchInput);
    expect(pageTitle).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    expect(searchTopBtn).toBeInTheDocument();
  });
  test('Verificando o search', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const serachBtn = screen.getByTestId('search-top-btn');
    userEvent.click(serachBtn);
  });
  test('Verificando o search', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/profile'); });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  test('Verificando as mudanças das rotas', () => {
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
