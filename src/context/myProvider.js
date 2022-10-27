import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import myContext from './myContext';
import UseApiMeals from '../hooks/UseApiMeals';
import UseApiDrinks from '../hooks/UseApiDrinks';

function Provider({ children }) {
  const history = useHistory();

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

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const numeroMinimo = 6;
    const verifyPassword = password.length > numeroMinimo;
    setDisabled(!(verifyEmail && verifyPassword));
  }, [email, password]);

  const handleOptionRadio = useCallback(({ target: { value } }) => {
    setOptionRadio(value);
  }, []);

  const handleInputSearch = useCallback(({ target: { value } }) => {
    setInputSearch(value);
  }, []);

  const radioReturn = useCallback(async () => {
    if (history.location.pathname === '/meals') {
      UseApiMeals(inputSearch, optionRadio, setIngredientApi);
    }
    if (history.location.pathname === '/drinks') {
      UseApiDrinks(inputSearch, optionRadio, setIngredientApi);
    }
  }, [inputSearch, optionRadio, history.location.pathname]);

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
      handleOptionRadio,
      handleInputSearch,
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
