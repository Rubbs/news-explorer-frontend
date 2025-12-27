import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" noValidate>
        <input
          type="text"
          className="search__input"
          placeholder="Search for news"
          required
        />
        <button type="submit" className="search__button">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
