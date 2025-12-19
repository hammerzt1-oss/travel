/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 需要配置 output
  // 但 Next.js 14 App Router 默认不支持静态导出
  // 如果使用动态路由，可能需要使用 Cloudflare 的 Next.js 支持
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
  // 如果需要静态导出（不推荐，会失去动态路由功能）
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig


