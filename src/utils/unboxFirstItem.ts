export const unboxFirstItem = <ArrayData extends any>(
  data: ArrayData[]
): ArrayData => {
  if (!data || data.length < 1) return null;
  return data[0];
};
