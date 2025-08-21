/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Add this for AWS Amplify
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig