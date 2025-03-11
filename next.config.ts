import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许从任何域加载图片
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // 开发环境不优化图片
    unoptimized: process.env.NODE_ENV !== "production",
  },
  // 启用 React 严格模式
  reactStrictMode: true,
  // 输出独立构建，便于部署
  output: "standalone",
};

export default nextConfig;
