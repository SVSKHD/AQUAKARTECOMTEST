/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack(config, options) {
    return config;
  },
  env: {
    apiKey: "https://aquakart.co.in"
  },
};

module.exports = nextConfig;
