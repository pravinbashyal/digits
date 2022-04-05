import React from "react";
import "./App.css";
import { numberLength, useNumber } from "./useNumber";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";
import { useKeyboardListeners } from "./useKeyboardListeners";
import { useNumberLog } from "./useNumberLog";
import { borderStyle } from "./styles";
import { NumbersHistory } from "./NumbersHistory";

export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

export default function App() {
  const {
    splittedNumber,
    addDigitToNumber,
    removeDigitFromNumber,
    resetNumberAndParams,
  } = useNumber();

  const { updateNumberLogWithLatestNumber, numbersLog } =
    useNumberLog(splittedNumber);

  const onEnterButtonEvent = () => {
    if (splittedNumber.includes("")) return;
    updateNumberLogWithLatestNumber();
    resetNumberAndParams();
  };

  useKeyboardListeners({
    addDigitToNumber,
    removeDigitFromNumber,
    onPressEnter: onEnterButtonEvent,
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
      <main
        style={{
          padding: "1rem",
          display: "flex",
          flex: "8",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            borderBottom: borderStyle,
            width: "calc(100% + 2rem)",
            marginLeft: "-1rem",
            marginRight: "-1rem",
          }}
        >
          Digits
        </h1>
        <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
        <NumberInputSection
          addDigitToNumber={addDigitToNumber}
          removeDigitFromNumber={removeDigitFromNumber}
          onClickEnter={onEnterButtonEvent}
        ></NumberInputSection>
      </main>
      <NumbersHistory numbersLog={numbersLog}></NumbersHistory>
    </section>
  );
}
