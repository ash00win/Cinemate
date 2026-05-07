import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import WatchlistPage from "../pages/WatchlistPage";
import ComparisonsPage from "../pages/ComparisonsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/watchlist" element={<WatchlistPage />} />

          <Route path="/comparisons" element={<ComparisonsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
