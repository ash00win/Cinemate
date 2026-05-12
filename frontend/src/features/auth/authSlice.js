import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { registerUser, loginUser } from "../../services/authService";

const userToken = localStorage.getItem("token");

const userData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const register = createAsyncThunk(
  "auth/register",

  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",

  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

const initialState = {
  token: userToken || null,

  user: userData || null,

  isAuthenticated: !!userToken,

  loading: false,

  successMessage: null,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      state.token = null;

      state.user = null;

      state.isAuthenticated = false;
    },

    clearAuthMessages: (state) => {
      state.error = null;

      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* REGISTER */

      .addCase(register.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.successMessage = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;

        state.successMessage =
          "Registration successful. Please verify your email.";
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* LOGIN */

      .addCase(login.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.access;

        state.user = action.payload.user;

        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.access);

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthMessages } = authSlice.actions;

export default authSlice.reducer;
