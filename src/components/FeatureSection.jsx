import React from "react";
import "../assets/styles/scss/layout/_features.scss";
import featureContent from "../assets/data/FeatureContent"; // Import the content

const FeatureSection = () => {
  const { sectionTitle, sectionParagraph, features } = featureContent;

  const firstWord = sectionTitle.split(" ")[0];
  const restOfTitle = sectionTitle.split(" ")[1];

  return (
    <section className="features section max-w-[320px] md:max-w-[1000px] lg:max-w-[1024px] 2xl:max-w-[2048px]">
      <div className="container">
        <div className="features-inner section-inner">
          <div className="features-header text-center">
            <div className="container-sm">
              <h2 className="section-title mt-0 text-[40px] md:text-[60px]"><span>{firstWord}</span> <span className="text-blue-700">{restOfTitle}</span></h2>
              <p className="section-paragraph">{sectionParagraph}</p>
            </div>
          </div>
          <div className="features-wrap">
            {features.map((feature, index) => (
              <div key={index} className="feature text-center is-revealing">
                <div className="feature-inner">
                  <div
                    className="feature-icon"
                    style={{ background: feature.iconBgColor }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="feature-title h3-mobile mb-8">
                    <span>{feature.title.split(" ")[0]}</span> {/* First section of title*/}
                    <span className="text-blue-700">{feature.title.split(" ")[1]}</span> {/* Rest of title*/}
                  </h4>
                  <p className="text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
