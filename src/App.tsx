import React from "react";
import "./App.css";
import { useNumber } from "./useNumber";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";
import { useKeyboardListeners } from "./useKeyboardListeners";
import { useNumberLog } from "./useNumberLog";

export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

export default function App() {
  const {
    splittedNumber,
    addDigitToNumber,
    removeDigitFromNumber,
    resetNumberAndParams,
  } = useNumber();

  const { updateNumberLogWithLatestNumber, numberLog } =
    useNumberLog(splittedNumber);

  useKeyboardListeners({
    addDigitToNumber,
    removeDigitFromNumber,
    updateNumberLogWithLatestNumber,
    resetNumberAndParams,
  });

  return (
    <section
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
      }}
    >
      <main>
        <h1>Digits</h1>
        <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
        <NumberInputSection
          addDigitToNumber={addDigitToNumber}
          removeDigitFromNumber={removeDigitFromNumber}
        ></NumberInputSection>
      </main>
      <aside
        style={{
          padding: "1rem",
          height: "100%",
          borderLeft: "1px solid rgba(50,50,50,0.5)",
        }}
      >
        <h2>Number History</h2>
        {numberLog.map((aNumber, index) => (
          <ul>
            <li key={index}>
              <p>{aNumber}</p>
            </li>
          </ul>
        ))}
      </aside>
    </section>
  );
}
