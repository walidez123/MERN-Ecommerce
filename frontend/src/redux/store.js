// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/auth.js"
import categoryReducer from "./slices/categories.js"
import productReducer from "./slices/product.js"
import settingsReducer from "./slices/settings.js"
import cartReducer from "./slices/cart.js"
import paymentReducer from "./slices/payment.js"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    settings: settingsReducer,
    cart: cartReducer,
    payment: paymentReducer,

  },
});
