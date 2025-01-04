import React from "react";
import "../assets/styles/scss/layout/_newsletter.scss"

const NewsLetterSection = () => {
  return (
    <>
      <section className="newsletter section text-light">
        <div className="container-sm">
          <div className="newsletter-inner section-inner">
            <div className="newsletter-header text-center">
              <h2 className="section-title mt-0">Stay in the know</h2>
              <p className="section-paragraph">
                Lorem ipsum is common placeholder text used to demonstrate the
                graphic elements of a document or visual presentation.
              </p>
            </div>
            <div className="footer-form newsletter-form field field-grouped">
              <div className="control control-expanded">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Your best email&hellip;"
                />
              </div>
              <div className="control">
                <a
                  className="button button-primary button-block"
                  href="/"
                >
                  Early access
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetterSection;
