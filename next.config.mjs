/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // transpilePackages: ['@heroui/react', '@heroui/styles'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    
      
    ]
  }
};

export default nextConfig;