/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      {
        source: "/airdrop/nominate",
        destination: "/airdrop",
        permanent: true,
      },
      {
        source: "/airdrop/nominate/:path",
        destination: "/nominate/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
