import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  getMovieDetails,
  getSimilarMovies,
  getMovieVideos,
  getMovieReviews,
  getMovieCredits,
} from "../features/movies/movieSlice";

import {
  createWatchlistItem,
  deleteWatchlistItem,
} from "../features/watchlist/watchlistSlice";

import MovieCard from "../components/MovieCard";

function MovieDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [showTrailer, setShowTrailer] = useState(false);

  const {
    selectedMovie,
    similarMovies,
    movieVideos,
    movieReviews,
    loadingDetails,
    movieCredits,
    error,
  } = useSelector((state) => state.movies);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getMovieDetails(id));

    dispatch(getMovieVideos(id));

    dispatch(getSimilarMovies(id));

    dispatch(getMovieReviews(id));

    dispatch(getMovieCredits(id));
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
    return (
      <div className="space-y-12 animate-pulse">
        {/* HERO SKELETON */}

        <section className="relative overflow-hidden rounded-[32px]">
          <div className="relative h-[92vh] min-h-[760px] w-full overflow-hidden bg-slate-900">
            {/* BACKDROP */}

            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />

            {/* GLOW */}

            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black via-black/70 to-transparent" />

            {/* CONTENT */}

            <div className="relative z-20 flex h-full items-end">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 md:flex-row md:items-end md:px-10">
                {/* POSTER */}

                <div className="h-[420px] w-56 rounded-3xl bg-slate-800 shadow-2xl md:w-72" />

                {/* DETAILS */}

                <div className="flex-1 space-y-7">
                  {/* TITLE */}

                  <div className="space-y-4">
                    <div className="h-16 w-[80%] rounded-2xl bg-slate-800" />

                    <div className="h-16 w-[55%] rounded-2xl bg-slate-800" />
                  </div>

                  {/* META */}

                  <div className="flex flex-wrap gap-3">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="h-12 w-32 rounded-full bg-slate-800"
                      />
                    ))}
                  </div>

                  {/* OVERVIEW */}

                  <div className="space-y-4 pt-2">
                    <div className="h-5 w-full rounded bg-slate-800" />

                    <div className="h-5 w-[95%] rounded bg-slate-800" />

                    <div className="h-5 w-[88%] rounded bg-slate-800" />

                    <div className="h-5 w-[76%] rounded bg-slate-800" />
                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-5 pt-6">
                    <div className="h-14 w-48 rounded-2xl bg-slate-700" />

                    <div className="h-14 w-48 rounded-2xl bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAST SKELETON */}

        <div className="space-y-6">
          <div className="h-10 w-40 rounded-xl bg-slate-800" />

          <div className="flex gap-5 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="min-w-[170px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <div className="h-60 w-full bg-slate-800" />

                <div className="space-y-3 p-4">
                  <div className="h-5 w-full rounded bg-slate-700" />

                  <div className="h-4 w-24 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR MOVIES SKELETON */}

        <div className="space-y-6">
          <div className="h-10 w-60 rounded-xl bg-slate-800" />

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-slate-900"
              >
                <div className="aspect-[2/3] bg-slate-800" />

                <div className="space-y-3 p-4">
                  <div className="h-5 rounded bg-slate-700" />

                  <div className="h-4 w-20 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!selectedMovie) {
    return null;
  }

  return (
    <div className="space-y-16">
      {/* HERO SECTION */}

      <section className="relative overflow-hidden rounded-[32px]">
        {/* BACKDROP */}

        <div className="relative h-[92vh] min-h-[760px] w-full">
          <img
            src={selectedMovie.backdrop_url}
            alt={selectedMovie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* OVERLAYS */}

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          {/* CONTENT */}

          <div className="relative z-20 flex h-full items-end">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 md:flex-row md:items-end md:px-10">
              {/* POSTER */}

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
                className="flex-shrink-0"
              >
                <img
                  src={selectedMovie.poster_url}
                  alt={selectedMovie.title}
                  className="mx-auto w-56 rounded-3xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] md:mx-0 md:w-72"
                />
              </motion.div>

              {/* DETAILS */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="max-w-4xl space-y-7"
              >
                {/* TITLE */}

                <h1 className="text-5xl font-black leading-none text-white md:text-7xl">
                  {selectedMovie.title}
                </h1>

                {/* META */}

                <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                  <span className="rounded-full bg-yellow-500/20 px-4 py-2 font-semibold text-yellow-300 backdrop-blur-xl">
                    ⭐ {selectedMovie.rating?.toFixed(1)}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-xl">
                    📅 {selectedMovie.release_date}
                  </span>

                  <span className="rounded-full bg-red-500/20 px-4 py-2 text-red-300 backdrop-blur-xl">
                    🔥 Popularity {Math.round(selectedMovie.popularity)}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-xl">
                    ⏱️{" "}
                    {selectedMovie.runtime
                      ? `${selectedMovie.runtime} min`
                      : "N/A"}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-xl">
                    🌐{" "}
                    {selectedMovie.original_language
                      ? selectedMovie.original_language.toUpperCase()
                      : "N/A"}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-xl">
                    🎬 {selectedMovie.status || "Unknown"}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-xl">
                    {selectedMovie.adult ? "🔞 Adult" : "🟢 PG-13"}
                  </span>
                </div>

                {/* OVERVIEW */}

                <p className="max-w-3xl text-lg leading-9 text-slate-200 md:text-xl">
                  {selectedMovie.overview}
                </p>

                {/* ACTIONS */}

                <div className="flex flex-wrap gap-5 pt-2">
                  {!!trailer?.key && (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
                    >
                      ▶ Watch Trailer
                    </button>
                  )}

                  <button
                    onClick={handleWatchlist}
                    className={`rounded-2xl px-8 py-4 text-lg font-bold text-white transition hover:scale-105 ${
                      isInWatchlist
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {isInWatchlist ? "Remove Watchlist" : "Add Watchlist"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CAST */}

      {movieCredits?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-black">Cast</h2>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {movieCredits.map((actor) => (
              <Link key={actor.id} to={`/actors/${actor.id}`}>
                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  className="min-w-[170px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 transition hover:border-red-500"
                >
                  <img
                    src={
                      actor.profile_url ||
                      "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={actor.name}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="line-clamp-1 font-bold text-white">
                      {actor.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                      {actor.character}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS */}

      <div className="space-y-6">
        <h2 className="text-3xl font-black">Reviews</h2>

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
                className="rounded-3xl border border-slate-700 bg-slate-800 p-6 transition hover:border-red-500"
              >
                <h3 className="text-xl font-bold">{review.author}</h3>

                <p className="mt-4 line-clamp-6 leading-8 text-slate-300">
                  {review.content}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No reviews found.
          </div>
        )}
      </div>

      {/* SIMILAR MOVIES */}

      <div className="space-y-6">
        <h2 className="text-3xl font-black">Similar Movies</h2>

        {similarMovies?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
        ) : (
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No similar movies found.
          </div>
        )}
      </div>

      {/* TRAILER MODAL */}

      {showTrailer && trailer?.key && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute right-6 top-6 z-50 rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
          >
            ✕
          </button>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
            }}
            className="w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                allowFullScreen
                allow="autoplay"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;
