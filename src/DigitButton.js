import { ACTIONS } from "./App";

export default function DigitButton({ dispatch, digit }) {
  // Passing dispatch to the DigitButton Function so as to call the reducer from here only.
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  )
}
