/**
 * Returns US style representation of a number with 2 decimal places.
 * i.e. 1234567.89241 => 1,234,567.89
 */
export const formatNumber = (n: number) => {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2 });
};
