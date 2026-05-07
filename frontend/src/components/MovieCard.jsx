function MovieCard({ movie }) {
  return (
    <div className="overflow-hidden rounded-xl bg-slate-800 shadow-lg">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="h-96 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{movie.title}</h2>

        <p className="mt-2 text-sm text-slate-300">Rating: {movie.rating}</p>

        <p className="mt-1 text-sm text-slate-400">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
