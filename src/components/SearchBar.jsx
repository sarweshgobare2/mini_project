function SearchBar({ search, setSearch, onSearch }) {

  return (

    <div className="search-box">

      <input
        type="text"
        placeholder="Search for books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={onSearch}>
        Search
      </button>

    </div>

  );
}

export default SearchBar;