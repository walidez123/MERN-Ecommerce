import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
// Create a new order
export const createOrderFromCart = async (req, res) => {
    try {
      // Fetch the user's cart
      const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
  
      // If the cart is empty or does not exist
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      // Map cart items to order items
      const orderItems = await Promise.all(cart.items.map(async item => {
        return new OrderItem({
          product: item.product._id,  // Use the product ID from the populated cart
          quantity: item.quantity,
          price: item.product.price,  // Store the price at the time of order
        });
      }));
  
      // Calculate the total price
      const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Create the order
      const order = new Order({
        user: req.userId,
        items: orderItems, // Assign the order items to the order
        totalPrice,
        shippingAddress: req.body.shippingAddress, // Get shipping address from the request
      });
  
      // Save the order
      await order.save();
  
      // Clear the cart after the order is placed
      cart.items = [];
      await cart.save();
  
      // Respond with the newly created order
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: 'Order not found' });
  }
};

// Delete an order by ID
export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order belongs to the authenticated user
    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this order' });
    }

    // Delete the order
    await order.remove();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
