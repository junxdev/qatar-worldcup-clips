/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async rewrites() {
    return [
      // CORS error when using SSG in hls.js in highlights/:path
      {
        source: "/highlights/sbs/:path*",
        destination: "https://naver-sbs-h.smartmediarep.com/:path*",
      },
      {
        source: "/highlights/kbs/:path*",
        destination: "https://naver-kbs-h.smartmediarep.com/:path*",
      },
      {
        source: "/highlights/mbc/:path*",
        destination: "https://naver-mbc-h.smartmediarep.com/:path*",
      },
      // CORS error when using SSG in hls.js in highlights/:path
    ];
  },
};

module.exports = nextConfig;
