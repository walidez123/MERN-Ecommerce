import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/product";
import { getCategories } from "../../redux/slices/categories";
import ProductCard from "./ProductCard";
import MotionComponent from "../../components/motion";

const ShowProducts = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "all" || product.category._id === selectedCategory
    );

  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (productsError || categoriesError) {
    return <div>Error: {productsError || categoriesError}</div>;
  }

  return (
    <MotionComponent>
      <div>
        <div className="w-full flex justify-center flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Available Products
          </h1>

          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="p-2 w-4/5 mb-4 border border-gray-300 rounded"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 w-4/5 mb-4 border border-gray-300 rounded"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </MotionComponent>
  );
};

export default ShowProducts;
