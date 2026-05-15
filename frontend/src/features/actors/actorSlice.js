import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchActorDetails,
  fetchActorMovies,
} from "../../services/actorService";

export const getActorDetails = createAsyncThunk(
  "actors/getActorDetails",
  async (actorId, thunkAPI) => {
    try {
      return await fetchActorDetails(actorId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch actor",
      );
    }
  },
);

export const getActorMovies = createAsyncThunk(
  "actors/getActorMovies",
  async (actorId, thunkAPI) => {
    try {
      return await fetchActorMovies(actorId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch movies",
      );
    }
  },
);

const initialState = {
  actor: null,
  actorMovies: [],
  loading: false,
  error: null,
};

const actorSlice = createSlice({
  name: "actors",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getActorDetails.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getActorDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.actor = action.payload;
      })

      .addCase(getActorDetails.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(getActorMovies.fulfilled, (state, action) => {
        state.actorMovies = action.payload;
      });
  },
});

export default actorSlice.reducer;
