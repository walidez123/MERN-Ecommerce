import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth"; // Adjust the path as necessary
import toast from "react-hot-toast"; // For showing notifications

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Dispatch the login action
    const response = await dispatch(login({ email, password }));

    // Check if login is successful
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to home page
    } else if (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gray-900 min-w-[480px] mx-auto p-24 rounded-md shadow-xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
            <button
              className={`bg-green-600 text-white p-3 rounded-md text-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <p className="text-center text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
