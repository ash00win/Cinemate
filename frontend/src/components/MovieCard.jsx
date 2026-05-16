import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  createWatchlistItem,
  deleteWatchlistItem,
} from "../features/watchlist/watchlistSlice";

function MovieCard({ movie, isInWatchlist = false, watchlistId = null }) {
  const dispatch = useDispatch();

  const handleWatchlist = (e) => {
    e.preventDefault();

    if (isInWatchlist && watchlistId) {
      dispatch(deleteWatchlistItem(watchlistId));
    } else {
      dispatch(createWatchlistItem(movie.id));
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      whileHover={{
        y: -6,
      }}
    >
      <Link to={`/movies/${movie.id}`}>
        <div className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg transition-all duration-300 hover:border-red-500 hover:shadow-red-500/10">
          {/* IMAGE */}

          <div className="overflow-hidden">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          {/* CONTENT */}

          <div className="p-4">
            <h2 className="line-clamp-1 text-lg font-semibold text-white">
              {movie.title}
            </h2>

            <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
              <span>{movie.release_date?.slice(0, 4)}</span>

              <span className="font-medium text-yellow-400">
                ⭐ {movie.rating?.toFixed(1)}
              </span>
            </div>

            {/* BUTTON */}

            <button
              onClick={handleWatchlist}
              className={`mt-4 w-full rounded-xl py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
                isInWatchlist
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isInWatchlist ? "Remove" : "Watchlist"}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default MovieCard;
