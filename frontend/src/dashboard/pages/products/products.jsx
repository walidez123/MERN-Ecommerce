import React, { useEffect, useState } from "react";
import CreateProduct from "./createProduct";
import ProductCard from "./productCard";
import StandardButton from "../../../components/buttons/standerdButton";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/slices/product"; // Adjust path as necessary
import { getCategories } from "../../../redux/slices/categories"; // Import the action to fetch categories
import { motion } from "framer-motion"; // Import framer-motion for animations

const Products = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState("products");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category
  
  const { products, loading: productsLoading } = useSelector((state) => state.products); // Products from the Redux store
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories); // Categories from Redux store
  
  const switchComponent = () => {
    setComponent((prevComponent) => (prevComponent === "products" ? "createProduct" : "products"));
  };

  useEffect(() => {
    dispatch(getProducts()); // Fetch products on mount
    dispatch(getCategories()); // Fetch categories on mount
  }, [dispatch]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter products based on search term and selected category
  const filteredProducts = products
    ?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) // Search term filtering
    .filter((product) => selectedCategory === "all" || product.category._id === selectedCategory); // Category filtering

  // Motion settings for animations
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        staggerChildren: 0.1, // Delay between each product card animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

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
        <>
          {/* Search and Category Filter */}
          <div className="w-full flex justify-center flex-col items-center mb-4">
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

          {/* Product Grid with Motion */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8 lg:p-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div>No products found</div>
            )}
          </motion.div>
        </>
      )}

      {component === "createProduct" && <CreateProduct />}
    </>
  );
};

export default Products;
