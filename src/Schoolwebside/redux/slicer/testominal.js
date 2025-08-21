import { createAsyncThunk , createSlice  } from "@reduxjs/toolkit";
import axiosInstance from "../../config/Axiosconfig";



 export const fetch = createAsyncThunk("fetch/userMessages",async()=>{
    try {
        const response = await axiosInstance.get("/testimonial");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user messages:", error);
        throw error;
    }
})

export const save = createAsyncThunk("save/userMessage", async (messagedata) => {
    try {
        const response = await axiosInstance.post("/testimonial", messagedata);
        return response.data.data;
    } catch (error) {
        console.error("Error saving user message:", error);
        throw error;
    }
});


export const deletedata = createAsyncThunk("delete/userMessage", async (id) => {
    try {
        const response = await axiosInstance.delete(`/testimonial/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error deleting user message:", error);
        throw error;
    }
});
 

export const updatedata = createAsyncThunk("update/userMessage", async ({id, data}) => {
    try {
        const response = await axiosInstance.put(`/testimonial/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating user message:", error);
        throw error;
    }
});


const testimonialSlice = createSlice({
    name: "testimonial",
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
            })
            .addCase(deletedata.fulfilled, (state, action) => {
                state.loading = false;
                // Determine deleted id from payload or from the original thunk argument as a fallback
                const deletedId = (action.payload && action.payload._id)
                    ? action.payload._id
                    : (action.payload || (action.meta && action.meta.arg));
                // Only filter if we have an array and a valid id
                if (Array.isArray(state.data) && deletedId) {
                    state.data = state.data.filter(item => item && item._id !== deletedId);
                }
                state.error = null; // Clear error on successful deletion
            })
            .addCase(deletedata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updatedata.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedata.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTestimonial = action.payload;
                if (updatedTestimonial && updatedTestimonial._id) {
                    state.data = state.data.map(item => 
                        item._id === updatedTestimonial._id ? updatedTestimonial : item
                    );
                }
                state.error = null;
            })
            .addCase(updatedata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default testimonialSlice.reducer;