import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';

// Fetch Mission, Vision, and Values from Firebase
export const fetchMVV = createAsyncThunk(
  'mvv/fetch',
  async () => {
    const docRef = doc(db, 'settings', 'missionVisionValues');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
);

// Save Mission, Vision, and Values to Firebase
export const saveMVV = createAsyncThunk(
  'mvv/save',
  async (data) => {
    await setDoc(doc(db, 'settings', 'missionVisionValues'), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return data;
  }
);

const mvvSlice = createSlice({
  name: 'mvv',
  initialState: {
    data: null,
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
      // Fetch cases
      .addCase(fetchMVV.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMVV.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchMVV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      // Save cases
      .addCase(saveMVV.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(saveMVV.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(saveMVV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save data';
        state.success = false;
      });
  },
});

export const { clearSuccess, clearError } = mvvSlice.actions;
export default mvvSlice.reducer;
