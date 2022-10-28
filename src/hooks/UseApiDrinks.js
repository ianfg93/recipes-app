async function UseApiDrinks(inputSearch, optionRadio, setIngredient) {
  const ingredientFilter = async () => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    const response = await fetch(endPoint);
    const { drinks } = await response.json();
    if (!drinks) {
      setIngredient([]);
    } else {
      setIngredient(drinks);
    }
  };

  const nameFilter = async () => {
    const endPointRecipes = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    const response = await fetch(endPointRecipes);
    const { drinks } = await response.json();
    setIngredient(drinks);
    if (!drinks) {
      setIngredient([]);
    } else {
      setIngredient(drinks);
    }
  };

  const firstLetterFilter = async () => {
    if (inputSearch.length === 1) {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      setIngredient(drinks);
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

export default UseApiDrinks;
