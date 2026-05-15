import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import WatchlistPage from "../pages/WatchlistPage";
import ComparisonsPage from "../pages/ComparisonsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import SearchPage from "../pages/SearchPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import ActorDetailsPage from "../pages/ActorDetailsPage";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />

          <Route
            path="/comparisons"
            element={
              <ProtectedRoute>
                <ComparisonsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/actors/:id" element={<ActorDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify/:token" element={<VerifyEmailPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
