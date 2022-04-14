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

export function useGameLogic() {
  const [numbersLog, setNumbersLog] = useState<Array<NumberLog>>([]);
  const [isCorrectNumber, setIsCorrectNumber] = useState(false);

  const checkNumber = (guessedNumber: string[]) => {
    const { correctDigitCount, correctPositionCount } = checkCorrectness(
      guessedNumber,
      generatedNumber
    );
    setIsCorrectNumber(guessedNumber.length === correctPositionCount);
    setNumbersLog((prev) => [
      ...prev,
      {
        number: guessedNumber.join(""),
        correctDigitCount,
        correctPositionCount,
      },
    ]);
  };

  return { numbersLog, checkNumber, isCorrectNumber };
}
