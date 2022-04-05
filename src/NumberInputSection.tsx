import React, { DOMAttributes, memo } from "react";
import { digits } from "./App";
import { borderStyle } from "./styles";

export const NumberInputSection = memo(
  ({
    addDigitToNumber,
    removeDigitFromNumber,
    onClickEnter,
  }: {
    addDigitToNumber: (num: string) => void;
    removeDigitFromNumber: () => void;
    onClickEnter: () => void;
  }) => (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {digits.map((digit) => (
        <ADigitInput
          digit={digit}
          onClick={() => addDigitToNumber(digit)}
          key={digit}
        ></ADigitInput>
      ))}
      <ADigitInput
        digit="Backspace"
        onClick={removeDigitFromNumber}
      ></ADigitInput>
      <ADigitInput digit="Enter" onClick={onClickEnter}></ADigitInput>
    </section>
  )
);

type ADigitInputProps = {
  digit: string;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
};

const ADigitInput: React.FC<ADigitInputProps> = memo(({ digit, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "1.5rem",
        margin: "1rem",
        border: borderStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0",
      }}
    >
      {digit}
    </button>
  );
});
