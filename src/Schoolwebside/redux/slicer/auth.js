import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/Axiosconfig.js";

// LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", values);
      const data = response.data.data;

      if (data?.user) {
      
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("tokenExpiry", data.access_token_expires_in);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// REFRESH TOKEN THUNK
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { refreshToken } = getState().auth;
      const response = await axiosInstance.post("/api/refresh-token", {
        refresh_token: refreshToken,
      });

      const data = response.data.data;

      // Update localStorage
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("tokenExpiry", data.access_token_expires_in
);
      return {
        access_token: data.access_token,
        access_token_expires_in: data.access_token_expires_in,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// LOGOUT THUNK
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axiosInstance.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// LOCAL STORAGE INIT
const tokenFromStorage = localStorage.getItem("authToken");


const authSlice = createSlice({
  name: "auth",
  initialState: {
   
    token: tokenFromStorage || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    tokenExpiry: localStorage.getItem("tokenExpiry") || null,
    loading: false,
    error: null,
    isAuthenticated: !!tokenFromStorage,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.user = data.user;
        state.token = data.access_token;
        state.refreshToken = data.refresh_token;
        state.tokenExpiry = data.access_token_expires_in;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REFRESH TOKEN
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.tokenExpiry = action.payload.access_token_expires_in;
        localStorage.setItem("authToken", action.payload.access_token);
        localStorage.setItem("tokenExpiry", action.payload.access_token_expires_in);
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload;
        state.token = null;
        state.refreshToken = null;
        state.tokenExpiry = null;
        state.isAuthenticated = false;
        localStorage.clear();
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.tokenExpiry = null;
        state.isAuthenticated = false;
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetError, logout } = authSlice.actions;
export default authSlice.reducer;