// FormOptions.js
import React from "react";
import FormOptionLayout from "./FormOptionLayout";
import FormTextLayout from "./FormTextLayout";
import FormMultipleSelectLayout from "./FormMultipleSelectLayout";
import FormFileUploadLayout from "./FormFileUploadLayout";

const FormOptions = ({
  type,
  options,
  selectedAnswer,
  onSelect,
  errors,
  setIsNextButtonDisabled,
  isNextButtonDisabled,
  hasNextClicked,
}) => {
  const handleClick = (option) => {
    setIsNextButtonDisabled(!isNextButtonDisabled);
    onSelect(option.name);
  };

  switch (type) {
    case "Mcq":
      return (
        <FormOptionLayout
          options={options}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
          errors={errors}
          hasNextClicked={hasNextClicked}
        />
      );
    case "text":
      return (
        <FormTextLayout
          options={options}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
          errors={errors}
          hasNextClicked={hasNextClicked}
        />
      );
    case "MultipleSelect":
      return (
        <FormMultipleSelectLayout
          options={options}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
          errors={errors}
          hasNextClicked={hasNextClicked}
        />
      );
    case "file":
      return (
        <FormFileUploadLayout
          options={options}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
          errors={errors}
          hasNextClicked={hasNextClicked}
        />
      );
    default:
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 justify-evenly items-center font-poppins w-full text-gray-800">
          {options.map((option) => (
            <button
              key={option.id}
              className={`border flex flex-col items-center bg-white text-black rounded-md ${
                selectedAnswer === option.name
                  ? "border-blue-500 bg-[#e4e4e4d4]"
                  : "border-gray-300"
              } w-full text-center`}
              onClick={() => handleClick(option)}
            >
              <div className="w-full">
                <div
                  className={`flex mt-2 ml-2 w-5 h-5 rounded-full border-2 relative ${
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
              <div className="flex flex-col gap-2 sm:gap-0 items-center px-4 xl:px-[9px] pb-4 ">
                {option.img && (
                  <img
                    src={option.img}
                    alt=""
                    className=" w-9 md:w-16 h-auto"
                  />
                )}
                <span className="font-normal">{option.name}</span>
              </div>
            </button>
          ))}
          {errors.general && hasNextClicked && (
            <p className="text-red-500 w-full text-sm -mt-3 -mb-2">
              {errors.general}
            </p>
          )}
        </div>
      );
  }
};

export default FormOptions;
