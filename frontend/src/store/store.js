import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "../features/movies/movieSlice";
import authReducer from "../features/auth/authSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import searchReducer from "../features/movies/searchSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    watchlist: watchlistReducer,
    search: searchReducer,
  },
});
