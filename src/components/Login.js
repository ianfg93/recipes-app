import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function Login() {
  const { email, password, isBtnDisabled } = useContext(MyContext);

  verifyBtn = () => {
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const numeroMinimo = 5;
    const verifyPassword = password.length > numeroMinimo;
   // const btnState = verifyEmail && verifyPassword;
    // console.log(btnState);
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
        // value={ email }
        />
      </label>

      <label htmlFor="senha">
        Senha
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          name="password"
        // value={ password }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ verifyBtn( ()=> ( isBtnDisabled : !(verifyEmail && verifyPassword)))}
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
