import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

export default function MealDetails() {
  const { setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  console.log(paramsUrl.id);

  useEffect(() => {
    const setApi = async () => {
      const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramsUrl.id}`);
      console.log(responseApi);
      const { meals } = await responseApi.json();
      setApiRecipeDetails(meals[0]);
    };
    setApi();
  }, [paramsUrl.id, setApiRecipeDetails]);

  return (
    <div>
      MealDetails
      {/* <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt={ recipeDetails.strMeal }
      /> */}
    </div>

  );
}
