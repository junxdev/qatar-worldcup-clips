/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/naver/:path*",
        destination: "https://api-gw.sports.naver.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
