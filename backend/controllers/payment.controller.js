// controllers/payment.controller.js
import stripe from '../lib/stripe.js';
import Order from "../models/order.model.js"

// Handle creating a payment intent
export const createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;

  try {
    // Retrieve the order details
    const order = await Order.findById(orderId).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create a payment intent with the order's total price
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),  // Stripe requires amount in cents
      currency: 'usd',  // Set your currency
      payment_method_types: ['card'],  // You can expand this list if necessary
    });

    // Respond with the client secret needed to complete the payment
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
