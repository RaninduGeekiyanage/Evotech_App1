/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.media-amazon.com",
        port: "", // Optional, leave blank if no specific port is used
        pathname: "/images/**", // Match paths under /images/
        search: ""
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "", // Optional, leave blank if no specific port is used
        pathname: "/**", // Match paths under /images/
        search: ""
      },
    ],
  },
};

export default nextConfig;
