import React, { useEffect, useState } from "react";
import "./App.css";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";

export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

export default function App() {
  const { splittedNumber, addDigitToNumber } = useNumber();

  return (
    <section className="App">
      <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
      <NumberInputSection
        addDigitToNumber={addDigitToNumber}
      ></NumberInputSection>
    </section>
  );
}

const numberLength = 4;
let currentIndex = 0;
const useNumber = () => {
  const increaseIndex = () => (currentIndex = currentIndex + 1);
  const decreaseIndex = () => (currentIndex = currentIndex - 1);
  const [splittedNumber, setSplittedNumber] = useState<string[]>(
    Array(numberLength).fill("")
  );
  console.log({ currentIndex });

  const addDigitToNumber = (digit: string) => {
    setSplittedNumber((prevNumber) => {
      const newNumber = [...prevNumber];
      newNumber[currentIndex] = digit;
      console.log({
        currentIndex,
        digit,
        newNumber: newNumber.join(""),
        prevNumber: prevNumber.join(""),
      });
      return newNumber;
    });
    increaseIndex();
  };

  const removeDigitFromNumber = () => {
    decreaseIndex();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e?.key) {
        return;
      }
      if (digits.includes(e?.key)) {
        addDigitToNumber(e.key);
      }
      switch (e.key) {
        case "Enter":
          console.log("enter pressed");
          break;
        case "BackSpace":
          removeDigitFromNumber();
          break;
        default:
          console.log();
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
  }, []);

  console.log({ splittedNumber });

  return {
    splittedNumber,
    addDigitToNumber,
  };
};
