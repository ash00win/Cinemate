import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../features/movies/movieSlice";

import MovieCard from "../components/MovieCard";

function HomePage() {
  const dispatch = useDispatch();

  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,

    loadingTrending,
    currentPage,
    totalPages,
    error,
  } = useSelector((state) => state.movies);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getTrendingMovies(currentPage));

    dispatch(getPopularMovies());

    dispatch(getTopRatedMovies());

    dispatch(getUpcomingMovies());
  }, [dispatch]);

  const renderMovieGrid = (movies) => {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie) => {
          const watchlistItem = items.find(
            (item) => item.tmdb_movie_id === movie.id,
          );

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={!!watchlistItem}
              watchlistId={watchlistItem?.tmdb_movie_id}
            />
          );
        })}
      </div>
    );
  };

  if (loadingTrending) {
    return <div className="text-center text-2xl">Loading movies...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-xl text-red-500">Failed to load movies</p>

        <button
          onClick={() => dispatch(getTrendingMovies(currentPage))}
          className="mt-4 rounded-lg bg-red-500 px-4 py-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* TRENDING */}

      <section>
        <h1 className="mb-8 text-4xl font-bold">Trending Movies</h1>

        {renderMovieGrid(trendingMovies)}

        {/* PAGINATION */}

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => {
              if (currentPage > 1) {
                dispatch(getTrendingMovies(currentPage - 1));
              }
            }}
            disabled={currentPage === 1}
            className="rounded-lg bg-slate-700 px-5 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-lg font-semibold">Page {currentPage}</span>

          <button
            onClick={() => {
              if (currentPage < totalPages) {
                dispatch(getTrendingMovies(currentPage + 1));
              }
            }}
            disabled={currentPage === totalPages}
            className="rounded-lg bg-red-500 px-5 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>

      {/* POPULAR */}

      <section>
        <h2 className="mb-6 text-3xl font-bold">Popular Movies</h2>

        {renderMovieGrid(popularMovies)}
      </section>

      {/* TOP RATED */}

      <section>
        <h2 className="mb-6 text-3xl font-bold">Top Rated Movies</h2>

        {renderMovieGrid(topRatedMovies)}
      </section>

      {/* UPCOMING */}

      <section>
        <h2 className="mb-6 text-3xl font-bold">Upcoming Movies</h2>

        {renderMovieGrid(upcomingMovies)}
      </section>
    </div>
  );
}

export default HomePage;
