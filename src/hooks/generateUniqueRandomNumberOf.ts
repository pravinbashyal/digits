export function generateUniqueRandomNumberOf({ length }: { length: number }) {
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
