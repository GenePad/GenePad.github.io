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
        ngs: path.resolve(__dirname, "ngs.html"),
        tutorial: path.resolve(__dirname, "tutorial.html"),
        "tutorial-ai": path.resolve(__dirname, "tutorial-ai.html"),
        "tutorial-library": path.resolve(__dirname, "tutorial-library.html"),
        "tutorial-ngs": path.resolve(__dirname, "tutorial-ngs.html"),
        "tutorial-lang": path.resolve(__dirname, "tutorial-lang.html"),
        "tutorial-langpack": path.resolve(__dirname, "tutorial-langpack.html"),
        stats: path.resolve(__dirname, "stats.html"),
        // 各纯语言镜像壳页：app/<dir>/*.html → docs/<dir>/*.html，与中文页共用同一套 /src 模块
        // （_worker.js 把镜像主机下的路径映射到 /<dir> 子树；en/cn 为手写底稿，
        // de/ru/jp/kr/fr 由 scripts/gen-shells.mjs 从 en 模板生成）
        ...Object.fromEntries(
          ["en", "cn", "de", "ru", "jp", "kr", "fr"].flatMap((dir) =>
            [
              ["main", "index.html"],
              ["tech-support", "tech-support.html"],
              ["projects", "projects.html"],
              ["library", "library.html"],
              ["ngs", "ngs.html"],
              ["tutorial", "tutorial.html"],
              ["tutorial-ai", "tutorial-ai.html"],
              ["tutorial-library", "tutorial-library.html"],
              ["tutorial-ngs", "tutorial-ngs.html"],
              ["tutorial-lang", "tutorial-lang.html"],
              ["tutorial-langpack", "tutorial-langpack.html"],
              ["stats", "stats.html"],
            ].map(([key, file]) => [`${dir}-${key}`, path.resolve(__dirname, dir, file)]),
          ),
        ),
      },
    },
  },
});
