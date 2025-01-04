import React from "react";
import FeatureSection from "../components/FeatureSection";
import TestimonalSection from "../components/TestimonalSection";
import NewsLetterSection from "../components/NewsLetterSection";
import "../assets/styles/scss/layout/_main.scss";
import Form from "../components/Form";

const Home = () => {
  return (
    <div className="mx-auto">
      <main className="overflow-hidden">
        <Form />
        <FeatureSection />
        <TestimonalSection />
        {/* <NewsLetterSection /> */}
      </main>
    </div>
  );
};

export default Home;
