import { CiShoppingCart, CiLogin } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountDropdown from "./acountDropdown";
import StandardButton from "./buttons/standerdButton";
import GreenButton from "./buttons/greenButton";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { settings } = useSelector((state) => state.settings);
  const { totalItems } = useSelector((state) => state.cart);
  const isAdmin = user && user.role === "admin";

  return (
    <div className="min-h-16 p-4 border-b-2">
      <div className="flex justify-between w-[80%] m-auto">
        <div className="flex items-center">
          <Link to="/" className="text-green-800 text-2xl text-[40px] font-bold">
            {settings?.siteTitle}
          </Link>
        </div>
        <div className="flex gap-2 justify-center items-center">
          {isAdmin && (
            <Link to="/dashboard" className="text-2xl">
              <StandardButton>Go To Dashboard</StandardButton>
            </Link>
          )}
          {isAuthenticated && (
          <Link to="/cart" className="text-white text-[40px] relative">
          <CiShoppingCart />
          {totalItems > 0 && (
            <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
          )}
          {isAuthenticated ? (
            <AccountDropdown user={user} />
          ) : (
            <>
              <Link to="/signup">
                <GreenButton>
                  <div className="flex">
                    <IoMdPersonAdd size={30} />
                    <span className="text-2xl">Signup</span>
                  </div>
                </GreenButton>
              </Link>
              <Link to="/login">
                <StandardButton>
                  <div className="flex">
                    <CiLogin size={30} />
                    <span className="text-2xl">Login</span>
                  </div>
                </StandardButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
