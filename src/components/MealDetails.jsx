import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

export default function MealDetails() {
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);
  /* const [measures, setMeasures] = useState([]); */

  useEffect(() => {
    const setApi = async () => {
      const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramsUrl.id}`);
      const result = await responseApi.json();
      setApiRecipeDetails(result);
      const respondeResult = result.meals[0];
      const getIngrediente = Object.entries(respondeResult)
        .filter((ingred) => ingred[0].includes('strIngredient')
        && ingred[1] !== '' && ingred[1] !== null).map((ingred) => ingred[1]);
      setIngrediente(getIngrediente);
      const getMesure = Object.entries(respondeResult)
        .filter((mesure) => mesure[0].includes('strMeasure')
        && mesure[1] !== '' && mesure[1] !== null).map((mesure) => mesure[1]);
      setMeasure(getMesure);
    };
    setApi();
  }, []);

  /* console.log(apiRecipeDetails?.meals[0].strMealThumb); */

  return (
    <div>
      MealDetails
      {
        apiRecipeDetails?.meals !== undefined
          ? (
            <>
              <img
                data-testid="recipe-photo"
                src={ apiRecipeDetails?.meals[0].strMealThumb }
                alt={ apiRecipeDetails?.meals[0].strMeal }
              />
              <h1 data-testid="recipe-title">{apiRecipeDetails?.meals[0].strMeal}</h1>
              <h2
                data-testid="recipe-category"
              >
                {apiRecipeDetails?.meals[0].strCategory}

              </h2>

              {ingrediente.map((ingredient, index) => (
                <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {ingredient}
                </p>))}

              {measure.map((ingred, index) => (
                <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {ingred}
                </p>))}

              <p data-testid="instructions">
                {apiRecipeDetails?.meals[0].strInstructions}

              </p>
              <iframe
                data-testid="video"
                src={ apiRecipeDetails?.meals[0].strYoutube }
                title={ apiRecipeDetails?.meals[0].strMeal }
                width="420"
                height="315"
              />
              {' '}
            </>
          ) : (<p>Loading</p>)
      }
    </div>
  );
}
