import { useCallback, useEffect } from "react";
import { digitsAsString } from "./App";

export const useKeyboardListeners = ({
  addDigitToNumber,
  removeDigitFromNumber,
  onPressEnter,
  gameEnded,
}: {
  addDigitToNumber: (num: string) => void;
  removeDigitFromNumber: () => void;
  onPressEnter: () => void;
  gameEnded: boolean;
}) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e?.key) {
        return;
      }
      if (digitsAsString.includes(e?.key)) {
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
          break;
      }
    },
    [addDigitToNumber, onPressEnter, removeDigitFromNumber]
  );
  useEffect(() => {
    if (gameEnded) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    addDigitToNumber,
    removeDigitFromNumber,
    onPressEnter,
    onKeyDown,
    gameEnded,
  ]);

  const removeKeyboardListener = () =>
    document.removeEventListener("keydown", onKeyDown);

  return { removeKeyboardListener };
};
