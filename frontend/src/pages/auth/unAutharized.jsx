import { Link } from "react-router-dom";
import StandardButton from "../../components/buttons/standerdButton";

const Unauthorized = () => {
    return (
        <div className="text border p-4 text-white rounded-md justify-center items-center gap-4 flex flex-col">
            <h1>Unauthorized Access</h1>
            <p>You are not authorized to access this page.</p>
            <p>Please contact your administrator.</p>
            <Link to={'/'}>
                <StandardButton>go back home</StandardButton>
            </Link>
        </div>
    );
  };

export default Unauthorized;
  