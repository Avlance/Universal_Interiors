/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
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
