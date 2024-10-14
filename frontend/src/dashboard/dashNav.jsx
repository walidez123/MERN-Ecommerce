import { NavLink } from "react-router-dom";
import StandardButton from "../components/buttons/standerdButton";
import SecendaryButton from "../components/buttons/secendaryButton"
const DashNav = () => {
  return (
    <div className="w-full p-2 border-b-2 flex justify-center gap-4 text-white">
      
      <NavLink 
        to="/dashboard/products" 
        className={({ isActive }) => 
          isActive ? "active-link" : "inactive-link"
        }
      >
        {({ isActive }) => 
          isActive ? <SecendaryButton>Products</SecendaryButton> : <StandardButton>Products</StandardButton>
        }
      </NavLink>

      <NavLink 
        to="/dashboard/categories" 
        className={({ isActive }) => 
          isActive ? "active-link" : "inactive-link"
        }
      >
        {({ isActive }) => 
          isActive ? <SecendaryButton>Categories</SecendaryButton> : <StandardButton>Categories</StandardButton>
        }
      </NavLink>

      <NavLink 
        to="/dashboard/orders" 
        className={({ isActive }) => 
          isActive ? "active-link" : "inactive-link"
        }
      >
        {({ isActive }) => 
          isActive ? <SecendaryButton>Orders</SecendaryButton> : <StandardButton>Orders</StandardButton>
        }
      </NavLink>

      <NavLink 
        to="/dashboard/settings" 
        className={({ isActive }) => 
          isActive ? "active-link" : "inactive-link"
        }
      >
        {({ isActive }) => 
          isActive ? <SecendaryButton>Settings</SecendaryButton> : <StandardButton>Settings</StandardButton>
        }
      </NavLink>
    </div>
  );
};

export default DashNav;
