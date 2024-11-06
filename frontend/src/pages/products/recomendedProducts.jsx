import { Link } from "react-router-dom";
import StandardButton from "../../components/buttons/standerdButton";
import MotionComponent from "../../components/motion";
const RecomendedProducts = () => {
  return (
    <MotionComponent>
      <h1>recomended products</h1>
      <StandardButton>
        <Link to={'/products'}>Show More</Link>
      </StandardButton>
    </MotionComponent>
  
  );
};
export default RecomendedProducts;
