import React from "react";
import "./App.css";
import { useNumber } from "./useNumber";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";
import { useKeyboardListeners } from "./useKeyboardListeners";
import { useNumberLog } from "./useNumberLog";

export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

export default function App() {
  const { splittedNumber, addDigitToNumber, removeDigitFromNumber } =
    useNumber();

  const { updateNumberLogWithLatestNumber, numberLog } =
    useNumberLog(splittedNumber);

  useKeyboardListeners({
    addDigitToNumber,
    removeDigitFromNumber,
    updateNumberLogWithLatestNumber,
  });

  return (
    <section className="App">
      <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
      <NumberInputSection
        addDigitToNumber={addDigitToNumber}
        removeDigitFromNumber={removeDigitFromNumber}
      ></NumberInputSection>
    </section>
  );
}
