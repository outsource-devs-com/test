import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import FormCard from "./FormCard";

const Form = ({ handleClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    // If the form is submitted, render the ThankYou component
    if (isSubmitted) {
      navigate("/confirmation");
    }
  }, [isSubmitted])



  return (
    <div className="flex flex-col  min-h-[550px] items-center my-2 -mt-2 sm:p-5 md:p-3 xl:p-1 rounded overflow-x-hidden z-50">
      <div className="flex flex-col items-center mb-[12px]">
        <h2 className="text-[15px] md:text-[32px] 2xl:text-[50px] pt-[30px] max-w-[1000px] 2xl:max-w-[2000px] mx-auto  mt-[30px] font-poppins font-extrabold">
          <span>DO YOU WANT TO</span>{" "}
          <span className="text-blue-700">BUILD SOME SOFTWARE</span>
          <span>?</span>
        </h2>
        <p className="text-[11px] md:text-[20px] -mt-4 font-poppins md:hidden">
          Human made software in weeks not months.
        </p>
        <p className="text-[11px] md:text-[17px] -mt-4 font-poppins md:hidden">
          Click below to get started.
        </p>
        <p className="text-[11px] md:text-[17px] 2xl:text-[20px] 2xl:-mt-2 -mt-4 font-poppins hidden md:flex">
          Human made software in weeks not months click below to get started.
        </p>
      </div>
      <FormCard setIsSubmitted={setIsSubmitted} />
    </div>
  );
};

export default Form;
