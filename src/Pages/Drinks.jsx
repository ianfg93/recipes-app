import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import myContext from '../context/myContext';

function Drinks() {
  const { ingredientApi } = useContext(myContext);
  const MAX_RECIPES = 12;

  return (
    <div>
      <Header />
      <SearchBar />
      <h1> Drinks </h1>
      <div>
        {
          ingredientApi.length === 0 && (
            global.alert('Sorry, we haven\'t found any recipes for these filters.')
          )
        }
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
              </div>))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
