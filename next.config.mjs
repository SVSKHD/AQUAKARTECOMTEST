// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's Strict Mode which can help identify components with unsafe lifecycles,
  // warn about legacy APIs, and help with finding unexpected side effects in the code.
  reactStrictMode: true,

  // Configuration for next/image component's allowed external domains
  images: {
    domains: ["res.cloudinary.com"],
  },

  // Environment variables that can be exposed to the browser
  env: {
    // Base URLs depending on the environment (development or production)
    NEXT_PUBLIC_LOCAL_URL: "http://localhost:3000",
    NEXT_PUBLIC_PROD_URL: "https://aquakart.co.in",

    // Payment gateway merchant ID for testing
    NEXT_PUBLIC_MERCHANT_ID: "PGTESTPAYUAT",

    // API keys and other sensitive information (ensure not to expose sensitive keys directly)
    NEXT_PUBLIC_SALT_INDEX: 1,
    NEXT_PUBLIC_SALT_KEY: "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399",
    apiKey: "https://aquakart.co.in",
  },
};

export default nextConfig;
