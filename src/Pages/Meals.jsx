import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import myContext from '../context/myContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Recipes from './Recipes';

const MAX_RECIPES = 12;

function Meals() {
  const [toggle, setToggle] = useState(true);

  const {
    ingredientApi,
    filterApiReturn,
    categoryMeals,
    initialMeals,
    handleApiMeals,
  } = useContext(myContext);

  const itemCategory = categoryMeals.filter((element, index) => index < Number('5'));

  const buttonFilter = async ({ target: { textContent } }) => {
    setToggle(!toggle);
    if (toggle) {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${textContent}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      const listMeals = meals.filter((element, index) => index < MAX_RECIPES);
      handleApiMeals(listMeals);
    }
    if (!toggle) {
      handleApiMeals(initialMeals);
    }
  };

  const clearFilter = async () => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    const listMeals = meals.filter((element, index) => index < MAX_RECIPES);
    handleApiMeals(listMeals);
  };

  return (
    <div>
      <Header />
      <SearchBar />
      <h1> Tela de receitas </h1>
      <div>
        {
          itemCategory.map((element, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${element.strCategory}-category-filter` }
              onClick={ buttonFilter }
            >
              {element.strCategory}
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
      { !filterApiReturn ? (<Recipes />) : (
        <div>
          {
            ingredientApi.length === 1 ? (
              <Redirect to={ `/meals/${ingredientApi[0].idMeal}` } />
            ) : (
              ingredientApi.filter((element, index) => index < MAX_RECIPES)
                .map((element, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <Link to={ `/meals/${element.idMeal}` }>
                      <img
                        src={ element.strMealThumb }
                        alt="imagem"
                        data-testid={ `${index}-card-img` }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {element.strMeal}
                      </p>
                    </Link>
                  </div>)))
          }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Meals;
