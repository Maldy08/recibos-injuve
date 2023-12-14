/** @type {import('next').NextConfig} */
const nextConfig = {
  //  basePath: "/transparencia"
  serverRuntimeConfig: {
    NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET
  }
}

module.exports = nextConfig
