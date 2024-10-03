"use client";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./pages/auth/signup.jsx";
import Login from "./pages/auth/login.jsx";
import Navbar from "./components/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/auth.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { useEffect } from "react";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get auth state
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth()); // Check authentication on app load
  },[checkAuth])
  return (
      <div className="bg-gray-900 min-h-screen overflow-hidden ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
          </div>
        </div>
        
        <div className="relative">
          <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
        <Toaster />
      </div>
  );
}

export default App;
