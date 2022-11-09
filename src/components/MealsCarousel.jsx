import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';

export default function MealsCarousel() {
  const { apiMealsDetails, setApiMealsDetails } = useContext(myContext);

  useEffect(() => {
    const setApiMeals = async () => {
      const numberSix = 6;
      const responseApiMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      /* console.log(responseApi); */
      const result = await responseApiMeals.json();
      setApiMealsDetails(result.meals.slice(0, numberSix));
      const teste = result.meals.slice(0, numberSix);
      console.log(teste);
    }; setApiMeals();
  }, []);

  return (
    <div>
      MealsCarousel
      <div>
        {apiMealsDetails.map((e, index) => (
          <div key={ index }>
            <p data-testid={ `${index}-recommendation-card` } />
            <img
              src={ e.strMealThumb }
              alt="meals"
              data-testid={ `${index}-recommendation-title` }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
