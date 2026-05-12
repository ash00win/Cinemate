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
    <div className="mx-auto max-w-md rounded-xl bg-slate-800 p-8">
      <h1 className="mb-6 text-3xl font-bold">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-700 p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-700 p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg bg-slate-700 p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-500 p-3 font-bold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {successMessage && (
          <div className="rounded-lg bg-green-500/20 p-3 text-green-400">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-500/20 p-3 text-red-400">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}

        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
