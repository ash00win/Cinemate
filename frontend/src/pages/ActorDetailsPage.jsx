import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { getActorDetails, getActorMovies } from "../features/actors/actorSlice";

import MovieCard from "../components/MovieCard";

function ActorDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { actor, actorMovies, loading, error } = useSelector(
    (state) => state.actors,
  );

  useEffect(() => {
    dispatch(getActorDetails(id));

    dispatch(getActorMovies(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-2xl font-semibold text-slate-300">
          Loading actor...
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{JSON.stringify(error)}</p>;
  }

  if (!actor) {
    return null;
  }

  return (
    <div className="space-y-14">
      {/* HERO */}

      <div className="overflow-hidden rounded-3xl bg-slate-900">
        <div className="flex flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-10">
          {/* IMAGE */}

          <div className="mx-auto shrink-0 md:mx-0">
            <div className="h-[420px] w-[280px] overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                src={actor.profile_url}
                alt={actor.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* CONTENT */}

          <div className="flex-1 space-y-6">
            <h1 className="text-center text-4xl font-black leading-tight md:text-left md:text-7xl">
              {actor.name}
            </h1>

            {/* META */}

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm md:text-base">
                🎂 {actor.birthday}
              </span>

              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm md:text-base">
                📍 {actor.place_of_birth}
              </span>

              <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm text-yellow-300 md:text-base">
                ⭐ Popularity {Math.round(actor.popularity)}
              </span>
            </div>

            {/* BIO */}

            <div className="max-h-[500px] overflow-y-auto pr-2">
              <p className="text-sm leading-8 text-slate-300 md:text-lg">
                {actor.biography}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KNOWN FOR */}

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Known For</h2>

        {actorMovies?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {actorMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center text-slate-400">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ActorDetailsPage;
