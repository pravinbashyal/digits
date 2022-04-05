import { useState } from "react";
import { ANumber } from "./useNumber";

export function useNumberLog(splittedNumber: ANumber) {
  const [numberLog, setNumberLog] = useState<string[]>([]);

  const updateNumberLogWithLatestNumber = () => {
    setNumberLog((prev) => [...prev, splittedNumber.join("")]);
  };
  return { numberLog, updateNumberLogWithLatestNumber };
}
