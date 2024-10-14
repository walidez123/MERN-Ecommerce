import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is at least 1
    },
  ],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
