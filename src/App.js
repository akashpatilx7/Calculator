// Importing the styles for the Calculator from the style.css Section
import { useReducer } from "react";
import "./style.css";

// Different Types Of Actions Involved In The CALCULATOR APP
const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  // REDUCER manages all the STATES used in the React App for us.

  // BREAKING ALL THE ACTIONS INTO TYPES & PAYLOADS (Different Types Of Actions & Their Respective Parameters)
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${currentOperand}${payload.digit}`,
      };
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,{})

  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });
  return (
    // An OVERALL DIVISION that will contain the WHOLE CALCULATOR
    <div className="calculator-grid">
      {/* A Division for the OUTPUT obtained in the Calculation Process */}
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      {/* Creating DIFFERENT BUTTONS in the Calculator : GRID OF BUTTONS */}
      {/* Here, we are using the className="span-two" for the AC & the = Button as in the Calculator they both will occupy double the amount of space as a Regular Button ! */}
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
