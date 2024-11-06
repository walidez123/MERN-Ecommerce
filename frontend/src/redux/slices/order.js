import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'http://localhost:5000/api/orders';

// Initial state
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// Async thunks for API calls

// Fetch all orders for a user
export const getOrders = createAsyncThunk('orders/getOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(BASE_URL); // Assume auth is handled in the request
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Fetch a single order by ID
export const getOrderById = createAsyncThunk('orders/getOrderById', async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/${orderId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Create a new order from cart
export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(BASE_URL, orderData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Delete an order by ID
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/${orderId}`);
    return orderId;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Orders slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getOrders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getOrderById
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // Add the new order to the list
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
