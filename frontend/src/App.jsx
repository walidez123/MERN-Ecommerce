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
import Account from "./pages/auth/account.jsx";
import ResetPassword from "./pages/auth/resetPassword.jsx";
import Products from "./dashboard/pages/products/products.jsx";
import Categories from "./dashboard/pages/categories/categories.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import EditProduct from "./dashboard/pages/products/editeProduct.jsx";
import Unauthorized from "./pages/auth/unAutharized.jsx";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
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

            {/* Dashboard links */}
            {isAuthenticated && isAdmin ? (
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="products" element={<Products />} />
                <Route path="categories" element={<Categories />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
              </Route>
            ) : (
              <Route path="/dashboard/*" element={<Unauthorized/>} />
            )}
          </Routes>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
