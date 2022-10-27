/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState, useContext } from 'react';
/* import PropTypes from 'prop-types'; */
import { useHistory } from 'react-router-dom';
import myContext from '../context/myContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { title, setTitle } = useContext(myContext);
  const [search, setSearch] = useState(false);
  const history = useHistory();
  const { handleInputSearch, inputSearch } = useContext;

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname === '/meals') setTitle('Meals');
    if (pathname === '/drinks') setTitle('Drinks');
    if (pathname === '/profile') setTitle('Profile');
    if (pathname === '/done-recipes') setTitle('Done Recipes');
    if (pathname === '/favorite-recipes') setTitle('Favorite Recipes');
  }, [history.location, setTitle]);

  const handleClickProfile = () => {
    history.push('/profile');
  };

  const handleClickSearch = () => {
    setSearch(!search);
  };

  return (
    <div>
      Header
      <div>
        <h1 data-testid="page-title">
          { title }
        </h1>
      </div>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ handleClickProfile }
      >
        Ícone de perfil
        <img
          src={ profileIcon }
          alt="Ícone para perfil"
        />
      </button>

      {
        history.location.pathname === '/done-recipes'
        || history.location.pathname === '/favorite-recipes'
        || history.location.pathname === '/profile'
          ? '' : (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ handleClickSearch }
            >
              Ícone de pesquisa
              <img
                src={ searchIcon }
                alt="Ícone para pesquisa"
              />
            </button>
          )
      }
      {search
      && <input
        type="search"
        data-testid="search-input"
        value={ inputSearch }
        onChange={ handleInputSearch }
      />}
    </div>
  );
}

/* Header.propTypes = {
  history: PropTypes.shape(),
}.isRequired; */

export default Header;
