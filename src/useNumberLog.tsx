import { useState } from "react";
import { ANumber } from "./useNumber";

export function useNumberLog(splittedNumber: ANumber) {
  const [numberLog, setNumberLog] = useState<Array<ANumber>>([]);

  const updateNumberLogWithLatestNumber = () => {
    setNumberLog((prev) => [...prev, splittedNumber]);
  };
  return { numberLog, updateNumberLogWithLatestNumber };
}
