import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/product'; // Import the action to fetch products
import ProductCard from './ProductCard'; // Import the ProductCard component

const ShowProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products); // Access products state

  useEffect(() => {
    dispatch(getProducts()); // Fetch products when component mounts
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} /> // Use ProductCard for each product
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
