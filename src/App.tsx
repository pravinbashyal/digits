import React from "react";
import "./App.css";
import { useNumber } from "./useNumber";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";
import { useKeyboardListeners } from "./useKeyboardListeners";
import { useGameLogic } from "./useGameLogic";
import { borderStyle } from "./styles";
import { NumbersHistory } from "./NumbersHistory";
import { Styles } from "./types/styles";

export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

export default function App() {
  const {
    splittedNumber,
    addDigitToNumber,
    removeDigitFromNumber,
    resetNumberAndParams,
  } = useNumber();

  const { checkNumber, numbersLog, isCorrectNumber } = useGameLogic();

  const onEnterButtonEvent = () => {
    if (splittedNumber.includes("")) return;
    checkNumber(splittedNumber);
    resetNumberAndParams();
  };

  const { removeKeyboardListener } = useKeyboardListeners({
    addDigitToNumber,
    removeDigitFromNumber,
    onPressEnter: onEnterButtonEvent,
    gameEnded: isCorrectNumber,
  });

  if (isCorrectNumber) {
    removeKeyboardListener();
  }

  return (
    <section className="App" style={styles.app}>
      <main style={styles.mainSection}>
        <h1 style={styles.header}>Digits</h1>
        <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
        <NumberInputSection
          addDigitToNumber={addDigitToNumber}
          removeDigitFromNumber={removeDigitFromNumber}
          onClickEnter={onEnterButtonEvent}
          areButtonsDisabled={isCorrectNumber}
        ></NumberInputSection>
        {isCorrectNumber ? <p>The number was {numbersLog[0]?.number}</p> : null}
      </main>
      <NumbersHistory numbersLog={numbersLog}></NumbersHistory>
    </section>
  );
}

const styles: Styles = {
  mainSection: {
    padding: "1rem",
    display: "flex",
    flex: "8",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    borderBottom: borderStyle,
    width: "calc(100% + 2rem)",
    marginLeft: "-1rem",
    marginRight: "-1rem",
  },
  app: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
  },
};
