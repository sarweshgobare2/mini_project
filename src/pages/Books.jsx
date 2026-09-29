import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";

function Books() {

  // Search input
  const [search, setSearch] = useState("");

  // Actual submitted search
  const [searchQuery, setSearchQuery] = useState("");

  // Books from API
  const [books, setBooks] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error message
  const [error, setError] = useState("");

  // Search history
  const [searchHistory, setSearchHistory] = useState(() => {

    const savedHistory = localStorage.getItem("bookSearchHistory");

    return savedHistory ? JSON.parse(savedHistory) : [];

  });


  // Save search history to localStorage
  useEffect(() => {

    localStorage.setItem(
      "bookSearchHistory",
      JSON.stringify(searchHistory)
    );

  }, [searchHistory]);


  // Fetch books from API
  const fetchBooks = async () => {

    if (!searchQuery.trim()) {
      setBooks([]);
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchQuery
        )}&limit=20`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      setBooks(data.docs);

    } catch (err) {

      setError("Unable to fetch books. Please try again.");

      setBooks([]);

    } finally {

      setLoading(false);

    }

  };


  // Fetch books whenever searchQuery changes
  useEffect(() => {

    if (searchQuery) {
      fetchBooks();
    }

  }, [searchQuery]);


  // Search button
  const handleSearch = () => {

    const query = search.trim();

    if (!query) {

      setError("Please enter a book name.");

      setBooks([]);

      return;
    }

    setError("");

    setSearchQuery(query);

    // Add search to history
    setSearchHistory((oldHistory) => {

      const filteredHistory = oldHistory.filter(
        (item) => item.toLowerCase() !== query.toLowerCase()
      );

      return [query, ...filteredHistory].slice(0, 10);

    });

  };


  // Search from history
  const handleHistorySearch = (item) => {

    setSearch(item);

    setSearchQuery(item);

    setError("");

  };


  // Clear search history
  const clearHistory = () => {

    setSearchHistory([]);

    localStorage.removeItem("bookSearchHistory");

  };


  return (

    <div className="page">

      <h1>📚 Find Your Books</h1>

      {/* Search Box */}

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />


      {/* Search History */}

      {searchHistory.length > 0 && (

        <div className="history-section">

          <div className="history-header">

            <h2>🕘 Recent Searches</h2>

            <button
              className="clear-history"
              onClick={clearHistory}
            >
              Clear History
            </button>

          </div>


          <div className="history-list">

            {searchHistory.map((item, index) => (

              <button
                className="history-item"
                key={index}
                onClick={() => handleHistorySearch(item)}
              >
                🔍 {item}
              </button>

            ))}

          </div>

        </div>

      )}


      {/* Initial message */}

      {!searchQuery &&
        !loading &&
        !error && (

          <div className="message">

            <h2>🔍 Search for a Book</h2>

            <p>
              Enter a book name above to explore books.
            </p>

          </div>

        )}


      {/* Loading */}

      {loading && (

        <div className="message">

          <h2>⏳ Loading books...</h2>

          <p>
            Please wait while we find your books.
          </p>

        </div>

      )}


      {/* Error */}

      {error && (

        <div className="message">

          <h2 className="error">
            {error}
          </h2>

        </div>

      )}


      {/* No Results */}

      {!loading &&
        searchQuery &&
        books.length === 0 &&
        !error && (

          <div className="message">

            <h2>😔 No books found</h2>

            <p>
              Try searching with another book name.
            </p>

          </div>

        )}


      {/* Books */}

      {!loading && books.length > 0 && (

        <div>

          <h2 className="results-title">
            📖 Results for "{searchQuery}"
          </h2>

          <div className="book-grid">

            {books.map((book) => (

              <BookCard
                key={book.key}
                book={book}
              />

            ))}

          </div>

        </div>

      )}

    </div>

  );
}

export default Books;