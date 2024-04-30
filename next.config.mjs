/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  i18n: {
    locales: ["en-US", "zh-CN"],
    defaultLocale: "en-US",
  },
};

export default nextConfig;
