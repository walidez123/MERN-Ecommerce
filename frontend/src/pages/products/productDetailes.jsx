import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/slices/product'; // Ensure this action fetches a single product
import { addToCart } from '../../redux/slices/cart'; // Import the addToCart action
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import StandardButton from '../../components/buttons/standerdButton';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getProductById(productId)); // Fetch product details by ID
  }, [dispatch, productId]);

  // Function to handle adding product to the cart
  const handleAddToCart = async () => {
    const response = await dispatch(addToCart({ productId, quantity: 1 }));
    console.log("Response:", response); // Log the response
    if (response.meta.requestStatus === "fulfilled") {
      navigate('/products');
      toast.success("Product added to cart!");
    } else if (response.payload) {
      navigate('/products');
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

  // Motion variants for the container and elements
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }
    }
  };

  return (
    <motion.div 
      className="p-4 border rounded-lg w-4/5 m-auto text-white flex flex-col items-center justify-center gap-4"
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <motion.h1 className="text-3xl font-bold" variants={itemVariants}>
        {product.name}
      </motion.h1>
      <motion.p className="text-lg" variants={itemVariants}>
        {product.description}
      </motion.p>
      <motion.p className="text-xl" variants={itemVariants}>
        Price: ${product.price}
      </motion.p>
      <motion.p className="text-lg" variants={itemVariants}>
        Category: {product.category.name}
      </motion.p>
      <motion.p className="text-lg" variants={itemVariants}>
        Stock: {product.stock} available
      </motion.p>
      <motion.button onClick={handleAddToCart} variants={itemVariants}>
        <StandardButton>
          Add to Cart
        </StandardButton>
      </motion.button>
    </motion.div>
  );
};

export default ProductDetail;
