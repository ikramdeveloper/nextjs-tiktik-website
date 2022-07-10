/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["randomuser.me", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
