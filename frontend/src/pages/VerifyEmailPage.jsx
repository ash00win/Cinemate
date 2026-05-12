import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import api from "../api/axios";

function VerifyEmailPage() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify/${token}/`);

        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.error || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (loading) {
    return <div className="text-center text-2xl">Verifying email...</div>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 text-center">
      {success ? (
        <>
          <h1 className="text-4xl font-bold text-green-400">Email Verified</h1>

          <p className="text-lg text-slate-300">
            Your account has been verified successfully.
          </p>

          <Link
            to="/login"
            className="inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold"
          >
            Go to Login
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-red-500">
            Verification Failed
          </h1>

          <p className="text-lg text-slate-300">{error}</p>
        </>
      )}
    </div>
  );
}

export default VerifyEmailPage;
