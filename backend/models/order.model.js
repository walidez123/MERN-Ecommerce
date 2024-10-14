import mongoose from 'mongoose';

const { Schema } = mongoose;
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  export default Order;
  