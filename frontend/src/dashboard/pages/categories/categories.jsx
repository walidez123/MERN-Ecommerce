import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../../redux/slices/categories";
import { toast } from "react-hot-toast";
import CreateCategory from "./createCategory";
import StandardButton from "../../../components/buttons/standerdButton";
import DangerButton from "../../../components/buttons/dangerButton";
import MotionComponent from "../../../components/motion";

const Categories = () => {
  const [component, setComponent] = useState("categories");

  const dispatch = useDispatch();

  // Get categories state from Redux
  const { categories, loading, error } = useSelector((state) => state.categories);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Show error notification if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Toggle between categories list and create category form
  const switchComponent = () => {
    setComponent((prev) => (prev === "categories" ? "createCategory" : "categories"));
  };

  // Handle delete category
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category and all the associated products?")) {
      dispatch(deleteCategory(categoryId))
        .unwrap()
        .then(() => toast.success("Category deleted successfully"))
        .catch((err) => toast.error(err || "Failed to delete category"));
    }
  };

  return (
    <MotionComponent>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl justify-center m-auto border-b-2">
          {component === "categories" ? "Categories" : "Create Category"}
        </h1>
        <button onClick={switchComponent}>
          <StandardButton>
            {component === "categories" ? "Create Category" : "View Categories"}
          </StandardButton>
        </button>
      </div>

      {/* Display list of categories */}
      {component === "categories" && (
        <div className="w-full flex justify-center flex-col items-center text-white">
          {loading && <p>Loading categories...</p>}  {/* Show loading state */}
          
          {error && <p className="text-red-500">Failed to load categories: {error}</p>}  {/* Show error state */}
          
          {!loading && categories.length === 0 && <p>No categories available.</p>}  {/* No categories message */}

          <ul className="border p-12 text-xl rounded-md flex flex-col gap-4">
            {categories.map((category) => (
              <li
                key={category._id}
                className="border p-4 justify-between items-center flex gap-2"
              >
                <div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-lg opacity-80">{category.description}</p>
                </div>
                <button onClick={() => handleDeleteCategory(category._id)}>
                  <DangerButton>Delete</DangerButton>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display the create category form */}
      {component === "createCategory" && <CreateCategory />}
    </MotionComponent>
  );
};

export default Categories;
