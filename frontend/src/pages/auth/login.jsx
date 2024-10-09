import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, login } from "../../redux/slices/auth"; // Adjust the path as necessary
import toast from "react-hot-toast"; // For showing notifications

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

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
      window.location.reload();
    } else if (error) {
      toast.error(response.payload.msg);
    }
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const { email } = formData;

    // Dispatch the forgotPassword action
    const response = await dispatch(forgotPassword(email)); // No need for { email } since it expects a string

    // Check if the response was successful
    if (response.meta.requestStatus === "fulfilled") {
        toast.success("Code sent to your email!");
        navigate("/reset-password"); // Redirect to reset password page
    } else {
        // Extract the error message from the response payload
        const errorMessage = response.payload?.msg || "An error occurred. Please try again.";
        toast.error(errorMessage);
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
              className={`bg-green-600 text-white p-3 rounded-md text-xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600">
              Sign up
            </Link>
            <button onClick={handleForgotPassword} className="text-center text-gray-400 mt-4">
              forgot your password?
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
