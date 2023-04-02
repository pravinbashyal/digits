import { borderStyle } from "../styles";
import { Styles } from "../types/styles";
import { useCurrentInputNumber, numberLength } from "../hooks/useNumber";
import { NumberDisplaySection } from "../components/NumberDisplaySection";
import { NumberInputSection } from "../components/NumberInputSection";
import { useKeyboardListeners } from "../hooks/useKeyboardListeners";
import { useGameLogic } from "../hooks/useGameLogic";
import { useNumbersHistory } from "../hooks/useNumbersHistory";
import { NumbersHistory } from "../components/NumbersHistory";
import { Timer } from "../components/Timer";
import { useGeneratedNumber } from "../hooks/useGeneratedNumber";

export function Game() {
  const {
    splittedNumber,
    addDigitToInputNumber,
    removeDigitFromInputNumber,
    clearInputNumber,
  } = useCurrentInputNumber();

  const { generatedNumber, generateRandomNumber } = useGeneratedNumber({
    length: numberLength,
  });

  const { checkNumber, isCorrectNumber, resetLogic } =
    useGameLogic(generatedNumber);
  const { addToNumberHistory, numbersHistory, resetHistory } =
    useNumbersHistory();

  const onEnterButtonEvent = () => {
    if (splittedNumber.includes("")) return;
    const numberCheckResult = checkNumber(splittedNumber);
    addToNumberHistory({
      ...numberCheckResult,
      number: splittedNumber.join(""),
    });
    clearInputNumber();
  };

  useKeyboardListeners({
    addDigitToNumber: addDigitToInputNumber,
    removeDigitFromNumber: removeDigitFromInputNumber,
    onPressEnter: onEnterButtonEvent,
    gameEnded: isCorrectNumber,
  });

  const restartGame = () => {
    resetLogic();
    generateRandomNumber();
    resetHistory();
  };

  return (
    <section className="container columns" style={styles.app}>
      <Timer></Timer>
      <button onClick={restartGame}>restart game</button>
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
            <button onClick={restartGame}>restart game</button>
          </>
        ) : null}
      </main>
      <aside className="col-md-12 column col-4 ">
        <NumbersHistory numbersLog={numbersHistory}></NumbersHistory>
      </aside>
    </section>
  );
}

const styles: Styles = {
  mainSection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  headerSection: {
    minWidth: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    marginLeft: -20,
  },
  header: {
    borderBottom: borderStyle,
    width: "400px",
    fontSize: "3.5rem",
  },
  app: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflowY: "scroll",
    minHeight: "100%",
    maxWidth: "1200px",
  },
};
