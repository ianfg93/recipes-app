import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import '../RecipeInProgress.css';

function CardRecipes() {
  const [returnApi, setReturnApi] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [check, setCheck] = useState([]);
  const [objectType, setObjectType] = useState('');

  const { recipeId } = useContext(myContext);

  const { pathname } = useLocation();

  const { id } = useParams();

  useEffect(() => {
    if (objectType !== '') {
      const ingredientsLocalStorage = localStorage
        .getItem('inProgressRecipes')[objectType];
      if (typeof ingredientsLocalStorage === 'object'
            && Object.keys(ingredientsLocalStorage).includes(id)) {
        setCheck(ingredientsLocalStorage[id]);
      }
    }
  }, [id, objectType]);

  const ingredientsReturn = useCallback(() => {
    const keyIngredient = Object.keys(returnApi)
      .filter((element) => element.includes('strIngredient'));
    const filteringIngredients = keyIngredient
      .filter((element) => returnApi[element] !== null);
    const emptyFilter = filteringIngredients
      .filter((element) => returnApi[element] !== '');
    setIngredients(emptyFilter);
  }, [returnApi]);

  useEffect(() => {
    ingredientsReturn();
  }, [returnApi, ingredientsReturn]);

  useEffect(() => {
    let typeProduct = '';

    const settingProduct = async () => {
      if (pathname.includes('drinks')) {
        typeProduct = 'drinks';
        setObjectType(typeProduct);
        const dataProduct = await recipeId(id, typeProduct);
        setReturnApi(dataProduct);
      } else {
        typeProduct = 'meals';
        setObjectType(typeProduct);
        const dataProduct = await recipeId(id, typeProduct);
        setReturnApi(dataProduct);
      }
    };
    settingProduct();
    // ingredientsReturn();
  }, [id, pathname, recipeId]);

  useEffect(() => {
    if (check.length > 0 && objectType !== '') {
      const objectLocalStorage = localStorage.getItem('inProgressRecipes');
      objectLocalStorage[objectType][id] = check;
      localStorage.setItem('inProgressRecipes', objectLocalStorage);
    }
    if (check.length === 0 && objectType) {
      const objectLocalStorage = localStorage.getItem('inProgressRecipes');
      objectLocalStorage[objectType][id] = [];
      localStorage.setItem('inProgressRecipes', objectLocalStorage);
    }
  }, [check, id, objectType]);

  const handleClick = (ingredient) => {
    if (!check.some((element) => element === ingredient)) {
      setCheck([...check, ingredient]);
    } else {
      setCheck(check.filter((element) => element !== ingredient));
    }
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
                      ? 'checked' : undefined }
                    key={ index }
                    htmlFor={ `${index} - check` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { returnApi[mapElement] }
                    <input
                      type="checkbox"
                      id={ `${index} - check` }
                      onClick={ () => handleClick(returnApi[mapElement]) }
                      defaultChecked={
                        check.some((element) => element === returnApi[mapElement])
                      }
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
                      ? 'checked' : undefined }
                    key={ index }
                    htmlFor={ `${index} - check` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { returnApi[elementMap] }
                    <input
                      type="checkbox"
                      id={ `${index} - check` }
                      onClick={ () => handleClick(returnApi[elementMap]) }
                      defaultChecked={
                        check.some((element) => element === returnApi[elementMap])
                      }
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
