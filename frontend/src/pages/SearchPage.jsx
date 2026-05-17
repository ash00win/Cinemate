import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useSearchParams, useLocation } from "react-router-dom";

import { fetchSearchResults } from "../features/movies/searchSlice";

import MovieCard from "../components/MovieCard";

function SearchPage() {
  const dispatch = useDispatch();

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  // MOVIES PASSED FROM VIEW ALL
  const passedMovies = location.state?.movies || [];

  const passedTitle = location.state?.title || "Search Results";

  const { results, loading, error } = useSelector((state) => state.search);

  const { items } = useSelector((state) => state.watchlist);

  // CHECK WHETHER PAGE IS OPENED FROM VIEW ALL
  const isViewAllPage = passedMovies.length > 0;

  useEffect(() => {
    // DON'T RUN SEARCH API FOR VIEW ALL PAGES
    if (isViewAllPage) return;

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    dispatch(fetchSearchResults(trimmedQuery));
  }, [dispatch, query, isViewAllPage]);

  const moviesToRender = isViewAllPage ? passedMovies : results;

  const pageTitle = isViewAllPage ? passedTitle : `Search Results`;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-2xl font-semibold text-slate-300">
          Searching movies...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-red-500">Search failed</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            {pageTitle}
          </h1>

          <p className="mt-3 text-slate-400">
            {isViewAllPage
              ? "Explore the complete collection."
              : `Showing results for "${query}"`}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm">
          {moviesToRender.length}{" "}
          {moviesToRender.length === 1 ? "Movie" : "Movies"}
        </div>
      </div>

      {/* EMPTY STATE */}

      {moviesToRender.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/40">
          <p className="text-lg text-slate-400">
            No movies found
            {!isViewAllPage && (
              <span className="ml-2 font-semibold text-white">"{query}"</span>
            )}
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {moviesToRender.map((movie) => {
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
      )}
    </div>
  );
}

export default SearchPage;
