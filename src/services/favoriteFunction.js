const clickFavoriteRecipe = (object) => {
  const { favoriteRecipes, setFavoriteRecipes, data, type, id } = object;
  if (!favoriteRecipes.some((e) => e.id === id)) {
    let likedRecipe = {};
    if (type === 'drinks') {
      likedRecipe = {
        id: data.idDrink,
        type: 'drink',
        nationality: '',
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic,
        name: data.strDrink,
        image: data.strDrinkThumb,
      };
    } else {
      likedRecipe = {
        id: data.idMeal,
        type: 'meal',
        nationality: data.strArea,
        category: data.strCategory,
        alcoholicOrNot: '',
        name: data.strMeal,
        image: data.strMealThumb,
      };
    }
    setFavoriteRecipes([...favoriteRecipes, likedRecipe]);
  } else {
    setFavoriteRecipes(favoriteRecipes.filter((e) => +e.id !== +id));
  }
};

export default clickFavoriteRecipe;
