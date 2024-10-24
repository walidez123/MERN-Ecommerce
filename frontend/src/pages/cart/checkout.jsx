import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../../redux/slices/payment';
import { toast } from 'react-hot-toast';

const Checkout = ({ orderId }) => {
  const dispatch = useDispatch();
  const { loading, clientSecret, error } = useSelector((state) => state.payment);

  const handlePayment = () => {
    dispatch(createPaymentIntent(orderId));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || 'Payment failed');
    }
  }, [error]);

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {clientSecret && <p>Payment Intent Created! Client Secret: {clientSecret}</p>}
    </div>
  );
};

export default Checkout;
