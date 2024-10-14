import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const existedCategory = await Category.findById(category)
  if(!existedCategory){
    return res.status(400).json({ message: 'Invalid category' });
  }
  try {
    const newProduct = new Product({ name, description, price, stock, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

