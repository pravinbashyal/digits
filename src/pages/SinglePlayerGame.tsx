import { numberLength } from "../hooks/useNumber";
import { useGameLogic } from "../hooks/useGameLogic";
import { useHistory } from "../hooks/useHistory";
import { generateUniqueRandomNumberOf } from "../utils/generateUniqueRandomNumberOf";
import { GameRoot } from "../components/GameRoot";
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
  const { addToHistory, history, resetHistory } = useHistory();

  const restartGame = () => {
    resetLogic();
    generatedNumber.current = generateNumber();
    resetHistory();
  };

  return (
    <GameRoot
      isCorrectNumber={isCorrectNumber}
      numbersHistory={history}
      onSubmitNumber={(splittedNumber: string[]) => {
        const numberCheckResult = checkNumber(splittedNumber);
        addToHistory({
          ...numberCheckResult,
          number: splittedNumber.join(""),
        });
      }}
      onRestartGame={restartGame}
    ></GameRoot>
  );
}
