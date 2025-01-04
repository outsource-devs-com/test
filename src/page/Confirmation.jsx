import React from "react";
import PackageColumns from "../components/PackageColumns";
import trophy from "../assets/images/trophyImg.png";
import msg from "../assets/images/msgImg.png";
import coin from "../assets/images/coinImg.png";
import CheckMark from "../assets/images/check-mark.png";

const OfferCards = () => {
  return (
    <div className="mx-[50px]  flex flex-col  justify-center mt-7 mb-28">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-[18px] md:text-[34px] lg:text-[42px] font-poppins">
          Thanks for signing up!
        </h2>
        <p className="text-[12px] md:text-[18px] font-poppins -mt-4 md:mt-0">We will get in touch via email</p>
        <img src={CheckMark} alt="" className="w-[100px] mt-4" />
      </div>
    </div>
  );
};

export default OfferCards;
