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

const useNumber = () => {
  const [splittedNumber, setSplittedNumber] = useState<string[]>([]);
  const addDigitToNumber = (digit: string) => {
    setSplittedNumber((prevNum) => [...prevNum, digit]);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (digits.includes(e?.key)) {
        addDigitToNumber(e.key);
      }
    };

    document.addEventListener("keydown", onKeyDown);
  }, []);
  return {
    splittedNumber,
    addDigitToNumber,
  };
};
