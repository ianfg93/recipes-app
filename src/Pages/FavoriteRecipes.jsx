// import React, { useState } from 'react';
import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoritesRecipes] = useState([]);

  const favoriteRecipes = useCallback(() => {
    JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
  }, []);

  return (
    <main>
      FavoriteRecipes!!
      <Header />
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
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { favoritesRecipes.map((card, index) => (
        <div key={ card.id }>
          <img
            src={ card.image }
            alt={ card.name }
            width="150px"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { card.category }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            { card.name }
          </p>
          <button
            className="btn-fav"
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn ` }
            value={ card.id }
            src={ blackHeartIcon }
          >
            Favorite btn
            {' '}
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ recipeFavorites.some((rec) => rec.id === recipe.id)
                ? blackHeartIcon : whiteHeartIcon }
              alt="Botão Favoritado"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            value={ card.id }
          >
            {' '}
            Share button
            {' '}
          </button>
        </div>
      ))}
    </main>
  );
}

export default FavoriteRecipes;
