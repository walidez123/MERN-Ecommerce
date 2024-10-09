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
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ token }, { rejectWithValue }) => {  // Take token as input
    try {
      // Send the token to the backend in the request body
      const response = await axios.post(`${BASE_URL}/verify-email`, { token }, { withCredentials: true });
      return response.data;  // Return the server response
    } catch (err) {
      // If the request fails, return the error response
      return rejectWithValue(err.response.data);
    }
  }
);
export const resendCode = createAsyncThunk(
  'auth/resendCode',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/resend-code`, { email }, { withCredentials: true });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email }, { withCredentials: true });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ resetToken, newPassword }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, { resetToken:resetToken, newPassword:newPassword }, { withCredentials: true });
    return response.data;
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
      })
      // Handle verifyEmail
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.loading = false;
        // You can also show a success message here if needed
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});



export default authSlice.reducer;
