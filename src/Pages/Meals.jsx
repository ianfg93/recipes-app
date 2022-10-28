import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import myContext from '../context/myContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Meals() {
  const { ingredientApi } = useContext(myContext);

  const MAX_RECIPES = 12;
  return (
    <div>
      <Header />
      <SearchBar />
      <h1> Tela de receitas </h1>
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
                </div>)))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
