import express from 'express';
import { createProduct, getProducts, getProductById, deleteProductById, editProduct } from "../controllers/product.controller.js"

const router = express.Router();

// Public routes
router.get('/', getProducts);                // Fetch all products
router.get('/:id', getProductById);          // Fetch single product by ID
router.delete('/:id', deleteProductById);          // Fetch single product by ID
router.patch('/:id', editProduct);          // Fetch single product by ID

// Admin routes (Add admin authentication middleware if necessary)
router.post('/', createProduct);             // Create a new product

export default router;
