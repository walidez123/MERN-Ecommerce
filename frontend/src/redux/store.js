// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/auth.js"
import categoryReducer from "./slices/categories.js"
import productReducer from "./slices/product.js"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});
