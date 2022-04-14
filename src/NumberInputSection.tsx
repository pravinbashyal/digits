import React, { DOMAttributes, memo } from "react";
import { digits } from "./App";
import { borderStyle } from "./styles";

export const NumberInputSection = memo(
  ({
    addDigitToNumber,
    removeDigitFromNumber,
    onClickEnter,
    areButtonsDisabled,
  }: {
    addDigitToNumber: (num: string) => void;
    removeDigitFromNumber: () => void;
    onClickEnter: () => void;
    areButtonsDisabled: boolean;
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
          disabled={areButtonsDisabled}
        ></ADigitInput>
      ))}
      <ADigitInput
        digit="Backspace"
        onClick={removeDigitFromNumber}
        disabled={areButtonsDisabled}
      ></ADigitInput>
      <ADigitInput
        digit="Enter"
        disabled={areButtonsDisabled}
        onClick={onClickEnter}
      ></ADigitInput>
    </section>
  )
);

type ADigitInputProps = {
  digit: string;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
  disabled: boolean;
};

const ADigitInput: React.FC<ADigitInputProps> = memo(
  ({ digit, onClick, disabled }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
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
  }
);
