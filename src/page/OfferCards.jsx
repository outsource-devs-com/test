import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPackage } from "../redux/slices/formSlice";
import packagesData from '../assets/data/PricingData';

const PricingCard = ({ title, price, description, features, bannerColor, noFreeTrial, highlight }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserPackage = useSelector((state) => state.form.package);
  const answers = useSelector((state) => state.form.answers);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handlePackageSelection = (title) => {
    setSelectedPackage(title);
    dispatch(setPackage(title));
  };

  useEffect(() => {
    const updatePackageAndNavigate = async () => {
      if (selectedPackage === UserPackage && selectedPackage) {
        setLoading(true); // Start loading when API call begins
        try {
          const recordId = localStorage.getItem("recordId");

          if (!recordId) {
            throw new Error("No record ID found");
          }

          const response = await fetch(
            "https://3ye1yixzfj.execute-api.eu-west-1.amazonaws.com/dev/package",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                form: answers,
                subscriber: answers[5][1],
                package: selectedPackage,
                company: answers[3][1],
                recordId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update package");
          }

          const result = await response.json();
          console.log("Package updated successfully", result);

          navigate('/confirmation');
        } catch (error) {
          console.error("Error updating package:", error);
        } finally {
          setLoading(false); 
        }
      }
    };

    updatePackageAndNavigate();
  }, [UserPackage, selectedPackage, answers, navigate]);

  return (
    <div className={`bg-white relative border rounded-lg shadow-lg text-center max-w-[250px] sm:max-w-[350px] md:max-w-[220px] lg:max-w-[350px] 2xl:max-w-[500px]`}>
      {highlight && <div className="recommend-label"><p className="">Recommended</p></div>}
      <div className={`${bannerColor} h-16 flex justify-center items-center`}>
        <span className="text-lg font-semibold text-gray-700 mb-2 md:text-[13px] lg:text-[17px]">{title}</span>
      </div>
      <div className="p-6">
        <div className="text-2xl font-semibold text-gray-800 mb-1 md:text-[25px]">{price}</div>
        <p className="text-gray-500">{description}</p>
        <button
          onClick={() => handlePackageSelection(title)}
          className={`bg-transparent border-[1px] border-gray-800 text-gray-800 font-semibold py-2 px-4 rounded-sm mt-6 mb-4 lg:px-[70px] ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
          disabled={loading}
        >
          {loading ? (<span className="dot-loader w-[24px]">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </span>) : (noFreeTrial ? "Start Now" : "Start Trial")}
        </button>
        <ul className='w-full flex flex-col items-center justify-center'>
          {features.map((feature, index) => (
            <li key={index} className="flex justify-center w-full text-gray-700 text-[14px]">
              <span className="text-black mr-[2px]">&#8226;</span>
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const OfferCards = () => {
  const answers = useSelector((state) => state.form.answers);
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(answers[2])) {
      answers[2]?.forEach((answer) => {
        if (answer?.toLowerCase().includes("modify existing code")) {
          setIndex(2);
        } else if (answer?.toLowerCase().includes("website") || answer?.toLowerCase().includes("app")) {
          setIndex(0);
        } else if (answer?.toLowerCase().includes("custom software")) {
          setIndex(1);
        }
      });
    }
  }, [answers]);

  return (
    <div className='flex flex-col items-center justify-center 2xl:justify-start 2xl:h-full 2xl:mt-4'>
      <h1 className='font-poppins text-center text-blue-500 text-lg  text-wrap w-[250px] md:w-[500px] md:text-2xl'>
        LIGHTENING QUICK SOFTWARE
      </h1>
      <h12 className='-my-4 font-poppins font-lg text-center text-wrap w-[250px] md:w-[350px] lg:w-[450px]'>
        No need for any technical expertise. Eliminate hassle of building a technical team
      </h12>
      <div className=" mb-4 font-poppins flex flex-col w-full md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mt-12">
        {packagesData.map((plan, index) => (
          <PricingCard
            key={index}
            {...plan}
            highlight={index === Index}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferCards;
