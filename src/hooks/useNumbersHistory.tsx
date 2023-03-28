import { useState } from "react";

export type NumberHistoryItem = {
  number: string;
  correctDigitCount: number;
  correctPositionCount: number;
};

export const useNumbersHistory = () => {
  const [numbersHistory, setNumbersHistory] = useState<
    Array<NumberHistoryItem>
  >([]);

  const addToNumberHistory = (numberHistoryItem: NumberHistoryItem) => {
    setNumbersHistory((prev) => [...prev, numberHistoryItem]);
  };

  const resetHistory = () => {
    setNumbersHistory([]);
  };
  return {
    addToNumberHistory,
    numbersHistory,
    resetHistory,
  };
};
