import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHome, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";

export default function App() {
  const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_KEY,
            sort_by: sortBy,
            page: currentPage,
            with_genres: selectedGenre,
            query: searchQuery,
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: "d6f662345ecbbb7b52c6bf95095b31ab",
          query: searchQuery,
        },
      }
    );
    setMovies(response.data.results);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };
  return (
    <div>
      <h1>MovieSpot</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        ></input>
        <button onClick={handleSearchSubmit} className="search-button">
          <AiOutlineSearch />
        </button>
      </div>
      <div className="filters">
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-wrapper">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p className="rating"> Rating: {movie.vote_average}</p>
            {expandedMovieId === movie.id ? (
              <p>{movie.overview}</p>
            ) : (
              <p>{movie.overview.substring(0, 150)}...</p>
            )}
            <button
              onClick={() => toggleDescription(movie.id)}
              className="read-more"
            >
              {expandedMovieId === movie.id ? "Show Less" : "Show More"}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="prev-next"
        >
          {"<"}
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active-page" : ""}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="prev-next"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
