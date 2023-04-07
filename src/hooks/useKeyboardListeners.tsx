import { useCallback, useEffect } from "react";
import { digitsAsString } from "../constants/digitsAsString";

export const useKeyboardListeners = ({
  addDigitToNumber,
  removeDigitFromNumber,
  onPressEnter,
  gameEnded,
  disableListen,
}: {
  addDigitToNumber: (num: string) => void;
  removeDigitFromNumber: () => void;
  onPressEnter: () => void;
  gameEnded: boolean;
  disableListen: boolean;
}) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e?.key || disableListen) {
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
  }, [gameEnded, onPressEnter, addDigitToNumber, removeDigitFromNumber]);
  const removeKeyboardListener = () =>
    document.removeEventListener("keydown", onKeyDown);

  return { removeKeyboardListener };
};
