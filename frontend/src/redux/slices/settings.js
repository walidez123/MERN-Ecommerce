import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the settings API
const BASE_URL = 'http://localhost:5000/api/settings';

// Initial state
const initialState = {
  settings: null,
  loading: false,
  error: null,
};

// Async thunk to fetch website settings
export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Async thunk to update website settings
export const updateSettings = createAsyncThunk('settings/updateSettings', async (settingsData, { rejectWithValue }) => {
  try {
    const response = await axios.put(BASE_URL, settingsData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Create the settings slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchSettings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Using payload for error message
      })
      // Handle updateSettings
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload; // Update the settings with the new data
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Using payload for error message
      });
  },
});

// Export the async thunks for use in components

// Export the reducer to be used in the store
export default settingsSlice.reducer;
