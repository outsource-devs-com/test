import React from "react";
// Define the mapping between feature names and the keys in the features object
const featureMapping = {
  "File Size Send Limit": "fileSizeLimit",
  Expiration: "expiration" || null, // No matching feature in the provided plans
  Storage: "storage",
  "File Previews": "filepreviews" || null, // No matching feature in the provided plans
  "Recipient Limit": "recipientLimit" || null,
  Support: "support",
  License: "licenseType",
};

const plans = [
  {
    name: "Lite",
    price: "Free",
    features: {
      fileSizeLimit: "1GB",
      expiration: "7 Days",
      storage: "2GB",
      projects: "3",
      support: "Standard",
      licenseType: "Personal",
    },
  },
  {
    name: "Starter Pack",
    color: "bg-blue-600",
    price: "$10/task",
    features: {
      fileSizeLimit: "100MB",
      storage: "20GB",
      projects: "Unlimited",
      recipientLimit: "100",
      filepreviews: "Limited",
      support: "Community",
      licenseType: "Commercial",
    },
  },
  {
    name: "Business Pack",
    price: "$26/task",
    features: {
      fileSizeLimit: "200MB",
      storage: "Unlimited",
      projects: "Unlimited",
      recipientLimit: "Unlimited",
      filepreviews: "Unlimited",
      support: "Expert",
      licenseType: "Commercial",
    },
  },
];

const featureList = [
  "File Size Send Limit",
  "Expiration",
  "Storage",
  "File Previews",
  "Recipient Limit",
  "Support",
  "License",
];

const PackageColumns = () => {
  return (
    <div>
      {/* ABOVE ROW */}
      <div className="grid grid-cols-[0.6fr_0.8fr_0.8fr_0.8fr] min-h-100px">
        <div className="md:h-[100px] border-2 border-transparent"></div>
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border-2 border-black flex flex-col items-center pb-3 pt-2 font-poppins"
          >
            <h3 className="mt-2 p-0 text-[15px] md:text-[20px] font-poppins">
              {plan.name}
            </h3>
            <p className="-mt-3 p-0 text-[12px] text-gray-600 font-poppins">
              Usage Based
            </p>
            <h1 className="p-0 -mt-2 text-[25px] md:text-[32px] font-poppins">
              {plan.price}
            </h1>
            <a
              href="https://luminarisstudio.monime.space/p/1bfaXwUZ"
              className={`${
                plan.color ? plan.color : "bg-black"
              } text-white text-[15px] px-5 md:px-10 -mt-2 py-2 font-poppins hover:no-underline btn-effect`}
            >
              Free Trial
            </a>
          </div>
        ))}
      </div>

      {/* BOTTOM ROW */}
      <div className="grid  grid-cols-[0.6fr_0.8fr_0.8fr_0.8fr] min-h-[300px]">
        <div className="bg-black text-white flex flex-col gap-3 justify-evenly items-start md:items-end pt-4 px-3">
          {featureList.map((feature, index) => (
            <p key={index} className="font-poppins text-[14px]">
              {feature}
            </p>
          ))}
        </div>
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border-2 border-black flex flex-col gap-2 justify-evenly items-center pt-6 px-3"
          >
            {featureList.map((feature, featureIndex) => (
              <p key={featureIndex} className="font-poppins text-[14px]">
                {featureMapping[feature]
                  ? plan.features[featureMapping[feature]] || "-"
                  : "-"}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageColumns;
