import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "src/Schoolwebside/config/Axiosconfig";

export const getdata = createAsyncThunk("mee/getdata", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/mee");
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updatedata = createAsyncThunk("mee/updatedata", async (updatedInfo, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/user/updateauthuser", updatedInfo);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const logoutMee = createAsyncThunk("mee/logoutMee", async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/user/logout");
    localStorage.removeItem("flag");
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const meeSlice = createSlice({
  name: "mee",
  initialState: {
    data: [],
    loading: false,
    error: null,
    students: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getdata.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.students = action.payload?.students ?? state.students;
      })
      .addCase(getdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export default meeSlice.reducer;