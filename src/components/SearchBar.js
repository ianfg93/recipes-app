function SearchBar() {
  return (
    <div>
      <input
        type="radio"
        value="ingredient-search"
        name="ingredient-search"
        data-testid="ingredient-search-radio"
      />
      Ingrediente

      <input
        type="radio"
        value="name-search"
        name="name-search"
        data-testid="name-search-radio"
      />
      Nome

      <input
        type="radio"
        value="first-letter-search"
        name="first-letter-search"
        data-testid="first-letter-search-radio"
      />
      Primeira Letra

      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Filtrar
      </button>
    </div>
  );
}

export default SearchBar;
