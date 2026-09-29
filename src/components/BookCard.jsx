import { Link } from "react-router-dom";

function BookCard({ book }) {

  const coverId = book.cover_i;

  const image = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/180x250?text=No+Cover";

  return (
    <div className="book-card">

      <img src={image} alt={book.title} />

      <div className="book-info">

        <h3>{book.title}</h3>

        <p>
          {book.author_name
            ? book.author_name[0]
            : "Unknown Author"}
        </p>

        <p>
          {book.first_publish_year || "Year unavailable"}
        </p>

        <Link
          to={`/book/${book.key.split("/").pop()}`}
          className="details-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default BookCard;