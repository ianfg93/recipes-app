import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente SearchBar', () => {
  test('Verificando os data-testid e botões', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstSearch = screen.getByTestId('first-letter-search-radio');
    const execSearch = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    const searchIcon = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(execSearch);
    userEvent.click(searchInput);
    userEvent.click(searchIcon);
    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstSearch).toBeInTheDocument();
    expect(execSearch).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Verificando o alerte ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    const texto = screen.getByText(/primeira letra/i);
    expect(texto).toBeInTheDocument();
    userEvent.click(texto);
    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });
  test('Verificando as rotas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    act(() => { history.push('/drinks'); });
    expect(history.location.pathname).toBe('/drinks');
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');
  });
  test('Verificando as paginas', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const ingredient = screen.getByText(/ingredient/i);
    const name = screen.getByText(/name/i);
    const letter = screen.getByText(/letter/i);
    const search = screen.getByText(/search/i);
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(letter).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });
});
