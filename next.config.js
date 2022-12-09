/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async rewrites() {
    return [
      {
        source: "/videos/:path*",
        destination: "https://api-gw.sports.naver.com/video/lists/:path*",
      },
      {
        source: "/highlight/sbs/:path*",
        destination: "https://naver-sbs-h.smartmediarep.com/:path*",
      },
      {
        source: "/highlight/kbs/:path*",
        destination: "https://naver-kbs-h.smartmediarep.com/:path*",
      },
      {
        source: "/highlight/mbc/:path*",
        destination: "https://naver-mbc-h.smartmediarep.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
