/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "th"],
    localeDetection: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
