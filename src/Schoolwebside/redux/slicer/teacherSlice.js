import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/Axiosconfig";

// Initial State
const initialState = {
  teachers: [],
  loading: false,
  error: null,
  selectedTeacher: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  }
};

// Async Thunks - All API calls centralized
export const fetchTeachers = createAsyncThunk(
  'teacher/fetchTeachers',
  async ({ page = 1, limit = 10 } = {}) => {
    const response = await axiosInstance.get(`/teacher?page=${page}&limit=${limit}`);
    return {
      teachers: response.data.teachers || response.data.data,
      pagination: {
        currentPage: response.data.pagination.currentPage || page,
        totalPages: response.data.pagination.totalPages || 1,
        totalItems: response.data.pagination.totalItems || 0,
        itemsPerPage: response.data.pagination.itemsPerPage || limit
      }
    };
  }
);

export const addTeacher = createAsyncThunk(
  'teacher/addTeacher',
  async (teacherData) => {
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(teacherData).forEach(key => {
      if (key === 'photo' && teacherData[key] instanceof File) {
        formData.append(key, teacherData[key]);
      } else {
        formData.append(key, teacherData[key]);
      }
    });
    
    const response = await axiosInstance.post('/teacher', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data.data || response.data.data;
  }
);

export const updateTeacher = createAsyncThunk(
  'teacher/updateTeacher',
  async ({ id, data }) => {
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(data).forEach(key => {
      if (key === 'photo' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    
    const response = await axiosInstance.put(`/teacher/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return { ...response.data.data || response.data.data, id };
  }
);

export const deleteTeacher = createAsyncThunk(
  'teacher/deleteTeacher',
  async (teacherId) => {
    await axiosInstance.delete(`/teacher/${teacherId}`);
    return teacherId;
  }
);

// Teacher Slice - All reducers in one place
const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    // Synchronous reducers
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Teachers
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        // Create a copy of the array before sorting
        const sortedTeachers = [...action.payload.teachers].sort((a, b) => a.order - b.order);
        state.teachers = sortedTeachers;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Add Teacher
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        // If we have pagination, let the next fetch handle updating the list
        // Otherwise, add to the current list
        if (state.pagination.totalPages <= 1) {
          const newTeacher = {
            ...action.payload,
            id: action.payload.id || action.payload._id || Date.now(),
            order: action.payload.order || Math.max(...state.teachers.map(t => t.order), 0) + 1
          };
          // Create a new array with the new teacher and sort it
          const newTeachersArray = [...state.teachers, newTeacher];
          state.teachers = newTeachersArray.sort((a, b) => a.order - b.order);
        }
        state.error = null;
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Update Teacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const updatedId = action.payload.id || action.payload._id;
        // Create a new mapped array and then sort it
        const updatedTeachers = state.teachers.map(teacher =>
          (teacher.id === updatedId || teacher._id === updatedId) 
            ? action.payload 
            : teacher
        );
        state.teachers = updatedTeachers.sort((a, b) => a.order - b.order);
        state.error = null;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Delete Teacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.teachers = state.teachers.filter(teacher => 
          teacher.id !== deletedId && teacher._id !== deletedId
        );
        state.error = null;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export actions and reducer
export const { 
  setSelectedTeacher, 
  clearError, 
  resetState,
  setPage
} = teacherSlice.actions;

// Selectors
export const selectAllTeachers = (state) => state.teacher.teachers;
export const selectTeachersLoading = (state) => state.teacher.loading;
export const selectTeachersError = (state) => state.teacher.error;
export const selectSelectedTeacher = (state) => state.teacher.selectedTeacher;
export const selectPagination = (state) => state.teacher.pagination;
export const selectTeacherById = (state, teacherId) => 
  state.teacher.teachers.find(teacher => 
    teacher.id === teacherId || teacher._id === teacherId
  );

export default teacherSlice.reducer;
