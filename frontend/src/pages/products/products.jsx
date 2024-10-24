import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"; // Import framer-motion
import { getProducts } from "../../redux/slices/product"; // Import the action to fetch products
import { getCategories } from "../../redux/slices/categories"; // Import the action to fetch categories
import ProductCard from "./ProductCard"; // Import the ProductCard component

const ShowProducts = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products); // Access products state
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories); // Access categories state

  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category

  useEffect(() => {
    dispatch(getProducts()); // Fetch products when component mounts
    dispatch(getCategories()); // Fetch categories when component mounts
  }, [dispatch]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter products based on the search term and selected category
  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
    .filter((product) => selectedCategory === "all" || product.category._id === selectedCategory); // Filter by category

  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (productsError || categoriesError) {
    return <div>Error: {productsError || categoriesError}</div>;
  }

  // Motion settings for product list animation
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        staggerChildren: 0.1, // Delay between each product
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="w-full flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Available Products</h1>

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

      {/* Product list with motion */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <ProductCard product={product} /> {/* Use ProductCard for each product */}
            </motion.div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </motion.div>
    </div>
  );
};

export default ShowProducts;
