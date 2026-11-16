import { useState } from "react";

// One movie row. It receives "props": the movie data + what to do on remove
function MovieItem({ movie, onRemove }) {
  return (
    <li style={{ marginBottom: "15px" }}>
      <b>{movie.title}</b> {"⭐".repeat(movie.rating)} ({movie.rating}/5)
      <p>💬 {movie.comment}</p>
      <button onClick={onRemove}>Remove</button>
    </li>
  );
}

function App() {
  // The list of movies (starts empty)
  const [movies, setMovies] = useState([]);

  // What the user is currently typing in the form
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);

  function addMovie() {
    if (title === "") {
      return; // don't add a movie with no title
    }
    const newMovie = {
      id: Date.now(), // unique id for each movie
      title: title,
      comment: comment,
      rating: rating,
    };
    setMovies([...movies, newMovie]); // old movies + the new one
    setTitle("");
    setComment("");
    setRating(3);
  }

  function removeMovie(id) {
    // keep every movie EXCEPT the one with this id
    setMovies(movies.filter((m) => m.id !== id));
  }

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h1>🎬 My Movies Watch List</h1>

      <input
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <br />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={1}>1 star</option>
        <option value={2}>2 stars</option>
        <option value={3}>3 stars</option>
        <option value={4}>4 stars</option>
        <option value={5}>5 stars</option>
      </select>
      <button onClick={addMovie}>Add movie</button>

      <hr />

      {movies.length === 0 ? (
        <p>No movies yet, add one!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onRemove={() => removeMovie(movie.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;