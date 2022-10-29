import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import myContext from '../context/myContext';
import Recipes from './Recipes';

const MAX_RECIPES = 12;

function Drinks() {
  const [toggle, setToggle] = useState(true);

  const {
    ingredientApi,
    filterApiReturn,
    categoryDrinks,
    initialDrinks,
    handleApiDrinks,
  } = useContext(myContext);

  const itemCategory = categoryDrinks.filter((element, index) => index < Number('5'));

  const buttonFilter = async ({ target: { textContent } }) => {
    setToggle(!toggle);
    if (toggle) {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${textContent}`;
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const listDrinks = drinks.filter((element, index) => index < MAX_RECIPES);
      handleApiDrinks(listDrinks);
    }
    if (!toggle) {
      handleApiDrinks(initialDrinks);
    }
  };

  const clearFilter = async () => {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    const listDrinks = drinks.filter((element, index) => index < MAX_RECIPES);
    handleApiDrinks(listDrinks);
  };

  return (
    <div>
      <Header />
      <SearchBar />
      <h1> Drinks </h1>
      <div>
        {
          itemCategory.map((element, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              onClick={ buttonFilter }
            >
              { element.strCategory }
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ clearFilter }
        >
          All
        </button>
      </div>

      {!filterApiReturn ? (<Recipes />) : (
        <div>
          {
            ingredientApi.length === 1 && (
              <Redirect to={ `/drinks/${ingredientApi[0].idDrink}` } />
            )
          }
          {
            ingredientApi.filter((element, index) => index < MAX_RECIPES)
              .map((element, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                >
                  <Link to={ `/drinks/${element.idDrink}` }>
                    <img
                      src={ element.strDrinkThumb }
                      alt="imagem"
                      data-testid={ `${index}-card-img` }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      {element.strDrink}
                    </p>
                  </Link>
                </div>))
          }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Drinks;
