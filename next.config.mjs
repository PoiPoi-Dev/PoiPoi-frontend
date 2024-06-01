/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travelmate.tech",
        port: "",
        pathname: "/media/images/cache/**",
      },
      {
        protocol: "https",
        hostname: "japandeluxetours.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.japan-guide.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.gltjp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/commons/thumb/**/**/**",
      },
    ],
  },
};

export default nextConfig;
