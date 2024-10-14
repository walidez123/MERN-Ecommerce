import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/slices/categories";  // Make sure the path is correct
import { toast } from "react-hot-toast";  // Assuming you're using react-hot-toast for notifications
import CreateCategory from "./createCategory"; // Assuming this is your form component
import StandardButton from "../../../components/buttons/standerdButton";

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
    if (component === "categories") {
      setComponent("createCategory");
    } else {
      setComponent("categories");
    }
  };

  return (
    <>
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
              <li key={category._id} className="border p-4">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-lg opacity-80">{category.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display the create category form */}
      {component === "createCategory" && <CreateCategory />}
    </>
  );
};

export default Categories;
