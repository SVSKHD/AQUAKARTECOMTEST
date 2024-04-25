// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_LOCAL_URL: "http://localhost:3000",
    NEXT_PUBLIC_PROD_URL: "https://aquakart.co.in",
    apiKey: "https://aquakart.co.in",
  },
};

export default nextConfig;
