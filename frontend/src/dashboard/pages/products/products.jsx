import { useEffect, useState } from "react";
import CreateProduct from "./createProduct";
import ProductCard from "./productCard";
import StandardButton from "../../../components/buttons/standerdButton";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/slices/product"; // Adjust path as necessary

const Products = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState("products");
  const products = useSelector((state) => state.products.products); // Assuming products are in the Redux store

  const switchComponent = () => {
    if (component === "products") {
      setComponent("createProduct");
    } else {
      setComponent("products");
    }
  };

  useEffect(() => {
    dispatch(getProducts()); // Fetch products on mount
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl justify-center m-auto border-b-2">
          {component === "products" ? "Products" : "Create Product"}
        </h1>
        <button onClick={switchComponent}>
          <StandardButton>
            {component === "products" ? "Create Product" : "View Products"}
          </StandardButton>
        </button>
      </div>
      {component === "products" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8 lg:p-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} /> 
          ))}
        </div>
      )}
      {component === "createProduct" && <CreateProduct />}
    </>
  );
};

export default Products;
