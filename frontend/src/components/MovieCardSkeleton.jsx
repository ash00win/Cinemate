function MovieCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-slate-800">
      <div className="h-72 w-full bg-slate-700"></div>

      <div className="space-y-3 p-3">
        <div className="h-5 w-3/4 rounded bg-slate-700"></div>

        <div className="flex justify-between">
          <div className="h-4 w-12 rounded bg-slate-700"></div>

          <div className="h-4 w-10 rounded bg-slate-700"></div>
        </div>

        <div className="h-10 w-full rounded-lg bg-slate-700"></div>
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
