import { CiShoppingCart, CiLogin } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountDropdown from "./acountDropdown";
import StandardButton from "./buttons/standerdButton";
import GreenButton from "./buttons/greenButton";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get auth state

  return (
    <div className=" min-h-16 p-4 border-b-2">
      <div className="flex justify-between w-[80%] m-auto">
        <div className="flex items-center">
          <Link
            to={"/"}
            className="text-green-800 text-2xl text-[40px]  font-bold "
          >
            AUTH
          </Link>
        </div>

        <div className="flex gap-2 justify-center items-center">
          {isAuthenticated && (
            <Link to={"/cart"} className="text-white text-[40px]">
              <CiShoppingCart />
            </Link>
          )}

          {isAuthenticated ? (
            <AccountDropdown user={user} />
          ) : (
            <>
              

              <Link to={"/signup"}>
                <GreenButton>
                  <div className="flex">
                  <IoMdPersonAdd size={30} />
                  <span className="text-2xl">Signup</span>
                  </div>
                </GreenButton>
              </Link>
              <Link to={"/login"}>
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
