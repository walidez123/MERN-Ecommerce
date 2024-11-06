import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../../redux/slices/payment";
import { toast } from "react-hot-toast";
import MotionComponent from "../../components/motion";

const Checkout = ({ orderId }) => {
  const dispatch = useDispatch();
  const { loading, clientSecret } = useSelector((state) => state.payment);

  // State to hold the user's address input
  const [address, setAddress] = useState("");

  const handlePayment = async () => {
    if (!address) {
      toast.error("Please enter an address");
      return;
    }

    // Dispatch createPaymentIntent with orderId and address
    const response = await dispatch(createPaymentIntent({ orderId, address }));

    // Check if payment intent creation is successful
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Payment intent created successfully!");
    } else {
      toast.error(response.payload?.message || "Payment failed");
    }
  };

  return (
    <MotionComponent>
      <div>
        <label htmlFor="address">Shipping Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
          disabled={loading}
        />

        <button onClick={handlePayment} disabled={loading || !address}>
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {clientSecret && (
          <p>Payment Intent Created! Client Secret: {clientSecret}</p>
        )}
      </div>
    </MotionComponent>
  );
};

export default Checkout;
