import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

export default function MealDetails() {
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  /* const [measures, setMeasures] = useState([]); */

  useEffect(() => {
    const setApi = async () => {
      const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramsUrl.id}`);
      const { meals } = await responseApi.json();
      setApiRecipeDetails([meals[0]]);
    };
    setApi();
  }, []);

  console.log(apiRecipeDetails[0].map((element) => element));

  return (
    <div>
      MealDetails
      {
        apiRecipeDetails[0] !== undefined
          ? (
            <>
              <img
                data-testid="recipe-photo"
                src={ apiRecipeDetails[0].strMealThumb }
                alt={ apiRecipeDetails[0].strMeal }
              />
              <h1 data-testid="recipe-title">{apiRecipeDetails[0].strMeal}</h1>
              <h2 data-testid="recipe-category">{apiRecipeDetails[0].strCategory}</h2>
              {apiRecipeDetails.map((ingredient, index) => (
                <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {(ingredient[0] !== null)
            || (ingredient[index].length !== 0) ? console.log() : ingredient[index]}
                </p>))}
              <p data-testid="instructions">{apiRecipeDetails[0].strInstructions}</p>
              <iframe
                data-testid="video"
                src={ apiRecipeDetails[0].strYoutube }
                title={ apiRecipeDetails[0].strMeal }
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
