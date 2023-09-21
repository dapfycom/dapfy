/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.elrond.com", "placehold.co"],
  },
  transpilePackages: ["@multiversx/sdk-dapp"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
