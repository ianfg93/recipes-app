import React, { useContext } from 'react';
import myContext from '../context/myContext';

function SearchBar() {
  const { handleOptionRadio, radioReturn } = useContext(myContext);
  // const [radioFiltered, setRadioFiltered] = useState(false);

  // const handleRadio = () => {
  //   setRadioFiltered(!radioFiltered);
  // };

  return (
    <form>
      <label htmlFor="ingredient">
        <input
          type="radio"
          value="ingredient"
          name="ingredient-search"
          data-testid="ingredient-search-radio"
          onChange={ handleOptionRadio }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          value="name"
          name="name-search"
          data-testid="name-search-radio"
          onChange={ handleOptionRadio }
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          value="first-letter"
          name="first-letter-search"
          data-testid="first-letter-search-radio"
          onChange={ handleOptionRadio }
        />
        Primeira Letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ radioReturn }
      >
        Filtrar
      </button>
    </form>
  );
}
export default SearchBar;
