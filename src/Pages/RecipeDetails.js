import React, { useLocation } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

function RecipeDetails() {
  const { pathname } = useLocation();
  //   console.log(pathname);

  return (
    pathname.includes('/meals') ? (

      <MealDetails />

    ) : (

      <DrinkDetails />
    )
  );
}

export default RecipeDetails;
