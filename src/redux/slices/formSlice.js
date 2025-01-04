import { createSlice } from "@reduxjs/toolkit";
import questions from "../../assets/data/Questions";

// Utility function to unwrap Proxies
const toPlainObject = (obj) => JSON.parse(JSON.stringify(obj));

const initialState = {
  currentStep: 1,
  answers: {},
  formCompleted: false,
  package: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep(state) {
      const currentStep = state.currentStep;
      const selectedAnswer = state.answers[currentStep];
      const question = questions[currentStep];

      const isTextQuestion = question?.type === "text";
      const isMultipleSelectQuestion = question?.type === "MultipleSelect";

      if (isTextQuestion && typeof selectedAnswer === "string") {
        if (selectedAnswer.trim() !== "") {
          const nextStepId = question?.next?.[1] || state.currentStep + 1;
          state.currentStep = nextStepId;
        } else {
          console.error("Text input is required to proceed");
        }
      } else if (isMultipleSelectQuestion && Array.isArray(selectedAnswer)) {
        if (selectedAnswer.length > 0) {
          const nextStepId = question?.next?.[1] || state.currentStep + 1;
          state.currentStep = nextStepId;
        } else {
          console.error("At least one option should be selected");
        }
      } else if (selectedAnswer) {
        const selectedOption = question.options?.find(
          (option) => option.name === selectedAnswer
        );
        let nextStepId = question?.next?.[selectedOption?.id];
        if (question.type === "text" || question.type === "file") {
          nextStepId = question?.next?.[1];
        }

        if (nextStepId === true || currentStep === 22) {
          state.formCompleted = true;

          // Log all answers with Proxy objects converted to plain objects
          const plainAnswers = toPlainObject(state.answers);

          for (const [key, value] of Object.entries(plainAnswers)) {
            if (typeof value === "object") {
              if (Array.isArray(value)) {
                console.log(`Answer for question ${key} (Array):`, value);
              } else {
                console.log(`Answer for question ${key} (Object):`, value);
              }
            } else {
              console.log(`Answer for question ${key}:`, value);
            }
          }
        } else if (nextStepId) {
          state.currentStep = nextStepId;
        } else {
          console.error("No next step ID found");
        }
      } else {
        console.error("Answer is required to proceed");
      }
    },
    previousStep(state) {
      const currentStep = state.currentStep;
      const previousStepId = questions[currentStep]?.previous;

      if (previousStepId) {
        state.currentStep = previousStepId;
      } else if (currentStep > 1) {
        state.currentStep -= 1;
      } else {
        console.error("No previous step ID found");
      }
    },
    setAnswer(state, action) {
      const { step, answer } = action.payload;
      state.answers[step] = answer;
      state.formCompleted = false;
    },
    resetForm(state) {
      return initialState;
    },
    setPackage: (state, action) => {
      const UserPackage = action.payload; 
      state.package = UserPackage; 
    },
  },
});

export const { nextStep, previousStep, setAnswer, resetForm, setPackage } =
  formSlice.actions;
export default formSlice.reducer;
