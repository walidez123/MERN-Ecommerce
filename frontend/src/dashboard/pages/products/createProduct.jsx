import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/slices/product"; // Adjust the path as necessary
import { getCategories } from "../../../redux/slices/categories"; // Adjust the path as necessary
import StandardButton from "../../../components/buttons/standerdButton";
import { toast } from "react-hot-toast"; // For notifications

const CreateProduct = () => {
  const dispatch = useDispatch();

  // State for product form
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "", // Change quantity to stock
    category: "",
  });

  // Fetch categories from Redux
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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

    const resultAction = await dispatch(createProduct(productData));
    if (createProduct.fulfilled.match(resultAction)) {
      toast.success("Product created successfully!");
      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "", // Reset stock
        category: "",
      });
    } else {
      toast.error(resultAction.payload || "Failed to create product.");
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
        />
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="stock" // Update name from quantity to stock
          value={productData.stock}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          placeholder="Stock"
          required
        />
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="p-3 bg-white rounded-md text-black w-80"
          required
        >
          <option value="">Select Category</option>
          {!categoriesLoading && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full text-xl">
          <StandardButton>
            Save
          </StandardButton>
        </button>
      </form>

      {categoriesLoading && <p>Loading categories...</p>}
      {categoriesError && <p className="text-red-500">Error loading categories: {categoriesError}</p>}
    </div>
  );
};

export default CreateProduct;
