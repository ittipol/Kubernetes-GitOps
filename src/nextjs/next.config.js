require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // env: {
  //   dbHost: process.env.DB_HOST,
  // }
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
