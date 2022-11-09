import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';

export default function DrinksCarousel() {
  const { apiDrinksDetails, setApiDrinksDetails } = useContext(myContext);

  useEffect(() => {
    const setApiDrinks = async () => {
      const numberSix = 6;
      const responseApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await responseApiDrinks.json();
      setApiDrinksDetails(result.drinks.slice(0, numberSix));
      const teste = result.drinks.slice(0, numberSix);
      console.log(teste);
    }; setApiDrinks();
  }, []);

  return (
    <div>
      DrinksCarousel
      <div className="carousel">
        {apiDrinksDetails.map((e, index) => (
          <div className="carouselItem" key={ index }>
            <p data-testid={ `${index}-recommendation-card` } />
            <img
              src={ e.strDrinkThumb }
              alt="drinks"
              data-testid={ `${index}-recommendation-title` }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
