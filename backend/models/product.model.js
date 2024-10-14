import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Link to Category
  }, { timestamps: true });
  
  const Product = mongoose.model('Product', productSchema);
  export default  Product;
  