import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import myContext from '../context/myContext';

function Recipes() {
  const { apiDrinks, apiMeals } = useContext(myContext);
  const history = useHistory();

  return (
    history.location.pathname === '/meals' ? (
      <div>
        {
          (
            apiMeals.map((element, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <Link
                  to={ `/meals/${element.idMeal}` }
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
                  Show Recipe!
                </Link>
              </div>))
          )
        }
      </div>
    ) : (
      <div>
        {
          (
            apiDrinks.map((element, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <Link
                  to={ `/drinks/${element.idDrink}` }
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
                  Show Recipe!
                </Link>
              </div>))
          )
        }
      </div>
    )
  );
}

export default Recipes;
