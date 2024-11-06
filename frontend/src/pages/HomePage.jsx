import MotionComponent from "../components/motion";
import RecomendedProducts from "./products/recomendedProducts";

const HomePage = () => {
  return (
    <MotionComponent>
      <div className="text-5xl text-white">
        <RecomendedProducts />
      </div>
    </MotionComponent>
  );
};
export default HomePage;
