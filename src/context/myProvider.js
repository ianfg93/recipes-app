import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [title, setTitle] = useState('');
  // Estado que estava no SearchBar
  const [inputSearch, setInputSearch] = useState('');
  const [optionRadio, setOptionRadio] = useState('');
  const [ingredientApi, setIngredientApi] = useState([]);

  const handleEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, [setEmail]);

  const handlePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, [setPassword]);

  /* const handleDisabled = ({ target: { value } }) => {
    setDisabled(value);
  }; */
  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const numeroMinimo = 6;
    const verifyPassword = password.length > numeroMinimo;
    setDisabled(!(verifyEmail && verifyPassword));
  }, [email, password]);

  const handleOptionRadio = ({ target: { value } }) => {
    setOptionRadio(value);
  };

  const handleInputSearch = ({ target: { value } }) => {
    setInputSearch(value);
  };

  const ingredientFilter = useCallback(async () => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    const response = await fetch(endPoint);
    const { meals } = await response.json();
    setIngredientApi(meals);
  }, [inputSearch]);

  const nameFilter = useCallback(async () => {
    const endPointRecipes = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    const response = await fetch(endPointRecipes);
    const { meals } = await response.json();
    setIngredientApi(meals);
  }, [inputSearch]);

  const firstLetterFilter = useCallback(async () => {
    if (inputSearch.length === 1) {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const response = await fetch(endPoint);
      const { meals } = await response.json();
      setIngredientApi(meals);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [inputSearch]);

  const radioReturn = useCallback(async () => {
    if (optionRadio === 'ingredient' && inputSearch.length > 1) {
      await ingredientFilter();
    }
    if (optionRadio === 'name' && inputSearch.length > 1) {
      await nameFilter();
    }
    if (optionRadio === 'first-letter') {
      await firstLetterFilter();
    }
  }, [optionRadio, inputSearch, ingredientFilter, nameFilter, firstLetterFilter]);

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
        title,
        setTitle }),
    [email,
      password,
      isDisabled,
      handleEmail,
      handlePassword,
      inputSearch,
      ingredientApi,
      radioReturn,
      title,
      setTitle],
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
