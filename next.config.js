/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iftpzmcsvgvnapsscqqu.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
