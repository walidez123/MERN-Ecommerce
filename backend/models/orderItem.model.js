import mongoose from 'mongoose';

const { Schema } = mongoose;
const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // Store price at the time of order
  }, { timestamps: true });
  
  const OrderItem = mongoose.model('OrderItem', orderItemSchema);
  export default OrderItem;
  