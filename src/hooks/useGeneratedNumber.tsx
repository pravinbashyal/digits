import { useState } from "react";

export function useGeneratedNumber(
  { length }: { length: number } = { length: 4 }
) {
  const [generatedNumber, setGeneratedNumber] = useState<string>(
    generateUniqueRandomNumberOf({ length })
  );
  const generateRandomNumber = () => {
    setGeneratedNumber(generateUniqueRandomNumberOf({ length }));
  };

  return {
    generatedNumber,
    generateRandomNumber,
  };
}

function generateUniqueRandomNumberOf({ length }: { length: number }) {
  let numberSplitted: number[] = [];
  let currentNumber: number | undefined;
  while (numberSplitted.length < length) {
    currentNumber = Math.floor(Math.random() * 10);
    if (numberSplitted.includes(currentNumber)) {
      continue;
    }
    numberSplitted.push(currentNumber);
  }
  return numberSplitted.join("");
}
