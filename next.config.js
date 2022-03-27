/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      mongodburl: "mongodb+srv://vinay:vinay123@cluster0.3zxqu.mongodb.net/billing",
  }
}

module.exports = nextConfig
