import { generateUniqueRandomNumberOf } from "../utils/generateUniqueRandomNumberOf";
import { numberLength } from "../hooks/useNumber";

export function generateNumber() {
  return generateUniqueRandomNumberOf({
    length: numberLength,
  });
}
