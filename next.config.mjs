/**
 * @type {import('next').NextConfig}
 */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Cho phép tất cả các miền
        port: "",
        pathname: "/**", // Cho phép tất cả các đường dẫn
      },
    ],
  },
};

export default withNextIntl(nextConfig);
