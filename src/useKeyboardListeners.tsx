import { useEffect } from "react";
import { digits } from "./App";

export const useKeyboardListeners = ({
  addDigitToNumber,
  removeDigitFromNumber,
  onPressEnter,
}: {
  addDigitToNumber: (num: string) => void;
  removeDigitFromNumber: () => void;
  onPressEnter: () => void;
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
          onPressEnter();
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
  }, [addDigitToNumber, removeDigitFromNumber, onPressEnter]);
};
