import { useState } from "react";

export type HistoryItem = {
  number: string;
  correctDigitCount: number;
  correctPositionCount: number;
};

export const useHistory = () => {
  const [history, setHistory] = useState<Array<HistoryItem>>([]);

  const addToHistory = (historyItem: HistoryItem) => {
    setHistory((prev) => [...prev, historyItem]);
  };

  const resetHistory = () => {
    setHistory([]);
  };
  return {
    addToHistory,
    history,
    resetHistory,
  };
};
