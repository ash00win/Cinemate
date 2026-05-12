import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  setSelectedGenre,
} from "../features/movies/movieSlice";

import MovieCard from "../components/MovieCard";

function HomePage() {
  const dispatch = useDispatch();

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Sci-Fi" },
    { id: 16, name: "Animation" },
  ];

  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,

    genreMovies,
    selectedGenre,

    loadingTrending,
    currentPage,
    totalPages,
  } = useSelector((state) => state.movies);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getTrendingMovies(1));

    dispatch(getPopularMovies());

    dispatch(getTopRatedMovies());

    dispatch(getUpcomingMovies());
  }, [dispatch]);

  const handleGenreClick = (genreId) => {
    dispatch(setSelectedGenre(genreId));

    dispatch(
      getMoviesByGenre({
        genreId,
        page: 1,
      }),
    );
  };

  const renderMovieGrid = (movies) => {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies?.length > 0 ? (
          movies.map((movie) => {
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
          })
        ) : (
          <p className="col-span-full text-center text-slate-400">
            No movies found.
          </p>
        )}
      </div>
    );
  };

  if (loadingTrending) {
    return <div className="text-center text-2xl">Loading movies...</div>;
  }

  const displayedMovies = selectedGenre ? genreMovies : trendingMovies;

  return (
    <div className="space-y-16">
      {/* TRENDING */}

      <section>
        <h1 className="mb-8 text-4xl font-bold">Trending Movies</h1>

        {/* GENRE FILTERS */}

        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => {
              dispatch(setSelectedGenre(null));

              dispatch(getTrendingMovies(1));
            }}
            className={`rounded-lg px-4 py-2 transition ${
              selectedGenre === null
                ? "bg-red-500"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            All
          </button>

          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`rounded-lg px-4 py-2 transition ${
                selectedGenre === genre.id
                  ? "bg-red-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* MOVIE GRID */}

        {renderMovieGrid(displayedMovies)}

        {/* RETRY BUTTON */}

        {displayedMovies?.length === 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                if (selectedGenre) {
                  dispatch(
                    getMoviesByGenre({
                      genreId: selectedGenre,
                      page: currentPage,
                    }),
                  );
                } else {
                  dispatch(getTrendingMovies(currentPage));
                }
              }}
              className="rounded-lg bg-red-500 px-4 py-2"
            >
              Retry
            </button>
          </div>
        )}

        {/* PAGINATION */}

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => {
              if (currentPage > 1) {
                if (selectedGenre) {
                  dispatch(
                    getMoviesByGenre({
                      genreId: selectedGenre,
                      page: currentPage - 1,
                    }),
                  );
                } else {
                  dispatch(getTrendingMovies(currentPage - 1));
                }
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
                if (selectedGenre) {
                  dispatch(
                    getMoviesByGenre({
                      genreId: selectedGenre,
                      page: currentPage + 1,
                    }),
                  );
                } else {
                  dispatch(getTrendingMovies(currentPage + 1));
                }
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

        {popularMovies?.length > 0 ? (
          renderMovieGrid(popularMovies)
        ) : (
          <p className="text-slate-400">Popular movies unavailable.</p>
        )}
      </section>

      {/* TOP RATED */}

      <section>
        <h2 className="mb-6 text-3xl font-bold">Top Rated Movies</h2>

        {topRatedMovies?.length > 0 ? (
          renderMovieGrid(topRatedMovies)
        ) : (
          <p className="text-slate-400">Top rated movies unavailable.</p>
        )}
      </section>

      {/* UPCOMING */}

      <section>
        <h2 className="mb-6 text-3xl font-bold">Upcoming Movies</h2>

        {upcomingMovies?.length > 0 ? (
          renderMovieGrid(upcomingMovies)
        ) : (
          <p className="text-slate-400">Upcoming movies unavailable.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;
