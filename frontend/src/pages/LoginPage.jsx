import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login, clearAuthMessages } from "../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Logged in successfully");

      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      if (typeof error === "object") {
        const firstError = Object.values(error)[0];

        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error(error);
      }
    }

    return () => {
      dispatch(clearAuthMessages());
    };
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* HEADER */}

        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-red-400">
            Welcome Back
          </p>

          <h1 className="text-5xl font-black text-white">Login</h1>

          <p className="mt-3 text-slate-300">
            Continue your cinematic journey.
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="pt-2 text-center text-slate-300">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-red-400 transition hover:text-red-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
