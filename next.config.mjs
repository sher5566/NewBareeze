/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: ["cdn.comverseglobal.com"],
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Disable cache in development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
