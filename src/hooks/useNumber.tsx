import { useCallback, useState } from "react";

export type ANumber = string[];

export const numberLength = 4;

const makeDefaultNumber = () => Array(numberLength).fill("");

let currentIndex = -1;
export const useCurrentInputNumber = () => {
  const increaseIndex = () => {
    currentIndex = currentIndex + 1;
  };
  const decreaseIndex = () => {
    currentIndex = currentIndex - 1;
  };

  const [splittedNumber, setSplittedNumber] = useState<ANumber>(
    makeDefaultNumber()
  );

  const addDigitToInputNumber = useCallback((digit: string) => {
    if (currentIndex === numberLength - 1) return;
    increaseIndex();
    setSplittedNumber((prevNumber) => {
      prevNumber[currentIndex] = digit;
      return [...prevNumber];
    });
  }, []);

  const removeDigitFromInputNumber = useCallback(() => {
    if (currentIndex < 0) return;
    splittedNumber[currentIndex] = "";
    setSplittedNumber([...splittedNumber]);
    decreaseIndex();
  }, [splittedNumber]);

  const clearInputNumber = () => {
    currentIndex = -1;
    setSplittedNumber(makeDefaultNumber());
  };

  return {
    splittedNumber,
    addDigitToInputNumber,
    removeDigitFromInputNumber,
    clearInputNumber,
  };
};
