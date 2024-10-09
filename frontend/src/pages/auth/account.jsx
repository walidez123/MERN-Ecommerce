import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { verifyEmail, resendCode } from "../../redux/slices/auth"; // Import the actions
import { toast } from "react-hot-toast";

const Account = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(""); // State to store user-entered verification code

  // Handle verification email resending
  const handleResendCode = async () => {
    try {
      await dispatch(resendCode(user.email)).unwrap(); // Dispatch resendCode action
      toast.success("Verification code sent!");
    } catch (error) {
      toast.error("Failed to send verification code.");
    }
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    try {
      await dispatch(verifyEmail({token: verificationCode })).unwrap(); // Pass the verification code
      toast.success("Email verified successfully!");
      window.location.reload()

    } catch (error) {
      toast.error("Failed to verify email.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col text-white p-8 w-[80%] m-auto">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>

      {/* Account Details Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Account Details</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {user?.isVerified ? "Verified" : "Not Verified"}
        </p>

        {/* Show verify email and resend code options if email is not verified */}
        {!user?.isVerified && (
          <div className="flex gap-2 items-center">
            {/* Input field for verification code */}
            <input
              className="text-white bg-gray-700 py-2 px-4 rounded-md mt-4"
              type="text"
              placeholder="Enter Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)} // Update state with entered code
            />

            {/* Button to verify email */}
            <button
              onClick={handleVerifyEmail} // Verify email with entered code
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mt-4"
            >
              Verify Email
            </button>

            {/* Resend code button */}
            <span className="items-center">or</span>
            <button
              onClick={handleResendCode} // Resend verification code
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
            >
              Resend Code
            </button>
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">My Orders</h2>
        {/* Add logic to display user's orders */}
        <p>You have no orders yet.</p>
        {/* Replace the above line with actual orders data */}
      </div>
    </div>
  );
};

export default Account;
