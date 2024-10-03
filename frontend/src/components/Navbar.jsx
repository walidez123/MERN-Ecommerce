import { CiShoppingCart, CiLogin, CiLogout } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/auth.js"; // Import logout action
import { toast } from "react-hot-toast"; // For showing notifications
import { useState } from "react"; // For managing modal visibility
import ConfirmationModal from "./ConfirmationModal"; // Import the modal

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // Dispatch the logout action
      toast.success("Logged out successfully!"); // Show success message
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const confirmLogout = () => {
    handleLogout(); // Confirm the logout and proceed
    closeModal(); // Close the modal
  };

  return (
    <div className="bg-black min-h-16 p-4">
      <div className="flex justify-between w-[80%] m-auto">
        <div className="flex items-center">
          <Link
            to={"/"}
            className="text-green-800 text-2xl text-[40px] bg-black font-bold p-4 rounded-lg hover:text-green-600 transition-all duration-500 shadow-lg hover:drop-shadow-[0_0_10px_rgb(0,255,255)]"
          >
            AUTH
          </Link>
        </div>

        <div className="flex gap-2 justify-center items-center">
          {isAuthenticated && (
            <Link
              to={"/cart"}
              className="text-white text-[40px] shadow-lg hover:drop-shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-500 p-2 bg-black rounded-lg"
            >
              <CiShoppingCart />
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogoutClick} // Open modal on logout click
                className="bg-gray-800 opacity-80 hover:opacity-100 p-2 rounded-md text-white text-[35px] flex justify-center items-center shadow-lg hover:drop-shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-500"
              >
                <CiLogout />
                <span className="text-2xl">Logout</span>
              </button>

              {/* Logout Confirmation Modal */}
              <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmLogout}
              />
            </>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="bg-green-800 opacity-80 hover:opacity-100 p-2 rounded-md text-white text-[35px] flex justify-center items-center gap-1 shadow-lg hover:drop-shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-500"
              >
                <IoMdPersonAdd size={30} />
                <span className="text-2xl">Signup</span>
              </Link>

              <Link
                to={"/login"}
                className="bg-gray-800 opacity-80 hover:opacity-100 p-2 rounded-md text-white text-[35px] flex justify-center items-center gap-1 shadow-lg hover:drop-shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-500"
              >
                <CiLogin size={30} />
                <span className="text-2xl">Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
