export const makeMap = <T, V = T, K = string>(
  array: T[],
  getId: (t: T) => string | number,
  getContent: (t: T, m: Record<string, V>) => V = (t) => t as unknown as V,
): Record<string, V> => {
  return array.reduce(
    (sum, v) => {
      sum[getId(v)] = getContent(v, sum);
      return sum;
    },
    {} as Record<string, V>,
  );
};
