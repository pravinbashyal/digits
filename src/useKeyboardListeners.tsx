import { useEffect } from "react";
import { digits } from "./App";

export const useKeyboardListeners = ({
  addDigitToNumber,
  removeDigitFromNumber,
  updateNumberLogWithLatestNumber,
}: {
  addDigitToNumber: (num: string) => void;
  removeDigitFromNumber: () => void;
  updateNumberLogWithLatestNumber: () => void;
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e?.key) {
        return;
      }
      if (digits.includes(e?.key)) {
        addDigitToNumber(e?.key);
      }
      switch (e.key) {
        case "Enter":
          updateNumberLogWithLatestNumber();
          break;
        case "Backspace":
          removeDigitFromNumber();
          break;
        default:
          console.log();
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    addDigitToNumber,
    removeDigitFromNumber,
    updateNumberLogWithLatestNumber,
  ]);
};
