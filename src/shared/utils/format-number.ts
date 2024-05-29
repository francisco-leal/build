/**
 * Returns US style representation of a number with 2 decimal places.
 * i.e. 1234567.89241 => 1,234,567.89
 */
export const formatNumber = (n: number, decimalPoints: number = 2) => {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimalPoints,
    maximumFractionDigits: decimalPoints,
  });
};

/**
 * Returns US style representation of a large number, using
 * metric prefixes (K, M, B) to abbreviate the number, always
 * with at least 3 significant digits. No decimal points.
 *
 * i.e. 21_234_567 => 21,235K
 * i.e. 3_121_234_567 => 3,121M
 * i.e. 4_123_121_234_567 => 4,123B
 * i.e. 124.2412 => 124
 */
export const formatLargeNumber = (n: number) => {
  const [divider, suffix] = (() => {
    if (n > 1e12) return [1e12, "T"];
    if (n > 1e9) return [1e9, "B"];
    if (n > 1e6) return [1e6, "M"];
    if (n > 1e3) return [1e3, "K"];
    return [1, ""];
  })();

  const basedNumber = n / divider;
  const localizedNumber = formatNumber(basedNumber, 2);
  return `${localizedNumber}${suffix}`;
};
