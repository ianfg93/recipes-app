import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [title, setTitle] = useState('');

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

  const contexto = useMemo(
    () => (
      {
        email,
        password,
        isDisabled,
        handleEmail,
        handlePassword,
        title,
        setTitle }),
    [email,
      password,
      isDisabled,
      handleEmail,
      handlePassword,
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
