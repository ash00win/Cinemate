import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getTrendingMovies } from "../features/movies/movieSlice";

import MovieCard from "../components/MovieCard";

function HomePage() {
  const dispatch = useDispatch();

  const { trendingMovies, loading, error } = useSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-2xl">Loading movies...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-xl text-red-500">Failed to load movies</p>

        <button
          onClick={() => dispatch(getTrendingMovies())}
          className="mt-4 rounded-lg bg-red-500 px-4 py-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Trending Movies</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
