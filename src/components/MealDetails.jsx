import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';
import '../Recipes.css';
import DrinksCarousel from './DrinksCarousel';

export default function MealDetails({ history }) {
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);
  /* const { apiDrinksDetails, setApiDrinksDetails } = useContext(myContext); */
  /* const [drinksRecommendation, setDrinksRecommendation] = useState([]); */
  const handleButtonDetails = () => {
    history.push(`/meals/${paramsUrl.id}/in-progress`);
  };

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
  }, [paramsUrl, setApiRecipeDetails]);

  /* useEffect(() => {
    const setApiDrinks = async () => {
      const numberSix = 6;
      const responseApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await responseApiDrinks.json();
      setApiDrinksDetails(result.drinks.slice(0, numberSix));
      const teste = result.drinks.slice(0, numberSix);
      console.log(teste);
    }; setApiDrinks();
  }, []);
 */
  /* console.log(apiRecipeDetails?.meals[0].strMealThumb); */

  return (
    <div>
      <div>
        <Button
          className="fixed-bottom"
          data-testid="start-recipe-btn"
          onClick={ handleButtonDetails }
        >
          Start Recipe
        </Button>
      </div>
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
      <DrinksCarousel />
      {/* <div className="carousel">
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
      </div> */}
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
    </div>
  );
}
MealDetails.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
