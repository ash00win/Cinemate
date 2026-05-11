import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

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
    <Link to={`/movies/${movie.id}`}>
      <div className="overflow-hidden rounded-xl bg-slate-800 transition duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="h-72 w-full object-cover"
        />

        <div className="p-3">
          <h2 className="line-clamp-1 text-lg font-semibold">{movie.title}</h2>

          <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
            <span>{movie.release_date?.slice(0, 4)}</span>

            <span className="text-yellow-400">
              ⭐ {movie.rating?.toFixed(1)}
            </span>
          </div>

          <button
            onClick={handleWatchlist}
            className={`mt-3 w-full rounded-lg py-2 text-sm font-semibold transition ${
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
  );
}

export default MovieCard;
