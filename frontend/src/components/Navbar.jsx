import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { token } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const query = params.get("q") || "";

    setSearchQuery(query);
  }, [location.search]);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    navigate(`/search?q=${trimmedQuery}`);
  };

  return (
    <header className="border-b border-slate-700 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Cinemate
        </Link>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="hidden md:block">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white outline-none focus:border-red-500"
            />
          </form>

          <nav className="flex items-center gap-6">
            <Link to="/">Home</Link>

            <Link to="/watchlist">Watchlist</Link>

            <Link to="/comparisons">Comparisons</Link>

            {!token ? (
              <>
                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
