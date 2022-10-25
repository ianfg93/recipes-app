import { shape } from 'prop-types';

function Header({ titlePage }) {
  return (
    <header>
      <h1 data-testid="page-title">{ titlePage }</h1>
      { (titlePage === 'Drinks' || titlePage === 'Meals') && (
        <img
          src="./images/searchIcon.svg"
          alt="inconSearch"
          data-testid="search-top-btn"
        />)}
      <img
        src="./images/profileIcon.svg"
        alt="iconProfile"
        data-testid="profile-top-btn"
      />
    </header>
  );
}

Header.propTypes = {
  titlePage: shape(),
}.isRequired;

export default Header;
