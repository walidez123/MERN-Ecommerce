import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/auth.js"; // Adjust the path as necessary
import { toast } from "react-hot-toast"; // Import toast

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordII: "",
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
    if (formData.password !== formData.passwordII) {
      toast.error("Passwords do not match!"); // Show error toast
      return;
    }

    const { name, email, password } = formData;
    // Dispatch the signup action
    const result = await dispatch(signup({ name, email, password }));

    if (signup.fulfilled.match(result)) {
      toast.success("Account created successfully!"); // Show success toast
      navigate("/"); // Redirect to home page
    } else {
      toast.error(result.payload); // Show error toast with the message from the payload
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
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
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
            <input
              type="password"
              name="passwordII"
              placeholder="Confirm Password"
              required
              value={formData.passwordII}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
            <button
              className={`bg-green-600 text-white p-3 rounded-md text-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create an account'}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
