import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchMovieVideos,
  fetchMovieReviews,
} from "../../services/movieService";

export const getTrendingMovies = createAsyncThunk(
  "movies/getTrendingMovies",

  async (page = 1, thunkAPI) => {
    try {
      return await fetchTrendingMovies(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
  },
);

export const getPopularMovies = createAsyncThunk(
  "movies/popular",

  async (_, thunkAPI) => {
    try {
      return await fetchPopularMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch popular movies",
      );
    }
  },
);

export const getTopRatedMovies = createAsyncThunk(
  "movies/topRated",

  async (_, thunkAPI) => {
    try {
      return await fetchTopRatedMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch top rated movies",
      );
    }
  },
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/upcoming",

  async (_, thunkAPI) => {
    try {
      return await fetchUpcomingMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch upcoming movies",
      );
    }
  },
);

export const getMovieDetails = createAsyncThunk(
  "movies/details",

  async (movieId, thunkAPI) => {
    try {
      return await fetchMovieDetails(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch movie details",
      );
    }
  },
);

export const getSimilarMovies = createAsyncThunk(
  "movies/similar",

  async (movieId, thunkAPI) => {
    try {
      return await fetchSimilarMovies(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch similar movies",
      );
    }
  },
);

export const getMovieVideos = createAsyncThunk(
  "movies/videos",

  async (movieId, thunkAPI) => {
    try {
      return await fetchMovieVideos(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch videos",
      );
    }
  },
);

export const getMovieReviews = createAsyncThunk(
  "movies/reviews",

  async (movieId, thunkAPI) => {
    try {
      return await fetchMovieReviews(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch reviews",
      );
    }
  },
);

const initialState = {
  trendingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],

  similarMovies: [],
  movieVideos: [],
  movieReviews: [],

  selectedMovie: null,

  currentPage: 1,
  totalPages: 1,

  loadingTrending: false,
  loadingDetails: false,
  loadingSimilar: false,

  error: null,
};

const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // TRENDING MOVIES

      .addCase(getTrendingMovies.pending, (state) => {
        state.loadingTrending = true;

        state.error = null;
      })

      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.loadingTrending = false;

        if (!action.payload.error) {
          state.trendingMovies = action.payload.results || [];

          state.currentPage = action.payload.page || 1;

          state.totalPages = action.payload.total_pages || 1;
        }
      })

      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loadingTrending = false;

        state.error = action.payload;
      })

      // POPULAR MOVIES

      .addCase(getPopularMovies.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.popularMovies = action.payload.results || [];
        }
      })

      // TOP RATED MOVIES

      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.topRatedMovies = action.payload.results || [];
        }
      })

      // UPCOMING MOVIES

      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.upcomingMovies = action.payload.results || [];
        }
      })

      // MOVIE DETAILS

      .addCase(getMovieDetails.pending, (state) => {
        state.loadingDetails = true;

        state.error = null;
      })

      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;

        if (!action.payload.error) {
          state.selectedMovie = action.payload;
        }
      })

      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loadingDetails = false;

        state.error = action.payload;
      })

      // MOVIE VIDEOS

      .addCase(getMovieVideos.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.movieVideos = action.payload.results || [];
        }
      })

      // MOVIE REVIEWS

      .addCase(getMovieReviews.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.movieReviews = action.payload.results || [];
        }
      })

      // SIMILAR MOVIES

      .addCase(getSimilarMovies.pending, (state) => {
        state.loadingSimilar = true;
      })

      .addCase(getSimilarMovies.fulfilled, (state, action) => {
        state.loadingSimilar = false;

        if (!action.payload.error) {
          state.similarMovies = action.payload.results || [];
        }
      })

      .addCase(getSimilarMovies.rejected, (state, action) => {
        state.loadingSimilar = false;

        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
