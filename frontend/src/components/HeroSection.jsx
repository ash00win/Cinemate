import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getTrendingMovies } from "../features/movies/movieSlice";

function HeroSection() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { trendingMovies } = useSelector((state) => state.movies);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!trendingMovies?.length) {
      dispatch(getTrendingMovies(1));
    }
  }, [dispatch, trendingMovies.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === trendingMovies.length - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [trendingMovies]);

  if (!trendingMovies?.length) return null;

  const movie = trendingMovies[currentIndex];

  return (
    <section className="relative h-[92vh] min-h-[720px] w-full overflow-hidden bg-black">
      {/* BACKDROP */}

      <AnimatePresence mode="wait">
        <motion.img
          key={movie.id}
          src={movie.backdrop_url}
          alt={movie.title}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* CINEMATIC OVERLAYS */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/20 to-transparent" />

      {/* CONTENT */}

      <div className="relative z-20 flex h-full items-center">
        <div className="w-full px-6 md:px-14 lg:px-24">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-16 max-w-3xl md:mt-10"
          >
            {/* META */}

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-300 backdrop-blur-xl">
                ⭐ {movie.rating?.toFixed(1)}
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl">
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>

            {/* TITLE */}

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
              {movie.title}
            </h1>

            {/* OVERVIEW */}

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              {movie.overview?.slice(0, 180)}...
            </p>

            {/* BUTTONS */}

            <div className="mt-12 flex flex-wrap gap-5">
              <button
                onClick={() => navigate(`/movies/${movie.id}`)}
                className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-slate-200"
              >
                <Play size={22} fill="currentColor" />
                Watch Now
              </button>

              <button
                onClick={() => navigate(`/movies/${movie.id}`)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
              >
                <Info size={22} />
                More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LEFT ARROW */}

      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? trendingMovies.length - 1 : prev - 1,
          )
        }
        className="absolute left-5 top-1/2 z-30 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-black/50"
      >
        <ChevronLeft size={34} />
      </button>

      {/* RIGHT ARROW */}

      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === trendingMovies.length - 1 ? 0 : prev + 1,
          )
        }
        className="absolute right-5 top-1/2 z-30 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-black/50"
      >
        <ChevronRight size={34} />
      </button>

      {/* INDICATORS */}

      <div className="absolute bottom-10 right-10 z-30 flex gap-3">
        {trendingMovies.slice(0, 8).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "h-2 w-10 bg-white"
                : "h-2 w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
