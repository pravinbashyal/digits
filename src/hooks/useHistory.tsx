import { useEffect, useState } from "react";

export type HistoryItem = {
  number: string;
  correctDigitCount: number;
  correctPositionCount: number;
};

export const useHistory = (initialHistory: Array<HistoryItem> = []) => {
  const [history, setHistory] = useState<Array<HistoryItem>>(initialHistory);

  useEffect(() => {
    setHistory(initialHistory);
  }, [initialHistory]);

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
