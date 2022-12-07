/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: 'https://api-gw.sports.naver.com/video/lists/:path*',
      },
    ]
  },
};

module.exports = nextConfig;
