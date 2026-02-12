import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(value);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);

    if (error) setError("");
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" noValidate onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            className="search__input"
            placeholder="Search for news"
            required
            value={keyword}
            onChange={handleChange}
          />
          <button type="submit" className="search__button">
            Search
          </button>
        </form>

        {error && <span className="search__error">{error}</span>}
      </div>
    </section>
  );
}

export default SearchForm;
