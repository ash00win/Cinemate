import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getWatchlist } from "../features/watchlist/watchlistSlice";

import MovieCard from "../components/MovieCard";

function WatchlistPage() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getWatchlist());

    window.scrollTo(0, 0);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
          <div className="animate-pulse space-y-10">
            <div className="space-y-4">
              <div className="h-14 w-72 rounded-2xl bg-slate-800" />

              <div className="h-5 w-96 rounded-xl bg-slate-900" />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
                >
                  <div className="aspect-[2/3] bg-slate-800" />

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
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020817] text-red-500">
        {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* HEADER */}

      <section className="border-b border-slate-800 bg-[#06152d]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            Personal Collection
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
                My Watchlist
              </h1>

              <p className="mt-4 text-lg text-slate-400">
                Your saved movies collection.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-300">
              {items.length} {items.length === 1 ? "Movie" : "Movies"}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
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
    </div>
  );
}

export default WatchlistPage;
