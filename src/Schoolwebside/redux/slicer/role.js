import { createAsyncThunk , createSlice  } from "@reduxjs/toolkit";
import axiosInstance from "../../config/Axiosconfig";



 export const fetch = createAsyncThunk("fetch/role",async()=>{
    try {
        const response = await axiosInstance.get("/role");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user messages:", error);
        throw error;
    }
})

export const save = createAsyncThunk("save/role", async (roledata) => {
    try {
        const response = await axiosInstance.post("/role", roledata);
        return response.data.data;
    } catch (error) {
        console.error("Error saving role:", error);
        throw error;
    }
});


export const deletedata = createAsyncThunk("delete/role", async (id) => {
    try {
        await axiosInstance.delete(`/role/${id}`);
        // Return the id so we can use it in the reducer to filter out the deleted item
        return { _id: id };
    } catch (error) {
        console.error("Error deleting role:", error);
        throw error;
    }
});

export const updaterole= createAsyncThunk("update/role", async ({ roleId, updatedData }) => {
    try {
        const response = await axiosInstance.put(`/role/${roleId}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
});

const roleSlice = createSlice({
    name: "role",
    initialState: {
        data: [],
        error: null,
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetch.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(save.pending, (state) => {
                state.loading = true;
            })
            .addCase(save.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(save.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deletedata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletedata.fulfilled, (state, action) => {
                state.loading = false;
                // Make sure we have an _id to filter by
                if (action.payload && action.payload._id) {
                    state.data = state.data.filter(role => role._id !== action.payload._id);
                }
            })
            .addCase(deletedata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete role";
            })
            .addCase(updaterole.pending, (state) => {
                state.loading = true;
            })
            .addCase(updaterole.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updaterole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default roleSlice.reducer;