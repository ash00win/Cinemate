import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

import { fetchSearchResults } from "../features/movies/searchSlice";

import MovieCard from "../components/MovieCard";

function SearchPage() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const { results, loading, error } = useSelector((state) => state.search);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
    }
  }, [dispatch, query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-2xl font-semibold text-slate-300">
          Searching movies...
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Search failed</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Search Results</h1>

      {results.length === 0 ? (
        <p className="text-lg text-slate-300">
          No movies found for
          <span className="ml-2 font-bold text-white">"{query}"</span>
        </p>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.slice(0, 18).map((movie) => {
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
