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
  fetchMoviesByGenre,
  fetchMovieCredits,
} from "../../services/movieService";

/* TRENDING */

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

/* GENRE MOVIES */


/* POPULAR */

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

/* TOP RATED */

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

/* UPCOMING */

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

/* MOVIE DETAILS */

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

/* SIMILAR MOVIES */

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

/* MOVIE VIDEOS */

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

/* MOVIE REVIEWS */

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

export const getMovieCredits = createAsyncThunk(
  "movies/getMovieCredits",
  async (movieId, thunkAPI) => {
    try {
      return await fetchMovieCredits(movieId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch cast",
      );
    }
  },
);

export const getMoviesByGenre = createAsyncThunk(
  "movies/getMoviesByGenre",
  async (genreId, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/movies/genre/${genreId}/`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch genre movies",
      );
    }
  },
);
/* INITIAL STATE */

const initialState = {
  trendingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  genreMovies: [],
  selectedGenre: null,

  similarMovies: [],
  movieVideos: [],
  movieReviews: [],
  movieCredits: [],

  selectedMovie: null,

  currentPage: 1,
  totalPages: 1,

  loadingTrending: false,
  loadingDetails: false,
  loadingSimilar: false,

  error: null,
};

/* SLICE */

const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;

      state.currentPage = 1;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* TRENDING */

      .addCase(getTrendingMovies.pending, (state) => {
        state.loadingTrending = true;

        state.error = null;
      })

      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.loadingTrending = false;

        state.trendingMovies = action.payload.results || [];

        state.currentPage = action.payload.page || 1;

        state.totalPages = action.payload.total_pages || 1;
      })

      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loadingTrending = false;

        state.error = action.payload;
      })

      /* GENRE MOVIES */

      .addCase(getMoviesByGenre.pending, (state) => {
        state.loadingTrending = true;

        state.error = null;
      })

      .addCase(getMoviesByGenre.fulfilled, (state, action) => {
        state.loadingTrending = false;

        state.genreMovies = action.payload.results || [];

        state.currentPage = action.payload.page || 1;

        state.totalPages = action.payload.total_pages || 1;
      })

      .addCase(getMoviesByGenre.rejected, (state, action) => {
        state.loadingTrending = false;

        state.genreMovies = [];

        state.error = action.payload;
      })
      .addCase(getMovieCredits.fulfilled, (state, action) => {
        state.movieCredits = action.payload;
      })

      /* POPULAR */

      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload.results || [];
      })

      /* TOP RATED */

      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload.results || [];
      })

      /* UPCOMING */

      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload.results || [];
      })

      /* MOVIE DETAILS */

      .addCase(getMovieDetails.pending, (state) => {
        state.loadingDetails = true;

        state.error = null;
      })

      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;

        state.selectedMovie = action.payload;
      })

      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loadingDetails = false;

        state.error = action.payload;
      })

      /* MOVIE VIDEOS */

      .addCase(getMovieVideos.fulfilled, (state, action) => {
        state.movieVideos = action.payload.results || [];
      })

      /* MOVIE REVIEWS */

      .addCase(getMovieReviews.fulfilled, (state, action) => {
        state.movieReviews = action.payload.results || [];
      })

      /* SIMILAR MOVIES */

      .addCase(getSimilarMovies.pending, (state) => {
        state.loadingSimilar = true;
      })

      .addCase(getSimilarMovies.fulfilled, (state, action) => {
        state.loadingSimilar = false;

        state.similarMovies = action.payload.results || [];
      })

      .addCase(getSimilarMovies.rejected, (state, action) => {
        state.loadingSimilar = false;

        state.error = action.payload;
      });
  },
});

export const { setSelectedGenre } = movieSlice.actions;

export default movieSlice.reducer;
