import React from "react";

export const NumberDisplaySection = ({ numbers }: { numbers: string[] }) => {
  console.log({ numbers });
  return (
    <section
      aria-label="number input section"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        height: "2rem",
        width: "2rem",
        padding: "1rem",
        margin: "1rem",
        border: "1px solid rgba(50,50,50,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {digit}
    </p>
  );
};
