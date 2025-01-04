import React, { useEffect, useState } from "react";

const FormOptionLayout = ({
  options,
  selectedAnswer,
  onSelect,
  errors,
  hasNextClicked,
}) => {
  const [ShowError, setShowError] = useState(false);

  useEffect(() => {
    if (hasNextClicked == true) {
      setShowError(true);
    }
  }, [errors, hasNextClicked]);

  

  return (
    <>
      <div className="flex gap-4 px-4 justify-center items-center font-poppins w-full text-gray-800">
        {options.map((option) => (
          <button
            key={option.id}
            className={`border flex gap-3 py-3 items-center bg-white text-black rounded-md ${
              selectedAnswer === option.name
                ? "border-blue-500 bg-[#e4e4e4d4]"
                : "border-gray-300"
            } w-full text-center max-w-[500px]`}
            onClick={() => onSelect(option.name)}
          >
            {/* RADIO BTN */}
            <div className="">
              <div
                className={`flex ml-2 w-5 h-5 rounded-full border-2 relative ${
                  selectedAnswer === option.name
                    ? "bg-blue-500 border-blue-500"
                    : ""
                }`}
              >
                {selectedAnswer === option.name && (
                  <div className="w-3 h-3 bg-white rounded-full m-auto"></div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center px-4 xl:px-[9px] w-full ">
              <span className="font-normal">{option.name}</span>
            </div>
          </button>
        ))}
      </div>
      {errors.general && ShowError && hasNextClicked && (
        <p className="text-red-500 w-full text-sm pl-24 pt-1 -mb-1">
          {errors.general}
        </p>
      )}
    </>
  );
};

export default FormOptionLayout;
