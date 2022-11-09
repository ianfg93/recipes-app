import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      {
        doneRecipes?.map((done, index) => (
          <section key={ i }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ done.image }
              alt={ done.name }
              width="300px"
            />
            <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            {
              (doneRecipe.type === 'meal')
                ? (
                  <div>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { `${recipe.nationality} - ${recipe.category}`}
                    </p>
                    {recipe.tags.map((tag, i) => (
                      <p
                        key={ i }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                )
                : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.alcoholicOrNot} - ${recipe.category}`}
                  </p>
                )
            }
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
          </section>
        ))
      }
    </div>
  );
}
export default DoneRecipes;
