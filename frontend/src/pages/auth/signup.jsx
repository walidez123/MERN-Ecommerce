import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/auth.js"; // Adjust the path as necessary
import { toast } from "react-hot-toast"; // Import toast
import StandardButton from "../../components/buttons/standerdButton.jsx";
import MotionComponent from "../../components/motion.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordII: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordII) {
      toast.error("Passwords do not match!"); // Show error toast
      return;
    }

    const { name, email, password } = formData;
    // Dispatch the signup action
    const response = await dispatch(signup({ name, email, password }));

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("account created  successfully!");
      navigate("/"); // Redirect to home page
      window.location.reload();
    } else if (error) {
      toast.error(response.payload.msg);
    }
  };

  return (
    <MotionComponent>
      <div className="w-screen min-h-screen flex flex-col">
        <div className="border min-w-[480px] mx-auto p-24 rounded-md shadow-xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="p-3 bg-white rounded-md text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-3 bg-white rounded-md text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="p-3 bg-white rounded-md text-black"
            />
            <input
              type="password"
              name="passwordII"
              placeholder="Confirm Password"
              required
              value={formData.passwordII}
              onChange={handleChange}
              className="p-3 bg-white rounded-md text-black"
            />
            <StandardButton
              className={`${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
              disabled={loading}
            >
              <button className="text-xl w-full">
                {loading ? "Creating an acount..." : "Signup"}
              </button>
            </StandardButton>
            {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          </form>
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </MotionComponent>
  );
};

export default Signup;
