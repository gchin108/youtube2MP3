/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: process.env.API_KEY,
        API_HOST: process.env.API_HOST,
    }
}

module.exports = nextConfig
