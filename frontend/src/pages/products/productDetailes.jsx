import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/slices/product'; // Ensure this action fetches a single product
import { addToCart } from '../../redux/slices/cart'; // Import the addToCart action
import { useParams } from 'react-router-dom';
import StandardButton from '../../components/buttons/standerdButton';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(productId)); // Fetch product details by ID
  }, [dispatch, productId]);

  // Function to handle adding product to the cart
  const handleAddToCart = async () => {
    const response = await dispatch(addToCart({ productId, quantity: 1 }));
    console.log("Response:", response); // Log the response
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Product added to cart!");
    } else if (response.payload) {
      toast.error(response.payload.msg);
    }
  };
  
  
 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 border rounded-lg w-4/5 m-auto text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg">{product.description}</p>
      <p className="text-xl">Price: ${product.price}</p>
      <p className="text-lg">Category: {product.category.name}</p>
      <p className="text-lg">Stock: {product.stock} available</p>
      <button onClick={handleAddToCart}>
        <StandardButton>
          Add to Cart
        </StandardButton>
      </button>
    </div>
  );
};

export default ProductDetail;
