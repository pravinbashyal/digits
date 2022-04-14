import { useState } from "react";

const generateUniqueRandomNumberOf = ({ length }: { length: number }) => {
  let numberSplitted: number[] = [];
  let currentNumber: number | undefined;
  while (numberSplitted.length < length) {
    currentNumber = Math.floor(Math.random() * 10);
    if (numberSplitted.includes(currentNumber)) {
      continue;
    }
    numberSplitted.push(currentNumber);
  }
  return numberSplitted.join("");
};

const generatedNumber = generateUniqueRandomNumberOf({ length: 4 });

export function useGameLogic() {
  const [numbersLog, setNumbersLog] = useState<Array<NumberLog>>([]);
  const [isCorrectNumber, setIsCorrectNumber] = useState(false);

  const checkNumber = (userInputNumber: string[]) => {
    const { correctDigitCount, correctPositionCount } = checkCorrectness(
      userInputNumber,
      generatedNumber
    );
    setIsCorrectNumber(userInputNumber.length === correctPositionCount);
    setNumbersLog((prev) => [
      ...prev,
      {
        number: userInputNumber.join(""),
        correctDigitCount,
        correctPositionCount,
      },
    ]);
  };

  return { numbersLog, checkNumber, isCorrectNumber };
}

const checkCorrectness = (
  userInputNumber: string[],
  generatedNumber: string
) => {
  let correctDigitCount = 0;
  let correctPositionCount = 0;

  let userInputNumberCopy = userInputNumber;
  generatedNumber.split("").forEach((digit: string) => {
    if (userInputNumberCopy.includes(digit)) {
      correctDigitCount += 1;
      userInputNumberCopy = withoutFirstOccurence({
        of: digit,
        from: userInputNumberCopy,
      });
    }
  });

  generatedNumber.split("").forEach((digit: string, i) => {
    if (generatedNumber[i] === userInputNumber[i]) {
      correctPositionCount += 1;
    }
  });
  return { correctPositionCount, correctDigitCount };
};

export type NumberLog = {
  number: string;
  correctDigitCount: number;
  correctPositionCount: number;
};

const withoutFirstOccurence = ({
  of: digitToCheck,
  from: numbersArray,
}: {
  of: string;
  from: Array<string>;
}) => {
  let isAlreadyDeleted = false;
  return numbersArray.filter(
    (digit) => isAlreadyDeleted || digit !== digitToCheck
  );
};
