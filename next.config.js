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
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: `${process.env.BLOG_URL}`,
      },
      {
        source: "/blog/:path*",
        destination: `${process.env.BLOG_URL}/:path*`,
      },
      {
        source: "/docs",
        destination: `${process.env.DOCS_URL}`,
      },
      {
        source: "/docs/:path*",
        destination: `${process.env.DOCS_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
