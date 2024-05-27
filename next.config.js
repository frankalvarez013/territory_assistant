/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
