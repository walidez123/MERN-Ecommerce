import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, editProduct } from "../../../redux/slices/product"; // Adjust the path as necessary
import { getCategories } from "../../../redux/slices/categories"; // Adjust the path as necessary
import StandardButton from "../../../components/buttons/standerdButton";
import { toast } from "react-hot-toast"; // For notifications
import { useNavigate, useParams } from "react-router-dom"; // For getting the product ID from the route

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate()
  // State for product form
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Fetch categories from Redux
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);
  const { product, loading: productLoading, error: productError } = useSelector((state) => state.products);

  // Fetch product and categories when component mounts
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductById(id)); // Fetch the product by its ID
  }, [dispatch, id]);

  // Pre-fill the form with the existing product data when product is loaded
  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category._id, // Set the category ID
      });
    }
  }, [product]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(editProduct({ productId: id, productData }));

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Product updated successfully!");
      navigate('/dashboard/products');
    } else {
      const errorMessage = response.payload?.msg || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  
  
  return (
    <div className="w-screen flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-md p-12">
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Product Name"
          required
          disabled={productLoading}
        />
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Description"
          required
          disabled={productLoading}
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Price"
          required
          disabled={productLoading}
        />
        <input
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Stock"
          required
          disabled={productLoading}
        />
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          required
          disabled={categoriesLoading}
        >
          <option value="">Select Category</option>
          {!categoriesLoading && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full text-xl" disabled={productLoading || categoriesLoading}>
          <StandardButton>
            {productLoading ? "Updating..." : "Update Product"}
          </StandardButton>
        </button>
      </form>

      {productLoading && <p>Loading product...</p>}
      {productError && <p className="text-red-500">Error loading product: {productError}</p>}
      {categoriesLoading && <p>Loading categories...</p>}
      {categoriesError && <p className="text-red-500">Error loading categories: {categoriesError}</p>}
    </div>
  );
};

export default EditProduct;
