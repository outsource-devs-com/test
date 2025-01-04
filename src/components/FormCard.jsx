import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { nextStep, previousStep, setAnswer } from "../redux/slices/formSlice";
import FormOptions from "./FormOptions";
import questions from "../assets/data/Questions";


const FormCard = ({ setIsSubmitted }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.form.currentStep);
  const answers = useSelector((state) => state.form.answers);
  const formCompleted = useSelector((state) => state.form.formCompleted);

  const [errors, setErrors] = useState({});
  const [containerHeight, setContainerHeight] = useState("auto");
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [hasNextClicked, setHasNextClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state



  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone) =>
    /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{2,4}[\s-]?\d{4,10}$/.test(
      phone
    );

  const ConfigureValueType = (option) => {
    let value = answers[currentStep] || "";
    if (
      option.type === "tel" ||
      option.type === "email" ||
      option.type === "textarea"
    ) {
      return (value = answers[currentStep]?.[option.id] || "");
    }
    if (option.type === "file") {
      return (value = answers[currentStep] || []);
    }
    return value;
  };

  const HandleQuestionError = (option, value, tempErrors, isValid) => {
    switch (option.type) {
      case "email":
        if (!validateEmail(value)) {
          tempErrors.general = "Invalid email address.";
          isValid = false;
        }
        break;

      case "tel":
        if (!validatePhoneNumber(value)) {
          tempErrors.general = "Invalid phone number.";
          isValid = false;
        }
        break;

      case "Mcq":
        if (hasNextClicked && value === "") {
          tempErrors.general = "Please select an option.";
          isValid = false;
        }
        break;

      case "textarea":
        if (hasNextClicked && value === "") {
          tempErrors.general = "This field is required.";
          isValid = false;
        }
        break;

      case "file":
        if (hasNextClicked && (value.length === 0 || value === "")) {
          tempErrors.general = "Please upload a file.";
          isValid = false;
        }
        break;

      default:
        // Required check for any type
        if (option.required && !value && hasNextClicked) {
          tempErrors.general = "This field is required.";
          isValid = false;
        }
        break;
    }

    return isValid;
  };

  const validateForm = () => {
    const currentQuestion = questions[currentStep];
    let isValid = true;
    let tempErrors = {};

    if (!currentQuestion) return true;

    if (currentQuestion.type === "MultipleSelect") {
      const value = answers[currentStep] || [];
      if (value.length === 0) {
        isValid = false;
        tempErrors.general = "Please select at least one option.";
      }
    } else if (currentQuestion.type === "SingleSelect") {
      const value = answers[currentStep] || "";

      if (currentQuestion.required && value === "" && hasNextClicked === true) {
        isValid = false;
        tempErrors.general = "Please select an option.";
      }
    } else {
      currentQuestion.options.forEach((option) => {
        let value = ConfigureValueType(option);
        HandleQuestionError(option, value, tempErrors, isValid);
      });
    }

    setErrors(tempErrors);
    setIsNextButtonDisabled(!isValid); // Update button disabled state
    return isValid;
  };
  useEffect(() => {
    // Re-validate form whenever the answer changes
    validateForm();
  }, [answers, hasNextClicked, currentStep]);

  useEffect(() => {
    if (contentRef.current && currentStep !== 1) {
      setContainerHeight(`${contentRef.current.scrollHeight + 30}px`);
    }
  }, [currentStep]);

  const handleSelect = (selectedItems) => {
    if (currentQuestion.type === "text") {
      const currentAnswer = answers[currentStep] || {};
      dispatch(
        setAnswer({
          step: currentStep,
          answer: { ...currentAnswer, ...selectedItems }, // Merge new input with existing values
        })
      );
    } else {
      // Set the answer before validating the form
      dispatch(setAnswer({ step: currentStep, answer: selectedItems }));
    }
    // Validate after setting the answer
    validateForm();
    setHasNextClicked(true);
  };

  // const handleNext = () => {
  //   setHasNextClicked(true);
  //   const isValid = validateForm(); // Ensure validation runs first
  //   if (isValid) {
  //     if (formCompleted) {
  //       handleSubmit(); // Submit form if on the last step
  //     } else {
  //       dispatch(nextStep()); // Move to the next step if not the last step
  //     }
  //     setHasNextClicked(false);
  //   }
  // };

  const handleNext = () => {
    setHasNextClicked(true);
    validateForm();
    if (!isNextButtonDisabled && hasNextClicked) {
      dispatch(nextStep());
      setHasNextClicked(false);
    }
  };

  
  const handleSubmit = async () => {
    try {
    
      setLoading(true); // Start loading animation
      const lastQuestionAnswer = answers["22"] || answers["23"];


      if (lastQuestionAnswer) {
        setLoading(true); // Start loading animation
        const response = await fetch(
          "https://3ye1yixzfj.execute-api.eu-west-1.amazonaws.com/dev/form",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ answers }.answers),
          }
        );

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        const data = await response.json();
        console.log(data.recordId);
        localStorage.setItem("recordId", data.recordId);
      }

      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);


    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };


  const handleBack = () => {
    dispatch(previousStep());
    setHasNextClicked(true); // Reset hasNextClicked when going back
  };

  const currentQuestion = questions[currentStep] || {};

  function getScreenSize() {
    const width = window.innerWidth;

    if (width <= 320) {
      return "200px";
    } else if (width >= 1024) {
      return "300px";
    } else if (width >= 768) {
      return "400px";
    } else if (width >= 425) {
      return "300px";
    } else if (width >= 375) {
      return "250px";
    }
  }


  return (
    <div className="space-y-3 rounded-md overflow-y-scroll mt-9">
      <div
        className="questions-container flex flex-col items-center min-h-[40px] justify-center w-full md:w-[900px] mt-3 min-h-[250px] max-h-[250px] min-w-[320px] max-w-[320px] md:min-h-[400px] md:max-h-[400px] md:min-w-[725px] md:max-w-[725px] lg:min-w-[900px] lg:max-w-[900px] overflow-scroll"
        style={{ height: containerHeight }}
        ref={containerRef}
      >
        <TransitionGroup>
          <CSSTransition
            key={currentStep}
            timeout={300}
            classNames="fade"
            className="w-full md:w-[900px] "
            onEnter={() => setContainerHeight("auto")}
            onExit={() => setContainerHeight("auto")}
          >
            {loading ? (
              <div className=" ">
                <h1 className="text-center text-lg">Submitting... Please wait.</h1>
                <iframe src="https://lottie.host/embed/98ed8270-cc1b-4005-a76d-b4867b8d4d4e/tCSOsfGbC6.json"
                  className="w-full -my-4"
                ></iframe>
              </div>
            ) : (<div ref={contentRef} style={{ overflowY: "scroll", height: getScreenSize() }}>
              <h1
                className={`text-[1rem] text-center font-poppins font-normal px-4 leading-[-3px] ${errors.general && hasNextClicked && "text-red-600"
                  }`}
              >
                {currentQuestion.question}
              </h1>
              {currentQuestion.question && (
                <FormOptions
                  type={currentQuestion.type || null}
                  options={currentQuestion.options}
                  selectedAnswer={answers[currentStep]}
                  onSelect={handleSelect}
                  setIsNextButtonDisabled={setIsNextButtonDisabled}
                  isNextButtonDisabled={isNextButtonDisabled}
                  hasNextClicked={hasNextClicked}
                  errors={errors}
                />
              )}
            </div>)}
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className="flex flex-row justify-between w-full bg-blue-700 mb-5 gap-2 sm:gap-5">
        <button
          className={`px-4 py-3 rounded text-[#d4d4d4] ${currentStep === 1 ? "opacity-0 cursor-default" : "cursor-pointer"
            }`}
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </button>

        <button
          className={`text-white hover:text-[#cdcdcd] px-4 py-3 rounded-br-lg rounded-bl-lg flex items-center justify-center gap-3 ${isNextButtonDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
            }`}
          onClick={
            formCompleted || currentStep === 23 || currentStep === 22
              ? handleSubmit
              : handleNext
          }
        // disabled={isNextButtonDisabled}
        >
          {formCompleted || currentStep === 23 || currentStep === 22
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormCard;
