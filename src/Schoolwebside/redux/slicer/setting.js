import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../Schoolwebside/config/firebase.js';
import { setDoc, getDoc, doc } from 'firebase/firestore';

export const fetchSchoolSettings = createAsyncThunk(
  'school/fetchSettings',
  async () => {
    const docRef = doc(db, 'settings', 'school');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
);

export const saveSchoolSettings = createAsyncThunk(
  'school/saveSettings',
  async (data) => {
    await setDoc(doc(db, 'settings', 'school'), {
      ...data,
      updatedAt: new Date().toISOString(),
      
    });
    return data;
  }
);


const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    data: null,
    loading: false,
    success: false,
    error: '',
    isEditing: false,
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
      .addCase(fetchSchoolSettings.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchSchoolSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isEditing = !!action.payload;
        state.error = '';
      })
      .addCase(fetchSchoolSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      })
      .addCase(saveSchoolSettings.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(saveSchoolSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isEditing = true;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(saveSchoolSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save settings';
        state.success = false;
      });
  },
});

export const { clearSuccess, clearError } = schoolSlice.actions;
export default schoolSlice.reducer;