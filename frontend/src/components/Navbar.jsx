import { CiShoppingCart, CiLogin } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountDropdown from "./acountDropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get auth state

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
            <AccountDropdown user={user} /> // Show the AccountDropdown when authenticated
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
