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
  redirects: async () => {
    return [
      {
        source: "/nominate",
        destination: "/",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
