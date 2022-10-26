import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

function Login({ history }) {
  const {
    email,
    password,
    isDisabled,
    handleEmail,
    handlePassword } = useContext(myContext);

  const handleClickLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form>
      Login
      <label htmlFor="login">
        Email
        <input
          type="email"
          id="login"
          data-testid="email-input"
          name="email"
          onChange={ handleEmail }
          value={ email }
        />
      </label>

      <label htmlFor="senha">
        Senha
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          name="password"
          onChange={ handlePassword }
          value={ password }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleClickLogin }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Login;
