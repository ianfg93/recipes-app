import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Footer', () => {
  test('Verificando os data-testid ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const footer = screen.getByTestId('footer');
    const drinksBottom = screen.getByTestId('drinks-bottom-btn');
    const mealsBottom = screen.getByTestId('meals-bottom-btn');
    userEvent.click(footer);
    userEvent.click(mealsBottom);
    expect(footer).toBeInTheDocument();
    expect(drinksBottom).toBeInTheDocument();
    expect(mealsBottom).toBeInTheDocument();
  });
  test('Verificando as imagens', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const imgDrink = screen.getByRole('img', { name: /drink/i });
    const imgMeals = screen.getByRole('img', { name: /meals/i });
    userEvent.click(imgDrink);
    userEvent.click(imgMeals);
    expect(imgDrink).toBeInTheDocument();
    expect(imgMeals).toBeInTheDocument();
  });
});
