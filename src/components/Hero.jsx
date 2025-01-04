import React from "react";
import { ReactComponent as HeroMain } from "../assets/images/HeroMainShape.svg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title mt-0">Build an app today</h1>
            <p className="hero-paragraph">
              Human made software in weeks not months, for a fraction of the
              cost.
            </p>
            <div className="hero-form field field-grouped">
              <div className="control control-expanded">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Your best email&hellip;"
                />
              </div>
              <div className="control">
                {/* <a className="button button-primary button-block" href="/">
                  Get Started
                </a> */}
              </div>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="hero-shape hero-shape-1">
              <svg
                width="40"
                height="40"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <circle
                  className="anime-element fadeup-animation"
                  cx="20"
                  cy="20"
                  r="20"
                  fill="#FFD8CD"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
            <div className="hero-shape hero-shape-2">
              <svg
                width="88"
                height="88"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <circle
                  className="anime-element fadeup-animation"
                  cx="44"
                  cy="44"
                  r="44"
                  fill="#FFD2DA"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
            <div className="hero-main-shape">
              <HeroMain />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
