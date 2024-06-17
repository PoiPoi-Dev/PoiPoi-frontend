/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      has: [
        {
          type: "header",
          key: "User-Agent",
          value:
            "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; Microsoft; Lumia 950)",
        },
      ],
      destination: "/map",
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**/**/**",
      },
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
      {
        protocol: "http",
        hostname: "w3.org",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
};

export default nextConfig;
