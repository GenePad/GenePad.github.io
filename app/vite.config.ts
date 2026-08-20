import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 构建产物直接输出到仓库的 docs/（Cloudflare Pages 与 GitHub Pages 都从这里托管）
    // emptyOutDir: false —— 保留 docs/ 下的 release/、update.json、既有静态页
    outDir: path.resolve(__dirname, "../docs"),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "tech-support": path.resolve(__dirname, "tech-support.html"),
        projects: path.resolve(__dirname, "projects.html"),
        library: path.resolve(__dirname, "library.html"),
      },
    },
  },
});
