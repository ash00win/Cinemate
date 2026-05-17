import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, clearAuthMessages } from "../features/auth/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(formData));
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* HEADER */}

        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-red-400">
            Join Cinemate
          </p>

          <h1 className="text-5xl font-black text-white">Register</h1>

          <p className="mt-3 text-slate-300">
            Create your personal movie universe.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-gray-300 p-4 text-black placeholder:text-gray-600 outline-none transition focus:border-red-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-gray-300 p-4 text-black placeholder:text-gray-600 outline-none transition focus:border-red-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-gray-300 p-4 text-black placeholder:text-gray-600 outline-none transition focus:border-red-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-red-500 p-4 text-lg font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {successMessage && (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </div>
          )}

          <p className="pt-2 text-center text-slate-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-400 transition hover:text-red-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
