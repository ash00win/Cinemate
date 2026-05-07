import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getWatchlist } from "../features/watchlist/watchlistSlice";

import MovieCard from "../components/MovieCard";

function WatchlistPage() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getWatchlist());
  }, [dispatch]);

  if (loading) {
    return <p className="text-lg font-medium">Loading watchlist...</p>;
  }

  if (error) {
    return <p className="text-red-500">{JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">My Watchlist</h1>

      {items.length === 0 ? (
        <p className="text-slate-300">No movies in watchlist.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <MovieCard
              key={item.id}
              movie={item.movie}
              isInWatchlist={true}
              watchlistId={item.tmdb_movie_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
