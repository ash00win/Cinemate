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
    <div className="mx-auto max-w-md rounded-2xl bg-slate-800 p-8 shadow-xl transition-all duration-300">
      <h1 className="mb-6 text-4xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-700 p-3 transition-all duration-200 outline-none focus:border-red-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-700 p-3 transition-all duration-200 outline-none focus:border-red-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-red-500 p-3 font-bold transition-all duration-200 hover:scale-[1.02] hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-slate-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-400 hover:text-red-300">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
