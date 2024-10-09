import { useState } from "react";
import { Link } from "react-router-dom";
import { CiLogout, CiUser } from "react-icons/ci"; // Use icons for styling
import ConfirmationModal from "./ConfirmationModal"; // Modal for logout confirmation
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";
import { toast } from "react-hot-toast";

const AccountDropdown = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // Dispatch logout action
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
    <div className="relative inline-block text-left">
      {/* Dropdown trigger */}
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="bg-gray-800 opacity-80 hover:opacity-100 p-2 rounded-md text-white text-[35px] flex justify-center items-center shadow-lg hover:drop-shadow-[0_0_10px_rgb(0,255,255)] transition-all duration-500"
      >
        <CiUser size={30} />
        <span className="text-2xl capitalize">{user?.name || "Account"}</span>
      </button>

      {/* Dropdown content */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              to="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Account Details
            </Link>
            <button
              onClick={handleLogoutClick}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default AccountDropdown;
