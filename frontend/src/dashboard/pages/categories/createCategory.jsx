import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../redux/slices/categories"; // Make sure the path is correct
import { toast } from "react-hot-toast";
import StandardButton from "../../../components/buttons/standerdButton";
import MotionComponent from "../../../components/motion";

const CreateCategory = () => {
  const dispatch = useDispatch();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Get loading and error state from Redux
  const { loading, error } = useSelector((state) => state.categories);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !description) {
      toast.error("Both fields are required");
      return;
    }

    // Dispatch createCategory action
    dispatch(createCategory({ name, description }))
      .unwrap() // Handle resolved or rejected promises
      .then(() => {
        toast.success("Category created successfully");
        setName(""); // Clear input fields
        setDescription("");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to create category");
      });
  };

  return (
    <MotionComponent>
    <div className="w-full flex justify-center flex-col items-center text-white">

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {/* Form for creating a category */}
      <form className="flex flex-col gap-4 border p-12 rounded-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          className="p-3 bg-white rounded-md text-black w-80"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Category Description"
          className="p-3 bg-white rounded-md text-black w-80"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading} // Disable button when loading
        >
          <StandardButton>
            {loading ? "Creating..." : "Create Category"}
          </StandardButton>
        </button>
      </form>
    </div>
    </MotionComponent>

  );
};

export default CreateCategory;
