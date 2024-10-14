import DangerButton from "../../../components/buttons/dangerButton";
import StandardButton from "../../../components/buttons/standerdButton";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 items-center border rounded-md p-4 text-white">
      <div className="flex w-full justify-between text-2xl">
        <h2>
          {product.name} <span className="text-sm">{product.stock} in stock</span>
        </h2>
        <span>{product.price}$</span>
      </div>
      <h3 className="flex justify-start w-full text-xl">{product.category.name}</h3> {/* Access category name */}
      <p>{product.description}</p>
      <div className="flex p-2 justify-between w-full gap-4">
        <StandardButton>Edit</StandardButton>
        <DangerButton>Delete</DangerButton>
      </div>
    </div>
  );
};

export default ProductCard;
