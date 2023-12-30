/** @type {import('next').NextConfig} */
const nextConfig = {
  //  basePath: "/transparencia"
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  }
}

module.exports = nextConfig
