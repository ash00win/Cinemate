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
    return (
      <div className="space-y-10 animate-pulse">
        {/* HEADER */}

        <div className="space-y-4">
          <div className="h-12 w-72 rounded-2xl bg-slate-800" />

          <div className="h-5 w-96 rounded-xl bg-slate-900" />
        </div>

        {/* GRID */}

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
            >
              {/* POSTER */}

              <div className="aspect-[2/3] bg-slate-800" />

              {/* CONTENT */}

              <div className="space-y-4 p-4">
                <div className="h-5 rounded-lg bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 rounded bg-slate-800" />

                  <div className="h-4 w-12 rounded bg-slate-800" />
                </div>

                <div className="h-11 rounded-xl bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{JSON.stringify(error)}</p>;
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            My Watchlist
          </h1>

          <p className="mt-2 text-slate-400">Your saved movies collection.</p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-300">
          {items.length} {items.length === 1 ? "Movie" : "Movies"}
        </div>
      </div>

      {/* EMPTY */}

      {items.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-700 bg-slate-900/60 px-6 text-center">
          <div className="mb-6 text-7xl">🎬</div>

          <h2 className="text-3xl font-black text-white">
            Your watchlist is empty
          </h2>

          <p className="mt-4 max-w-md text-lg leading-8 text-slate-400">
            Save movies to your watchlist and build your personal cinema
            collection.
          </p>
        </div>
      ) : (
        /* MOVIES */

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
