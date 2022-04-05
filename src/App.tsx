import React, { useEffect, useState } from "react";
import "./App.css";

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => String(num));

function App() {
  const [splittedNumber, setSplittedNumber] = useState<string[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (digits.includes(e?.key)) {
        console.log("is digit");
        setSplittedNumber((prevNum) => [...prevNum, e.key]);
      }
    };

    document.addEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="App">
      <NumberInputSection numbers={splittedNumber}></NumberInputSection>
    </section>
  );
}

export default App;

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

const NumberInputSection = ({ numbers }: { numbers: string[] }) => (
  <section
    aria-label="number input section"
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    {numbers.map((digit, i) => (
      <NumberItem digit={digit} key={`${digit}-${i}`}></NumberItem>
    ))}
  </section>
);
