/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/cms/api/v1/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/cms/api/v1/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
