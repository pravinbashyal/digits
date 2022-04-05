import { useState } from "react";
import { ANumber } from "./useNumber";

export function useNumberLog(splittedNumber: ANumber) {
  const [numbersLog, setNumbersLog] = useState<string[]>([]);

  const updateNumberLogWithLatestNumber = () => {
    setNumbersLog((prev) => [...prev, splittedNumber.join("")]);
  };
  return { numbersLog, updateNumberLogWithLatestNumber };
}
