import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import myContext from './myContext';
import UseApiMeals from '../hooks/UseApiMeals';
import UseApiDrinks from '../hooks/UseApiDrinks';

const MAX_RECIPES = 12;

function Provider({ children }) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [title, setTitle] = useState('');
  // Estado SearchBar
  const [inputSearch, setInputSearch] = useState('');
  const [optionRadio, setOptionRadio] = useState('');
  const [ingredientApi, setIngredientApi] = useState([]);
  // Estado Recipes
  const [apiMeals, setApiMeals] = useState([]);
  const [apiDrinks, setApiDrinks] = useState([]);
  const [filterApiReturn, setFilterApiReturn] = useState(false);
  const [initialMeals, setInitialMeals] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [apiRecipeDetails, setApiRecipeDetails] = useState([]);
  const [apiDrinksDetails, setApiDrinksDetails] = useState([]);
  const [apiMealsDetails, setApiMealsDetails] = useState([]);

  const handleEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, [setEmail]);

  const handlePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, [setPassword]);

  const handleOptionRadio = useCallback(({ target: { value } }) => {
    setOptionRadio(value);
  }, []);

  const handleInputSearch = useCallback(({ target: { value } }) => {
    setInputSearch(value);
  }, []);

  const handleApiMeals = useCallback((data) => {
    setApiMeals(data);
  }, []);

  const handleApiDrinks = useCallback((data) => {
    setApiDrinks(data);
  }, []);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const minimumValue = 6;
    const verifyPassword = password.length > minimumValue;
    setDisabled(!(verifyEmail && verifyPassword));
  }, [email, password]);

  useEffect(() => {
    const fetchApiDrinks = async () => {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      const filteredDrinks = drinks.filter((element, index) => index < MAX_RECIPES);
      setInitialDrinks(filteredDrinks);
      setApiDrinks(filteredDrinks);
    };
    fetchApiDrinks();
  }, []);

  useEffect(() => {
    const fetchCategoryDrinks = async () => {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(endPoint);
      const { drinks } = await response.json();
      setCategoryDrinks(drinks);
    };
    fetchCategoryDrinks();
  }, []);

  useEffect(() => {
    const fetchApiMeals = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      const filteredMeals = meals.filter((element, index) => index < MAX_RECIPES);
      setInitialMeals(filteredMeals);
      setApiMeals(filteredMeals);
    };
    fetchApiMeals();
  }, []);

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      setCategoryMeals(meals);
    };
    fetchCategoryMeals();
  }, []);

  const radioReturn = useCallback(async () => {
    setFilterApiReturn(true);
    if (history.location.pathname === '/meals') {
      await UseApiMeals(inputSearch, optionRadio, setIngredientApi);
    }
    if (history.location.pathname === '/drinks') {
      await UseApiDrinks(inputSearch, optionRadio, setIngredientApi);
    }
  }, [inputSearch, optionRadio, history.location.pathname]);

  const recipeId = useCallback(async (id, type) => {
    try {
      if (type === 'drinks') {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endPoint);
        const results = await response.json();
        return results.drinks[0];
      }
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      return meals[0];
    } catch (error) {
      return error;
    }
  }, []);

  const contexto = useMemo(
    () => (
      {
        email,
        password,
        isDisabled,
        handleEmail,
        handlePassword,
        inputSearch,
        ingredientApi,
        handleOptionRadio,
        handleInputSearch,
        radioReturn,
        filterApiReturn,
        recipeId,
        apiDrinks,
        apiMeals,
        initialDrinks,
        initialMeals,
        categoryDrinks,
        categoryMeals,
        handleApiDrinks,
        handleApiMeals,
        title,
        setTitle,
        apiRecipeDetails,
        setApiRecipeDetails,
        apiDrinksDetails,
        setApiDrinksDetails,
        apiMealsDetails,
        setApiMealsDetails,
      }),
    [email,
      password,
      isDisabled,
      handleEmail,
      handlePassword,
      handleOptionRadio,
      handleInputSearch,
      handleApiDrinks,
      handleApiMeals,
      inputSearch,
      ingredientApi,
      radioReturn,
      apiDrinks,
      apiMeals,
      filterApiReturn,
      recipeId,
      categoryDrinks,
      categoryMeals,
      initialDrinks,
      initialMeals,
      title,
      setTitle,
      apiRecipeDetails,
      setApiRecipeDetails,
      apiDrinksDetails,
      setApiDrinksDetails,
      apiMealsDetails,
      setApiMealsDetails],
  );

  return (
    <myContext.Provider value={ contexto }>
      {children}
    </myContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Provider;
