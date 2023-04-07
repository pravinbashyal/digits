import { numberLength } from "../hooks/useNumber";
import { useGameLogic } from "../hooks/useGameLogic";
import { useNumbersHistory } from "../hooks/useNumbersHistory";
import { generateUniqueRandomNumberOf } from "../hooks/useGeneratedNumber";
import { GameRoot } from "./GameRoot";
import { useRef } from "react";

function generateNumber() {
  return generateUniqueRandomNumberOf({
    length: numberLength,
  });
}

export function SinglePlayerGame() {
  const generatedNumber = useRef<string>();
  if (!generatedNumber.current) {
    generatedNumber.current = generateNumber();
  }

  const { checkNumber, isCorrectNumber, resetLogic } = useGameLogic(
    generatedNumber.current
  );
  const { addToNumberHistory, numbersHistory, resetHistory } =
    useNumbersHistory();

  const restartGame = () => {
    resetLogic();
    generatedNumber.current = generateNumber();
    resetHistory();
  };

  return (
    <GameRoot
      isCorrectNumber={isCorrectNumber}
      numbersHistory={numbersHistory}
      onSubmitNumber={(splittedNumber: string[]) => {
        const numberCheckResult = checkNumber(splittedNumber);
        addToNumberHistory({
          ...numberCheckResult,
          number: splittedNumber.join(""),
        });
      }}
      onRestartGame={restartGame}
    ></GameRoot>
  );
}
