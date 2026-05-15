import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  getMovieDetails,
  getSimilarMovies,
  getMovieVideos,
  getMovieReviews,
} from "../features/movies/movieSlice";

import {
  createWatchlistItem,
  deleteWatchlistItem,
} from "../features/watchlist/watchlistSlice";

import MovieCard from "../components/MovieCard";

function MovieDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    selectedMovie,
    similarMovies,
    movieVideos,
    movieReviews,
    loadingDetails,
    error,
  } = useSelector((state) => state.movies);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getMovieDetails(id));

    dispatch(getMovieVideos(id));

    dispatch(getSimilarMovies(id));

    dispatch(getMovieReviews(id));
  }, [dispatch, id]);

  const trailer = useMemo(() => {
    if (!movieVideos?.length) {
      return null;
    }

    return movieVideos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );
  }, [movieVideos]);

  const watchlistItem = items.find(
    (item) => item.tmdb_movie_id === selectedMovie?.id,
  );

  const isInWatchlist = !!watchlistItem;

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(deleteWatchlistItem(watchlistItem.tmdb_movie_id));
    } else {
      dispatch(createWatchlistItem(selectedMovie.id));
    }
  };

  if (loadingDetails) {
    return <p className="text-2xl">Loading movie...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!selectedMovie) {
    return null;
  }

  return (
    <div className="space-y-12 md:space-y-16">
      {/* HERO SECTION */}

      <div className="relative overflow-hidden rounded-3xl">
        {/* BACKDROP */}

        <div className="relative h-[220px] w-full sm:h-[320px] md:h-[620px]">
          <img
            src={selectedMovie.backdrop_url}
            alt={selectedMovie.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* CONTENT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          {/* MOBILE LAYOUT */}

          <div className="relative z-10 flex flex-col items-center gap-4 bg-slate-950 px-4 pb-8 pt-4 text-center md:hidden">
            <img
              src={selectedMovie.poster_url}
              alt={selectedMovie.title}
              className="-mt-20 w-40 rounded-2xl border-4 border-slate-900 shadow-2xl"
            />

            <h1 className="text-3xl font-extrabold leading-tight text-white">
              {selectedMovie.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-300">
              <span className="rounded-full bg-yellow-500/20 px-3 py-2 text-yellow-300">
                ⭐ {selectedMovie.rating?.toFixed(1)}
              </span>

              <span className="rounded-full bg-slate-800/80 px-3 py-2">
                📅 {selectedMovie.release_date}
              </span>

              <span className="rounded-full bg-red-500/20 px-3 py-2 text-red-300">
                🔥 Popularity {Math.round(selectedMovie.popularity)}
              </span>
            </div>

            <p className="text-sm leading-8 text-slate-200">
              {selectedMovie.overview}
            </p>

            <button
              onClick={handleWatchlist}
              className={`mt-2 rounded-xl px-6 py-3 font-semibold transition ${
                isInWatchlist
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>

          {/* DESKTOP LAYOUT */}

          <div className="absolute bottom-10 left-0 hidden w-full flex-row items-end gap-8 p-8 md:flex">
            <img
              src={selectedMovie.poster_url}
              alt={selectedMovie.title}
              className="w-64 rounded-2xl border-4 border-slate-900 shadow-2xl"
            />

            <div className="max-w-4xl space-y-6">
              <h1 className="text-7xl font-extrabold text-white">
                {selectedMovie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-base text-slate-300">
                <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
                  ⭐ {selectedMovie.rating?.toFixed(1)}
                </span>

                <span className="rounded-full bg-slate-800/80 px-4 py-2">
                  📅 {selectedMovie.release_date}
                </span>

                <span className="rounded-full bg-red-500/20 px-4 py-2 text-red-300">
                  🔥 Popularity {Math.round(selectedMovie.popularity)}
                </span>
              </div>

              <p className="max-w-3xl text-xl leading-9 text-slate-200">
                {selectedMovie.overview}
              </p>

              <button
                onClick={handleWatchlist}
                className={`rounded-xl px-8 py-4 text-lg font-semibold transition ${
                  isInWatchlist
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TRAILER */}

      {!!trailer?.key && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold md:text-3xl">Trailer</h2>

          <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
              className="h-full w-full rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* REVIEWS */}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold md:text-3xl">Reviews</h2>

        {movieReviews?.length > 0 ? (
          <div className="space-y-6">
            {movieReviews.slice(0, 5).map((review) => (
              <motion.div
                key={review.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-5 transition-all duration-300 hover:border-red-500 md:p-6"
              >
                <h3 className="text-lg font-bold md:text-xl">
                  {review.author}
                </h3>

                <p className="mt-4 line-clamp-6 text-sm leading-7 text-slate-300 md:text-base">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No reviews found.
          </div>
        )}
      </div>

      {/* SIMILAR MOVIES */}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold md:text-3xl">Similar Movies</h2>

        {similarMovies?.length > 0 ? (
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {similarMovies.slice(0, 12).map((movie) => {
                const watchlistMovie = items.find(
                  (item) => item.tmdb_movie_id === movie.id,
                );

                return (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isInWatchlist={!!watchlistMovie}
                    watchlistId={watchlistMovie?.tmdb_movie_id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No similar movies found.
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
