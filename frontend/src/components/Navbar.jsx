import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-slate-700 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Cinemate
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/">Home</Link>

          <Link to="/watchlist">Watchlist</Link>

          <Link to="/comparisons">Comparisons</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
