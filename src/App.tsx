import React from "react";
import "spectre.css";
import { useNumber } from "./useNumber";
import { NumberDisplaySection } from "./NumberDisplaySection";
import { NumberInputSection } from "./NumberInputSection";
import { useKeyboardListeners } from "./useKeyboardListeners";
import { useGameLogic } from "./useGameLogic";
import { borderStyle } from "./styles";
import { NumbersHistory } from "./NumbersHistory";
import { Styles } from "./types/styles";

export const digitsAsString = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) =>
  String(num)
);

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
    <section className="container columns" style={styles.app}>
      <main className="col-md-12 column col-8" style={styles.mainSection}>
        <NumberDisplaySection numbers={splittedNumber}></NumberDisplaySection>
        <NumberInputSection
          addDigitToNumber={addDigitToNumber}
          removeDigitFromNumber={removeDigitFromNumber}
          onClickEnter={onEnterButtonEvent}
          areButtonsDisabled={isCorrectNumber}
        ></NumberInputSection>
        {isCorrectNumber ? (
          <p>The number was {numbersLog[numbersLog.length - 1]?.number}</p>
        ) : null}
      </main>
      <aside className="col-md-12 column col-4 ">
        <NumbersHistory numbersLog={numbersLog}></NumbersHistory>
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
  },
  header: {
    borderBottom: borderStyle,
    width: "400px",
    fontSize: "3rem",
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
