import React from "react";
import { borderStyle } from "../styles";

export const NumberDisplaySection = ({ numbers }: { numbers: string[] }) => {
  return (
    <section
      aria-label="number input section"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      {numbers.map((digit, i) => (
        <NumberItem digit={digit} key={`${digit}-${i}`}></NumberItem>
      ))}
    </section>
  );
};

const NumberItem = ({ digit }: { digit: string }) => {
  return (
    <p
      style={{
        height: "4rem",
        width: "4rem",
        padding: "1rem",
        margin: "1rem",
        border: borderStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {digit}
    </p>
  );
};
