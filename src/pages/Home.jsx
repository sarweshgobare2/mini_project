import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>📚 Book Finder & Explorer</h1>

        <p>
          Discover books, authors and amazing stories
          using the Open Library API.
        </p>

        <Link to="/books" className="btn">
          Explore Books
        </Link>
      </div>
    </div>
  );
}

export default Home;