import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

export default function DrinkDetails() {
//   const { apiMealsDetails, setApiMealsDetails } = useContext(myContext);
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  const [drinksIngredients, measures] = useState([]);

  useEffect(() => {
    const setApi = async () => {
      const responseApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${paramsUrl.id}`);
      console.log(responseApi);
      const { drinks } = await responseApi.json();
      setApiRecipeDetails([drinks[0]]);
    };
    setApi();
  }, []);

  return (
    <div>
      DrinkDetails
      <img
        data-testid="recipe-photo"
        src={ apiRecipeDetails.strDrinkThumb }
        alt={ apiRecipeDetails.strDrink }
      />
      <h1 data-testid="recipe-title">{apiRecipeDetails.strDrink}</h1>
      <h2 data-testid="recipe-category">{apiRecipeDetails.strCategory}</h2>
      {apiRecipeDetails.map((ingredient, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {(ingredient[index] !== null && measures[index] !== null)
          || (ingredient[index].length !== 0 && measures[index].length !== 0)}
        </p>))}
      <p data-testid="instructions">{apiRecipeDetails.strInstructions}</p>
    </div>

  );
}
