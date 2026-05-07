import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchTrendingMovies } from "../../services/movieService";

export const getTrendingMovies = createAsyncThunk(
  "movies/getTrendingMovies",
  async (_, thunkAPI) => {
    try {
      return await fetchTrendingMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
  },
);

const initialState = {
  trendingMovies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;

        state.trendingMovies = action.payload.results;
      })

      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
