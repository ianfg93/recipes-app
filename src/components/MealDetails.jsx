import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import myContext from '../context/myContext';
import '../Recipes.css';
import DrinksCarousel from './DrinksCarousel';
import ShareIcon from '../images/shareIcon.svg';

export default function MealDetails({ history }) {
  const { apiRecipeDetails, setApiRecipeDetails } = useContext(myContext);
  const paramsUrl = useParams();
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [copyMessage, setCopyMessage] = useState(false);
  const [favoritesMeals, setFavoritesMeals] = useState([]);
  /* const { apiDrinksDetails, setApiDrinksDetails } = useContext(myContext); */
  /* const [drinksRecommendation, setDrinksRecommendation] = useState([]); */
  /* const { location } = useHistory(); */
  /*  const history = useHistory(); */

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
      setFavoritesMeals(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
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

  const handleShareButton = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopyMessage(true);
  };
  /* console.log(history.location.pathname); */

  const handleFavoriteButton = () => {
    const newFavoritesMeals = [...favoritesMeals, {
      id: apiRecipeDetails?.meals[0].idMeal,
      type: 'meal',
      nationality: apiRecipeDetails?.meals[0].strArea,
      category: apiRecipeDetails?.meals[0].strCategory,
      alcoholicOrNot: '',
      name: apiRecipeDetails?.meals[0].strMeal,
      image: apiRecipeDetails?.meals[0].strMealThumb }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesMeals));
  };

  return (
    <div>
      <div>
        <button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleButtonDetails }
        >
          Start Recipe
        </button>
      </div>
      {copyMessage && (<p>Link copied!</p>)}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButton }
      >
        <img src={ ShareIcon } alt="img share button" />
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteButton }
      >
        Favorite
      </button>
      <br />
      <br />
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
    </div>
  );
}
MealDetails.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
