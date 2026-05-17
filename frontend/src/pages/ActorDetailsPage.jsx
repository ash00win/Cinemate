import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getActorDetails, getActorMovies } from "../features/actors/actorSlice";

import MovieCard from "../components/MovieCard";

function ActorDetailsPage() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [showFullBio, setShowFullBio] = useState(false);

  const { actor, actorMovies, loading } = useSelector((state) => state.actors);

  const { items } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getActorDetails(id));

    dispatch(getActorMovies(id));

    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (loading || !actor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
        Loading actor details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
        {/* HERO SECTION */}

        <div className="flex flex-col gap-10 rounded-[32px] bg-gradient-to-br from-slate-900 to-[#08142b] p-8 shadow-2xl lg:flex-row lg:items-start">
          {/* IMAGE */}

          <div className="flex-shrink-0">
            <img
              src={actor.profile_url}
              alt={actor.name}
              className="h-[620px] w-full rounded-[32px] object-cover shadow-2xl lg:w-[380px]"
            />
          </div>

          {/* CONTENT */}

          <div className="flex-1">
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
              {actor.name}
            </h1>

            {/* META */}

            <div className="mt-8 flex flex-wrap gap-4">
              {actor.birthday && (
                <div className="rounded-full bg-slate-800 px-6 py-3 text-lg text-white">
                  🎂 {actor.birthday}
                </div>
              )}

              {actor.place_of_birth && (
                <div className="rounded-full bg-slate-800 px-6 py-3 text-lg text-white">
                  📍 {actor.place_of_birth}
                </div>
              )}

              <div className="rounded-full bg-yellow-500/20 px-6 py-3 text-lg font-semibold text-yellow-300">
                ⭐ Popularity {Math.round(actor.popularity || 0)}
              </div>
            </div>

            {/* BIOGRAPHY */}

            <div className="mt-10 max-w-5xl">
              <p
                className={`text-lg leading-10 text-slate-300 transition-all duration-300 ${
                  !showFullBio ? "line-clamp-6" : ""
                }`}
              >
                {actor.biography || "No biography available."}
              </p>

              {actor.biography?.length > 500 && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="mt-6 rounded-full border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-slate-700"
                >
                  {showFullBio ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KNOWN FOR */}

        <section className="mt-16">
          <h2 className="mb-8 text-4xl font-bold text-white">Known For</h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {actorMovies?.slice(0, 12).map((movie) => {
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
        </section>
      </div>
    </div>
  );
}

export default ActorDetailsPage;
