import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";

export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

export default function App() {
  const { splittedNumber, addDigitToNumber, removeDigitFromNumber } =
    useNumber();

  console.log("rerender");

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

const numberLength = 4;
let currentIndex = -1;
const useNumber = () => {
  const increaseIndex = () => {
    currentIndex = currentIndex + 1;
  };
  const decreaseIndex = () => {
    currentIndex = currentIndex - 1;
  };

  const [splittedNumber, setSplittedNumber] = useState<string[]>(
    Array(numberLength).fill("")
  );

  const addDigitToNumber = useCallback((digit: string) => {
    if (currentIndex === numberLength - 1) return;
    increaseIndex();
    setSplittedNumber((prevNumber) => {
      prevNumber[currentIndex] = digit;
      return [...prevNumber];
    });
  }, []);

  const removeDigitFromNumber = useCallback(() => {
    console.log({ currentIndex, splittedNumber });
    if (currentIndex < 0) return;
    splittedNumber[currentIndex] = "";
    setSplittedNumber([...splittedNumber]);
    decreaseIndex();
  }, [splittedNumber]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e?.key) {
        return;
      }
      if (digits.includes(e?.key)) {
        addDigitToNumber(e.key);
      }
      console.log(e.key);
      switch (e.key) {
        case "Enter":
          console.log("enter pressed");
          break;
        case "Backspace":
          console.log("backspace");
          removeDigitFromNumber();
          break;
        default:
          console.log();
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [addDigitToNumber, removeDigitFromNumber]);

  return {
    splittedNumber,
    addDigitToNumber,
    removeDigitFromNumber,
  };
};
