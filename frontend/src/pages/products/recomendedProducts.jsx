import { Link } from "react-router-dom";
import StandardButton from "../../components/buttons/standerdButton";
const RecomendedProducts = () => {
  return (
    <div>
      <h1>recomended products</h1>
      <StandardButton>
        <Link to={'/products'}>Show More</Link>
      </StandardButton>
    </div>
  );
};
export default RecomendedProducts;
