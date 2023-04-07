import { useCurrentInputNumber } from "../hooks/useNumber";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";
import { useKeyboardListeners } from "../hooks/useKeyboardListeners";
import { NumbersHistory } from "./NumbersHistory";
import { Timer } from "./Timer";
import { styles } from "../pages/styles";
import { HistoryItem } from "../hooks/useHistory";

export function GameRoot({
  onRestartGame,
  isCorrectNumber,
  numbersHistory,
  onSubmitNumber,
  disableListen,
}: {
  onRestartGame: () => void;
  isCorrectNumber: boolean;
  numbersHistory: Array<HistoryItem>;
  onSubmitNumber: (splittedNumber: string[]) => void;
  disableListen?: boolean;
}) {
  const {
    splittedNumber,
    addDigitToInputNumber,
    removeDigitFromInputNumber,
    clearInputNumber,
  } = useCurrentInputNumber();

  const onEnterButtonEvent = () => {
    if (splittedNumber.includes("")) return;
    onSubmitNumber(splittedNumber);
    clearInputNumber();
  };
  useKeyboardListeners({
    disableListen: disableListen,
    addDigitToNumber: addDigitToInputNumber,
    removeDigitFromNumber: removeDigitFromInputNumber,
    onPressEnter: () => onEnterButtonEvent(),
    gameEnded: isCorrectNumber,
  });
  return (
    <section className="container columns" style={styles.app}>
      <Timer></Timer>
      <section style={styles.headerSection}>
        <h1 style={styles.header}>Digits</h1>
      </section>
      <main className="col-md-12 column col-8" style={styles.mainSection}>
        <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
        <NumberInputSection
          addDigitToNumber={addDigitToInputNumber}
          removeDigitFromNumber={removeDigitFromInputNumber}
          onClickEnter={onEnterButtonEvent}
          areButtonsDisabled={isCorrectNumber}
        ></NumberInputSection>
        {isCorrectNumber ? (
          <>
            <p>
              The number was {numbersHistory[numbersHistory.length - 1]?.number}
              . Number of attempts: {numbersHistory.length}.
            </p>
          </>
        ) : null}
        <button onClick={onRestartGame}>restart game</button>
      </main>
      <aside className="col-md-12 column col-4 ">
        <NumbersHistory numbersLog={numbersHistory}></NumbersHistory>
      </aside>
    </section>
  );
}
