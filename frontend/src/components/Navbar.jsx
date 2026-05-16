import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState, useMemo, useRef } from "react";

import debounce from "lodash/debounce";

import { logout } from "../features/auth/authSlice";

import { fetchSearchSuggestions } from "../services/movieService";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { token } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const query = params.get("q") || "";

    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query.trim()) {
          setSuggestions([]);

          return;
        }

        try {
          setLoadingSuggestions(true);

          const results = await fetchSearchSuggestions(query);

          setSuggestions(results.slice(0, 5));

          setShowSuggestions(true);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 500),

    [],
  );

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    setShowSuggestions(false);

    navigate(`/search?q=${trimmedQuery}`);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setSearchQuery(value);

    debouncedSearch(value);
  };

  const handleSuggestionClick = (movieId) => {
    setShowSuggestions(false);

    setSearchQuery("");

    navigate(`/movies/${movieId}`);
  };

  return (
    <header className="border-b border-slate-700 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Cinemate
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-64 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white outline-none focus:border-red-500"
              />
            </form>

            {showSuggestions && (
              <div className="absolute left-0 top-12 z-50 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
                {loadingSuggestions ? (
                  <div className="p-4 text-sm text-slate-400">Searching...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSuggestionClick(movie.id)}
                      className="flex w-full items-center gap-3 border-b border-slate-800 px-4 py-3 text-left transition hover:bg-slate-800"
                    >
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="h-14 w-10 rounded object-cover"
                      />

                      <div>
                        <p className="font-medium text-white">{movie.title}</p>

                        <p className="text-sm text-slate-400">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-sm text-slate-400">
                    No movies found.
                  </div>
                )}
              </div>
            )}
          </div>

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
