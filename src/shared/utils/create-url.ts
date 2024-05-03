import path from "path"

const createUrl = (
  base: string,
  path: string,
  params: Record<string, string>
) => {
  const url = new URL(path, base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}