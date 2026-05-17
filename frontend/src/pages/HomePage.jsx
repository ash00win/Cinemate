import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  setSelectedGenre,
} from "../features/movies/movieSlice";

import MovieCard from "../components/MovieCard";

import HeroSection from "../components/HeroSection";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
  { id: 16, name: "Animation" },
];

function HomePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    genreMovies,
    selectedGenre,
  } = useSelector((state) => state.movies);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getTrendingMovies(1));

    dispatch(getPopularMovies());

    dispatch(getTopRatedMovies());

    dispatch(getUpcomingMovies());
  }, [dispatch]);

  const handleGenreClick = (genre) => {
    if (selectedGenre === genre.id) {
      dispatch(setSelectedGenre(null));

      return;
    }

    dispatch(setSelectedGenre(genre.id));

    dispatch(getMoviesByGenre(genre.id));
  };

  const handleViewAll = (movies, title) => {
    navigate("/search", {
      state: {
        movies,
        title,
      },
    });
  };

  const renderMovieRow = (title, movies) => {
    if (!movies?.length) return null;

    return (
      <section className="space-y-5">
        {/* SECTION HEADER */}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>

          <button
            onClick={() => handleViewAll(movies, title)}
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            View All
          </button>
        </div>

        {/* MOVIE ROW */}

        <div className="scrollbar-hide flex gap-5 overflow-x-auto pb-4">
          {movies.map((movie) => {
            const watchlistItem = items.find(
              (item) => item.tmdb_movie_id === movie.id,
            );

            return (
              <div
                key={movie.id}
                className="min-w-[180px] max-w-[180px] flex-shrink-0 md:min-w-[220px] md:max-w-[220px]"
              >
                <MovieCard
                  movie={movie}
                  isInWatchlist={!!watchlistItem}
                  watchlistId={watchlistItem?.tmdb_movie_id}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* HERO */}

      <HeroSection />

      {/* CONTENT */}

      <div className="relative z-20 mt-20 space-y-16 px-6 pb-20 md:px-10 lg:px-16">
        {/* GENRE FILTERS */}

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Browse Genres
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  selectedGenre === genre.id
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </section>

        {/* GENRE RESULTS */}

        {selectedGenre &&
          renderMovieRow(
            `${genres.find((g) => g.id === selectedGenre)?.name} Movies`,
            genreMovies,
          )}

        {/* DEFAULT SECTIONS */}

        {renderMovieRow("Trending Now", trendingMovies)}

        {renderMovieRow("Popular Movies", popularMovies)}

        {renderMovieRow("Top Rated", topRatedMovies)}

        {renderMovieRow("Upcoming", upcomingMovies)}
      </div>
    </div>
  );
}

export default HomePage;
