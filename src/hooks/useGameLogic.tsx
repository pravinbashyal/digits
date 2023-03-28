import { useState } from "react";

export function useGameLogic(generatedNumber: string) {
  const [isCorrectNumber, setIsCorrectNumber] = useState(false);

  const checkNumber = (userInputNumber: string[]) => {
    const { correctDigitCount, correctPositionCount } = checkCorrectness(
      userInputNumber,
      generatedNumber
    );
    setIsCorrectNumber(userInputNumber.length === correctPositionCount);
    return { correctDigitCount, correctPositionCount };
  };

  const resetLogic = () => {
    setIsCorrectNumber(false);
  };

  return { checkNumber, isCorrectNumber, resetLogic };
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

  generatedNumber.split("").forEach((_, i) => {
    if (generatedNumber[i] === userInputNumber[i]) {
      correctPositionCount += 1;
    }
  });
  return { correctPositionCount, correctDigitCount };
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
