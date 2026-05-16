import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { searchMovies } from "../../services/searchService";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query, thunkAPI) => {
    try {
      return await searchMovies(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Search failed");
    }
  },
);

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.length > 0) {
          state.results = action.payload;
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
