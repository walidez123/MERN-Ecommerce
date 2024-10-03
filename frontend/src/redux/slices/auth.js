// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'http://localhost:5000/api/auth';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/check-auth`, { withCredentials: true });
    return response.data; // Assume server returns user data on success
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk('auth/signup', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, formData, { withCredentials: true });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData, { withCredentials: true });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    return {};
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Handle signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
