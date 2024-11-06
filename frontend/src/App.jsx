"use client";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./pages/auth/signup.jsx";
import Login from "./pages/auth/login.jsx";
import Navbar from "./components/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/auth.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchSettings } from "./redux/slices/settings.js";

import Account from "./pages/auth/account.jsx";
import ResetPassword from "./pages/auth/resetPassword.jsx";
import Products from "./dashboard/pages/products/products.jsx";
import Categories from "./dashboard/pages/categories/categories.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import EditProduct from "./dashboard/pages/products/editeProduct.jsx";
import Unauthorized from "./pages/auth/unAutharized.jsx";
import WebsiteSettings from "./dashboard/pages/settings/websiteSettings.jsx";
import ShowProducts from "./pages/products/products.jsx";
import ProductDetail from "./pages/products/productDetailes.jsx";
import Cart from "./pages/cart/cart.jsx";
import Checkout from "./pages/cart/checkout.jsx";
function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchSettings());
  }, [dispatch]);

  // Function to check if user is an admin
  const isAdmin = user && user.role === "admin";

  return (
    <div className="bg-[#262626] min-h-screen overflow-hidden">
      <div className="relative">
        <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/products" element={<ShowProducts />} />
              <Route path="/products/:productId" element={<ProductDetail />} />

              {isAuthenticated ? (
                <Route path="/cart" element={<Cart />} />
              ) : (
                <Route path="/cart" element={<Unauthorized />} />
              )}
              {isAuthenticated ? (
                <Route path="/checkout" element={<Checkout />} />
              ) : (
                <Route path="/cart" element={<Unauthorized />} />
              )}

              {/* Dashboard links */}
              {isAuthenticated && isAdmin ? (
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="products" element={<Products />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="edit-product/:id" element={<EditProduct />} />
                  <Route path="settings" element={<WebsiteSettings />} />
                </Route>
              ) : (
                <Route path="/dashboard/*" element={<Unauthorized />} />
              )}
            </Routes>
          </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
