async function UseApiMeals(inputSearch, optionRadio, setIngredient) {
  const ingredientFilter = async () => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    if (!meals) {
      setIngredient([]);
    } else {
      setIngredient(meals);
    }
  };

  const nameFilter = async () => {
    const endPointRecipes = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    const response = await fetch(endPointRecipes);
    const { meals } = await response.json();
    if (!meals) {
      setIngredient([]);
    } else {
      setIngredient(meals);
    }
  };

  const firstLetterFilter = async () => {
    if (inputSearch.length === 1) {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      setIngredient(meals);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  if (optionRadio === 'ingredient' && inputSearch.length > 1) {
    await ingredientFilter();
  }
  if (optionRadio === 'name' && inputSearch.length > 1) {
    await nameFilter();
  }
  if (optionRadio === 'first-letter') {
    await firstLetterFilter();
  }
}

export default UseApiMeals;
