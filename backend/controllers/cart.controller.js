import Cart from '../models/cart.model.js';

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Find the cart for the authenticated user
    let cart = await Cart.findOne({ user: req.userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      // If it exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If it doesn't exist, add a new item
      cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    // Find the user's cart and populate product details in the items
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    
    // Respond with the populated cart
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params; // Use productId instead of itemId
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: req.userId });

    // Filter out the item with the given productId
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    
    // Save the updated cart
    await cart.save();
    
    // Respond with the updated cart
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


