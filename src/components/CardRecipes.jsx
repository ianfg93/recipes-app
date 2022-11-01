import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import '../RecipeInProgress.css';

function CardRecipes() {
  const [returnApi, setReturnApi] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [check, setCheck] = useState([]);

  const { recipeId } = useContext(myContext);

  const { pathname } = useLocation();

  const { id } = useParams();

  const ingredientsReturn = useCallback(() => {
    const keyIngredient = Object.keys(returnApi)
      .filter((element) => element.includes('strIngredient'));
    const filteringIngredients = keyIngredient
      .filter((element) => returnApi[element] !== null);
    const emptyFilter = filteringIngredients
      .filter((element) => returnApi[element] !== '');
    console.log(emptyFilter);
    setIngredients(emptyFilter);
  }, [returnApi]);

  useEffect(() => {
    ingredientsReturn();
  }, [returnApi]);

  useEffect(() => {
    let typeProduct = '';

    const settingProduct = async () => {
      if (pathname.includes('drinks')) {
        typeProduct = 'drinks';
        const dataProduct = await recipeId(id, typeProduct);
        console.log(dataProduct);
        setReturnApi(dataProduct);
      } else {
        typeProduct = 'meals';
        const dataProduct = await recipeId(id, typeProduct);
        setReturnApi(dataProduct);
      }
    };
    settingProduct();
    // ingredientsReturn();
  }, []);

  const handleClick = (ingredient) => {
    if (!check.some((element) => element === ingredient)) {
      setCheck([...check, ingredient]);
    }
    setCheck(check.filter((element) => element !== ingredient));
  };

  return (
    <div>
      {
        pathname.includes('drinks') ? (
          <section>
            <h1 data-testid="recipe-title">
              { returnApi.strGlass }
            </h1>
            <h3 data-testid="recipe-category">
              { returnApi.strCategory }
            </h3>
            <h5>
              { returnApi.strAlcoholic }
            </h5>
            <img
              data-testid="recipe-photo"
              src={ returnApi.strDrinkThumb }
              alt={ returnApi.strDrink }
            />
            <button type="button" data-testid="share-btn">
              Share
            </button>
            <button type="button" data-testid="favorite-btn">
              Add to Favorite
            </button>

            <section>
              {
                ingredients.map((mapElement, index) => (
                  <label
                    className={ check
                      .some((element) => element === returnApi[mapElement])
                      ? 'marked' : undefined }
                    key={ index }
                    htmlFor={ `${index} - check` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { returnApi[mapElement] }
                    <input
                      type="checkbox"
                      id={ `${index} - check` }
                      onClick={ () => handleClick(returnApi[mapElement]) }
                    />
                  </label>
                ))
              }
            </section>

            <p data-testid="instructions">
              { returnApi.strInstructions }
            </p>

            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finish Recipe
            </button>
          </section>
        ) : (
          <section>
            <h1 data-testid="recipe-title">
              { returnApi.strMeal }
            </h1>
            <h3 data-testid="recipe-category">
              { returnApi.strCategory }
            </h3>
            <img
              data-testid="recipe-photo"
              src={ returnApi.strMealThumb }
              alt={ returnApi.strMeal }
            />
            <button type="button" data-testid="share-btn">
              Share
            </button>
            <button type="button" data-testid="favorite-btn">
              Add to Favorite
            </button>

            <section>
              {
                ingredients.map((elementMap, index) => (
                  <label
                    className={ check
                      .some((element) => element === returnApi[elementMap])
                      ? 'marked' : undefined }
                    key={ index }
                    htmlFor={ `${index} - check` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { returnApi[elementMap] }
                    <input
                      type="checkbox"
                      id={ `${index} - check` }
                      onClick={ () => handleClick(returnApi[elementMap]) }
                    />
                  </label>
                ))
              }
            </section>

            <p data-testid="instructions">
              { returnApi.strInstructions }
            </p>

            <button type="button" data-testid="finish-recipe-btn">
              Finish Recipe
            </button>
          </section>
        )
      }
    </div>
  );
}

export default CardRecipes;
