import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 部署优化：启用压缩
  compress: true,

  // 生产环境移除 console（保留 error/warn）
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // 安全响应头
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],

  // 静态资源缓存
  cacheComponents: true,
};

export default nextConfig;