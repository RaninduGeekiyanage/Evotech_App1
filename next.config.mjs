/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "", // Optional, leave blank if no specific port is used
        pathname: "/images/**", // Match paths under /images/
      },
    ],
  },
};

export default nextConfig;
