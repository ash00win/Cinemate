import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  getMovieDetails,
  getSimilarMovies,
  getMovieVideos,
  getMovieReviews,
} from "../features/movies/movieSlice";

import MovieCard from "../components/MovieCard";

function MovieDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    selectedMovie,
    similarMovies,
    movieVideos,
    movieReviews,
    loadingDetails,
    error,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(id));

    dispatch(getMovieVideos(id));

    dispatch(getSimilarMovies(id));
    dispatch(getMovieReviews(id));
  }, [dispatch, id]);

  const trailer = movieVideos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  if (loadingDetails) {
    return <p className="text-2xl">Loading movie...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!selectedMovie) {
    return null;
  }

  return (
    <div className="space-y-12">
      <img
        src={selectedMovie.backdrop_url}
        alt={selectedMovie.title}
        className="h-[400px] w-full rounded-xl object-cover"
      />

      <div className="flex flex-col gap-8 md:flex-row">
        <img
          src={selectedMovie.poster_url}
          alt={selectedMovie.title}
          className="w-64 rounded-xl"
        />

        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{selectedMovie.title}</h1>

          <p className="text-lg leading-8 text-slate-300">
            {selectedMovie.overview}
          </p>

          <div className="space-y-3 text-lg">
            <p>⭐ Rating: {selectedMovie.rating}</p>

            <p>📅 Release: {selectedMovie.release_date}</p>

            <p>🔥 Popularity: {selectedMovie.popularity}</p>
          </div>
        </div>
      </div>

      {/* TRAILER */}

      {trailer && (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Trailer</h2>

          <div className="overflow-hidden rounded-xl">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        </div>
      )}

      {/* REVIEWS */}

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Reviews</h2>

        {movieReviews?.length > 0 ? (
          <div className="space-y-6">
            {movieReviews.slice(0, 5).map((review) => (
              <div key={review.id} className="rounded-xl bg-slate-800 p-5">
                <h3 className="text-xl font-bold">{review.author}</h3>

                <p className="mt-3 line-clamp-6 text-slate-300">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No reviews found.</p>
        )}
      </div>
      
      {/* SIMILAR MOVIES */}

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Similar Movies</h2>

        {similarMovies?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {similarMovies.slice(0, 6).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No similar movies found.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
