export function vercelURL() {
  return process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL
    : undefined;
}

export function appURL() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  } else {
    const url =
      process.env.NEXT_PUBLIC_APP_URL || vercelURL() || "http://localhost:3000";
    return url;
  }
}
