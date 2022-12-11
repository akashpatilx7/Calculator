// Importing the styles for the Calculator from the style.css Section
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./style.css";


// Different Types Of Actions Involved In The CALCULATOR APP
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};



function reducer(state, { type, payload }) {
  // REDUCER manages all the STATES used in the React App for us.

  // BREAKING ALL THE ACTIONS INTO TYPES & PAYLOADS (Different Types Of Actions & Their Respective Parameters)

  // eslint-disable-next-line
  switch (type) {


    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      // If the First Digit is zero, then even if the user clicks 0 after that, there is no point in adding that successive zeroes !
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }

      // If the First Digit is Period(.), then even if the user clicks Period(.) after that, there is no point in adding that successive Periods !
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };


    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
        // No Functionality if nothing is choosen as currentOperand & previousOperand
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
          // If the previousOperand was NULL, then make the currentOperand as the previousOperand and do the further procedure.
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        // Operation will be the operation that the user just clicked on.
        currentOperand: null,
        // If the user wants to perform operations into "A CHAINED WAY i.e back to back operations".
      };


    case ACTIONS.CLEAR:
      return {};


    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };


    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        // Overwriting the previous Calculation's Values, if an user presses some digits for a new calculation.
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}


function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  // eslint-disable-next-line
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
  // Converting the Final Computation to string as all we are dealing with is in string
}


// INTEGER & DECIMAL PART FORMATTER
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}


function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    // An OVERALL DIVISION that will contain the WHOLE CALCULATOR
    <div className="calculator-grid">
      {/* A Division for the OUTPUT obtained in the Calculation Process */}
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>


      {/* Creating DIFFERENT BUTTONS in the Calculator : GRID OF BUTTONS */}
      {/* Here, we are using the className="span-two" for the AC & the = Button as in the Calculator they both will occupy double the amount of space as a Regular Button ! */}
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      {/* The CLEAR Button does not need to have a payload. */}


      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>


      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />


      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}


export default App;