import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/auth"; // Adjust the path as necessary
import toast from "react-hot-toast"; // For showing notifications
import MotionComponent from "../../components/motion";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    newPasswordII: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/"); // Redirect if authenticated
  }, [isAuthenticated, navigate]);

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
    const { token, newPassword, newPasswordII } = formData;

    if (newPassword !== newPasswordII) {
      toast.error("Passwords do not match!"); // Show error toast
      return;
    }

    const response = await dispatch(
      resetPassword({ resetToken: token, newPassword })
    );

    // Check if the reset password action was successful
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Password changed successfully!");
      navigate("/"); // Redirect to home page
    } else {
      toast.error(response.payload.msg || "Failed to reset password."); // Show error message
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <MotionComponent>
        <div className="bg-gray-900 min-w-[480px] mx-auto p-24 rounded-md shadow-xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text" // Changed to 'text' for token input
              name="token"
              placeholder="Token"
              required
              value={formData.token}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              required
              value={formData.newPassword}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
            <input
              type="password"
              name="newPasswordII"
              placeholder="Re-enter New Password"
              required
              value={formData.newPasswordII}
              onChange={handleChange}
              className="p-3 bg-gray-600 rounded-md text-white"
            />
            <button
              className={`bg-green-600 text-white p-3 rounded-md text-xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </MotionComponent>
    </div>
  );
};

export default ResetPassword;
