import { useState } from "react";
import { ANumber } from "./useNumber";

export type NumberLog = {
  number: string;
  correctDigitCount: number;
  correctPositionCount: number;
};

const generatedNumber = "1234";

const checkCorrectness = (splittedNumber: string[], numberToCheck: string) => {
  let correctDigitCount = 0;
  let correctPositionCount = 0;

  numberToCheck.split("").forEach((digit: string, i) => {
    if (splittedNumber.includes(digit)) {
      correctDigitCount += 1;
    }
    if (splittedNumber.findIndex((num) => num === digit) === i) {
      correctPositionCount += 1;
    }
  });
  return { correctPositionCount, correctDigitCount };
};

export function useGameLogic(splittedNumber: ANumber) {
  const [numbersLog, setNumbersLog] = useState<Array<NumberLog>>([]);

  const { correctDigitCount, correctPositionCount } = checkCorrectness(
    splittedNumber,
    generatedNumber
  );

  const updateNumberLogWithLatestNumber = () => {
    setNumbersLog((prev) => [
      ...prev,
      {
        number: splittedNumber.join(""),
        correctDigitCount,
        correctPositionCount,
      },
    ]);
  };

  return { numbersLog, updateNumberLogWithLatestNumber };
}
