/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/nominate",
        destination: "/",
        permanent: true,
      },
      {
        source: "/airdrop/nominate",
        destination: "/stats",
        permanent: true,
      },
      {
        source: "/airdrop/nominate/:path",
        destination: "/nominate/:path",
        permanent: true,
      },
      {
        source: "/airdrop",
        destination: "/stats",
        permanent: true,
      },
      {
        source: "/leaderboard",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
