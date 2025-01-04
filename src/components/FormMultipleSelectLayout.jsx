import React, { useState } from "react";

const FormMultipleSelectLayout = ({
  options,
  selectedAnswer = [],
  onSelect,
  errors,
  hasNextClicked,
}) => {
  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(selectedAnswer) ? selectedAnswer : []
  );

  const [showError, setShowError] = useState(false);

  // Function to handle selection and error visibility
  const handleSelect = (option) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(option);

      // If the option is already selected, remove it
      const updatedItems = isSelected
        ? prev.filter((item) => item !== option)
        : [...prev, option];

      onSelect(updatedItems);
      return updatedItems;
    });

    // Handle error visibility when "next" is clicked
    if (hasNextClicked) {
      setShowError(selectedItems.length === 0);
    }
  };

  // Show error based on `hasNextClicked` state change
  const handleNextClick = () => {
    if (selectedItems.length === 0) {
      setShowError(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 justify-evenly items-center font-poppins w-full text-gray-800">
        {options.map((option) => (
          <button
            key={option.id}
            className={`border flex gap-3 py-3 items-center bg-white text-black rounded-md w-full text-center ${
              selectedItems.includes(option.name)
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect(option.name)}
          >
            <div className="">
              <div
                  className={`flex ml-2 w-5 h-5 rounded-full border-2 relative ${
                    selectedItems.includes(option.name)
                      ? "bg-blue-500 border-blue-500"
                      : ""
                  }`}
                >
                  {selectedItems.includes(option.name) && (
                    <div className="w-3 h-3 bg-white rounded-full m-auto"></div>
                  )}
                </div>
            </div>
            <div className="flex flex-col items-center px-4 xl:px-[9px] w-full">
              <span className="font-normal">{option.name}</span>
            </div>
          </button>
        ))}
      </div>
      {errors.general && hasNextClicked && (
        <p className="text-red-500 w-full text-sm mt-1 pl-4 -mb-0">
          {errors.general}
        </p>
      )}
      {/* Button to trigger error handling */}
      <button type="button" onClick={handleNextClick} className="hidden">
        Next
      </button>
    </>
  );
};

export default FormMultipleSelectLayout;
