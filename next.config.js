/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doujin.desu.xxx',
      },
      {
        protocol: 'https',
        hostname: 'amz-ch.desu.pics',
      },
      {
        protocol: 'https',
        hostname: 'pic.desu.xxx',
      },
      {
        protocol: 'https',
        hostname: 'cdn-static.desu.xxx',
      },
      {
        protocol: 'https',
        hostname: 'nekopoi.care',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;