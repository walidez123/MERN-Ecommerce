import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'http://localhost:5000/api/products';

// Initial state
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Async thunks for API calls

// Fetch all products
export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;  // Assume the server returns a list of products
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Fetch product by ID
export const getProductById = createAsyncThunk('products/getProductById', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productId}`);
    return response.data;  // Return the single product
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Create a new product
export const createProduct = createAsyncThunk('products/createProduct', async (productData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}`, productData);
    return response.data;  // Return the newly created product
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Products slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;  // Update state with fetched products
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getProductById
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;  // Set the single product data
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);  // Add the new product to the list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
