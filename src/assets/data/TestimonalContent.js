import Testimonal1 from "../images/testimonial-01.png";
import Testimonal2 from "../images/testimonial-02.png";
import Testimonal3 from "../images/testimonial-03.png";

// testimonalContent.js
const testimonalContent = {
  sectionHeading: "Testimonials", // Add the section heading
  testimonials: [
    {
      imgSrc: Testimonal1,
      feedback:
        "We needed a way to collect and analyse data on our production process. Wilson helped create our data twin quickly. He also help with guidance in hiring the right person to refine our data pipeline, which has significantly optimised our operations. His advice made the hiring process a lot more targeted and easier for us.",
      username: "David - Founder @ Fibe",
    },
    {
      imgSrc: Testimonal2,
      feedback:
        "Partnering with Wilson was one of the best decisions we made for our logistics company in Singapore. We needed a Transport Management System to streamline our operations, and Wilson delivered a website and Android app MVP in under two months. His speed was essential in launching our navigation app for drivers on time. Not only did he save us the effort of building an in-house technical team from scratch, but working with him via Trello, Slack, and Loom was far more efficient than dealing with a traditional agency. His guidance in using Flutter allowed us to build both the app and website from a single code base, cutting down development time significantly. Couldn't be happier with the outcome.",
      username: "Bryan - Founder @ LoadAndGo",
    },
    {
      imgSrc: Testimonal3,
      feedback:
        "Wilson was instrumental in helping us build our E-commerce platform at Adaptive Computer Solutions. His expertise guided us through the best ways to integrate payment solutions into the site while ensuring full compliance. His approach saved us the significant effort of having to become PCI-DSS compliant ourselves, which was incredibly valuable. The final platform has been a huge success, seamlessly handling a large volume of purchases for our customers. Wilson's input and efficiency throughout the process made all the difference in getting our E-commerce site up and running smoothly.",
      username: "Kofi Amparbeng - Founder & MD @ Adaptive Computer Solutions",
    },
  ],
};

export default testimonalContent;
