/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: "loose",
    appDir: true, // Ensure this aligns with your usage
  },
  // Add other configurations as needed
};

module.exports = nextConfig;
