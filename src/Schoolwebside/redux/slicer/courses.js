import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

// Fetch all courses/programs from Firebase
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async () => {
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);
    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return courses;
  }
);

// Add a new course/program
export const addCourse = createAsyncThunk(
  'courses/add',
  async (courseData) => {
    const coursesCollection = collection(db, 'courses');
    const docRef = await addDoc(coursesCollection, {
      ...courseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return {
      id: docRef.id,
      ...courseData
    };
  }
);

// Update an existing course/program
export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, data }) => {
    const courseDoc = doc(db, 'courses', id);
    await updateDoc(courseDoc, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id, ...data };
  }
);

// Delete a course/program
export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id) => {
    const courseDoc = doc(db, 'courses', id);
    await deleteDoc(courseDoc);
    return id;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [],
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      // Add course
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data.push(action.payload);
        state.error = '';
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add course';
        state.success = false;
      })
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.data.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
        state.error = '';
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update course';
        state.success = false;
      })
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(course => course.id !== action.payload);
        state.success = true;
        state.error = '';
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete course';
      });
  },
});

export const { clearSuccess, clearError } = coursesSlice.actions;
export default coursesSlice.reducer;
