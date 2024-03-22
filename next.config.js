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
    NEXT_PUBLIC_LOCAL_URL:"http://localhost:3000",
    NEXT_PUBLIC_PROD_URL:"https://aquakart.co.in",
    NEXT_PUBLIC_MERCHANT_ID: "PGTESTPAYUAT",
    NEXT_PUBLIC_SALT_INDEX: 1,
    NEXT_PUBLIC_SALT_KEY: "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399",
    apiKey: "https://aquakart.co.in",
  },
};

module.exports = nextConfig;
