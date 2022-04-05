import React, { DOMAttributes, memo } from "react";
import { digits } from "./App";

export const NumberInputSection = memo(
  ({ addDigitToNumber }: { addDigitToNumber: (num: string) => void }) => (
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
        border: "1px solid rgba(50,50,50,0.5)",
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
