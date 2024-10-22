import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, addToCart } from '../../redux/slices/cart'; // Import cart actions
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications
import StandardButton from '../../components/buttons/standerdButton';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  // Fetch the cart items when the component mounts
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Handle removing an item from the cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await dispatch(removeFromCart(productId));
      if (response.meta.requestStatus === "fulfilled") {
        window.location.reload();
        toast.success('Item removed from cart');
      } else {
        throw new Error(response.payload?.message || 'Failed to remove item');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    }
  };

  // Handle increasing item quantity
  const handleIncreaseQuantity = async (productId) => {
    try {
      const response = await dispatch(addToCart({ productId, quantity: 1 }));
      if (response.meta.requestStatus === "fulfilled") {
        window.location.reload();
        toast.success('Item quantity increased');
      } else {
        throw new Error(response.payload?.message || 'Failed to increase quantity');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to increase quantity');
    }
  };

  // Handle decreasing item quantity
  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        // If the current quantity is 1, remove the item
        await handleRemoveFromCart(productId);
      } else {
        const response = await dispatch(addToCart({ productId, quantity: -1 }));
        if (response.meta.requestStatus === "fulfilled") {
          window.location.reload();
          toast.success('Item quantity decreased');
        } else {
          throw new Error(response.payload?.message || 'Failed to decrease quantity');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to decrease quantity');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || 'An error occurred'}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className='text-white'>Your cart is empty</div>;
  }

  const total = cart.items.reduce((total, item) => {
    const itemTotal = item.product.price * item.quantity;
    return total + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.items.map((item) => (
        <div key={item.product._id} className="border-b p-2 flex justify-between items-center">
          <div>
            <h2 className="text-xl">{item.product.name}</h2>
            <p className="text-lg">Quantity: {item.quantity}</p>
            <p className="text-lg">Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            <button onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)} className="mr-2">
              <StandardButton>-</StandardButton>
            </button>
            <button onClick={() => handleIncreaseQuantity(item.product._id, item.quantity)} className="ml-2">
              <StandardButton>+</StandardButton>
            </button>
            <button onClick={() => handleRemoveFromCart(item.product._id)} className="ml-2">
              <StandardButton>Remove</StandardButton>
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
