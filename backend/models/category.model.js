import mongoose from 'mongoose';

const { Schema } = mongoose;
const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
  }, { timestamps: true });
  
  const Category = mongoose.model('Category', categorySchema);
  export default Category;
  