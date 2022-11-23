/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async rewrites() {
    return [
      {
        source: "/video/:path*",
        destination: "https://api-gw.sports.naver.com/video/:path*",
      },
      {
        source: "/streaming/:path*",
        destination: "https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
