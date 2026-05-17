import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../../services/watchlistService";

export const getWatchlist = createAsyncThunk(
  "watchlist/getWatchlist",
  async (_, thunkAPI) => {
    try {
      return await fetchWatchlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch watchlist",
      );
    }
  },
);

export const createWatchlistItem = createAsyncThunk(
  "watchlist/add",
  async (tmdbMovieId, thunkAPI) => {
    try {
      return await addToWatchlist({
        tmdb_movie_id: tmdbMovieId,
      });
    } catch (error) {
      console.log(error.response?.data);

      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add movie",
      );
    }
  },
);

export const deleteWatchlistItem = createAsyncThunk(
  "watchlist/delete",
  async (tmdbMovieId, thunkAPI) => {
    try {
      await removeFromWatchlist(tmdbMovieId);

      return tmdbMovieId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to remove movie",
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH WATCHLIST

      .addCase(getWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(getWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD MOVIE

      .addCase(createWatchlistItem.pending, (state) => {
        state.error = null;
      })

      .addCase(createWatchlistItem.fulfilled, (state, action) => {
        const exists = state.items.find(
          (item) => item.tmdb_movie_id === action.payload.tmdb_movie_id,
        );

        if (!exists) {
          state.items.unshift(action.payload);
        }
      })

      .addCase(createWatchlistItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE MOVIE

      .addCase(deleteWatchlistItem.pending, (state) => {
        state.error = null;
      })

      .addCase(deleteWatchlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.tmdb_movie_id !== action.payload,
        );
      })

      .addCase(deleteWatchlistItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default watchlistSlice.reducer;
