import { NavLink } from "react-router-dom"; 
import StandardButton from "../../components/buttons/standerdButton";
import MotionComponent from "../../components/motion";

const ProductCard = ({ product }) => {
  return (
    <MotionComponent>

    <div className="flex flex-col gap-2 items-center border rounded-md p-4 text-white">
      <div className="flex w-full justify-between text-2xl">
        <h2>
          {product.name}{" "}
          <span className="text-sm">{product.stock} in stock</span>
        </h2>
        <span>{product.price}$</span>
      </div>
      <h3 className="flex justify-start w-full text-xl">
        {product.category.name}
      </h3>
      <p>{product.description}</p>
      <div className="flex p-2 justify-between w-full gap-4">
        <NavLink to={`/products/${product._id}`}>
          <StandardButton>Show Details</StandardButton>
        </NavLink>
      </div>
    </div>
    </MotionComponent>
  );
};

export default ProductCard;
