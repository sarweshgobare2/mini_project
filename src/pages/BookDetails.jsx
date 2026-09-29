import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetails() {

  const { id } = useParams();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBook = async () => {

      try {

        const response = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );

        const data = await response.json();

        setBook(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBook();

  }, [id]);

  if (loading) {
    return <h2 className="message">Loading...</h2>;
  }

  if (!book) {
    return <h2 className="message">Book not found</h2>;
  }

  return (

    <div className="details-page">

      <Link to="/books" className="back-btn">
        ← Back to Books
      </Link>

      <div className="details-card">

        <div>

          <h1>{book.title}</h1>

          {book.description && (

            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>

          )}

          <p>
            <strong>Subjects:</strong>
          </p>

          {book.subjects && (

            <div className="subjects">

              {book.subjects.slice(0, 10).map((subject, index) => (

                <span key={index}>
                  {subject}
                </span>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default BookDetails;