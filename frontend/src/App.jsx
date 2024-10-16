"use client";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./pages/auth/signup.jsx";
import Login from "./pages/auth/login.jsx";
import Navbar from "./components/Navbar.jsx";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/auth.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Account from "./pages/auth/account.jsx";
import ResetPassword from "./pages/auth/resetPassword.jsx";
import Products from "./dashboard/pages/products/products.jsx";
import Categories from "./dashboard/pages/categories/categories.jsx";
import Dashboard from "./dashboard/dashboard.jsx"
import EditProduct from "./dashboard/pages/products/editeProduct.jsx";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);
  return (
    <div className="bg-[#262626] min-h-screen overflow-hidden ">
      <div className="relative">
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* dashboard links */}

           
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>
          </Routes>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
