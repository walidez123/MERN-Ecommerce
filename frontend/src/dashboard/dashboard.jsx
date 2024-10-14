import { Link, Outlet } from "react-router-dom";
import DashNav from "./dashNav.jsx"
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashNav/>
        
      {/* Outlet renders the child components */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
