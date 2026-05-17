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
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-4 lg:px-14">
        {/* LOGO */}

        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-grey-500 transition hover:scale-[1.02]"
        >
          Cinemate
        </Link>

        <div className="flex items-center gap-5">
          {/* SEARCH */}

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
                className="w-72 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-xl transition focus:border-white/20"
              />
            </form>

            {/* SUGGESTIONS */}

            {showSuggestions && (
              <div className="absolute left-0 top-16 z-50 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/95 shadow-2xl backdrop-blur-xl">
                {loadingSuggestions ? (
                  <div className="p-4 text-sm text-slate-400">Searching...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSuggestionClick(movie.id)}
                      className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5"
                    >
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="h-14 w-10 rounded-md object-cover"
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

          {/* NAVIGATION */}

          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Home
            </Link>

            <Link
              to="/watchlist"
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              Watchlist
            </Link>

            {!token ? (
              <>
                <Link
                  to="/register"
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-gray-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
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
