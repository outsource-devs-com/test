import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FormFileUploadLayout = ({
  options,
  selectedAnswer = [],
  onSelect,
  errors,
  hasNextClicked,
}) => {
  const [file, setFile] = useState(selectedAnswer[0] || null);

  // Function to handle file selection or drag-and-drop
  const handleFileChange = (filesArray) => {
    if (filesArray.length > 0) {
      const newFile = filesArray[0]; // Only take the first file
      setFile(newFile);
      onSelect([newFile]); // Notify parent with the new file only
    }
  };

  // Function to handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    onSelect([]); // Notify parent that no files are selected
  };

  // Setup react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
    multiple: false, // Allow only one file
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`-mt-2 mx-[42px] py-8 flex justify-center items-center border-2 border-dashed border-[#5784f7] rounded-md ${
          errors.general && hasNextClicked ? "!border-red-600" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center font-poppins">
          <h3 className="text-[22px] font-bold my-0 text-[#292929]">
            Drag and drop files here
          </h3>
          <p className="my-0 text-[15px] text-gray-700">
            or click to select files
          </p>
        </div>
      </div>
      {file && (
        <ul className="mx-[42px] pl-0 space-y-1 mt-2">
          <li
            key={file.name}
            className="flex items-center justify-between border-2 font-poppins w-full border-[#3333338a] rounded-md px-3 py-2"
          >
            <span className="text-[16px]">{file.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      )}
      {errors.general && hasNextClicked && (
        <p className="text-red-500 w-full text-sm mt-[6px] pl-[42px] -mb-0">
          {errors.general}
        </p>
      )}

      {/* Code for multiple file selection (commented out) */}
      {/* 
      const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
        multiple: true, // Allow multiple files
      });
      */}
    </div>
  );
};

export default FormFileUploadLayout;
