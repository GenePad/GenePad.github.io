/* 无头浏览器支撑：预渲染（prerender.mjs）与 OG 图生成（og-image.mjs）共用。
 *
 * 两个约束决定了这里的做法：
 * 1. puppeteer-core 不自带浏览器 —— 用系统已装的 Chrome/Edge，避免下载 ~150MB Chromium；
 * 2. 本机上 puppeteer 自带的启动流程会直接失败（进程 code 0 退出、无 stderr），
 *    但手工按同样的参数启动 Edge 完全正常。因此改为「自己 spawn + 用 CDP 连上去」。
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CANDIDATES = {
  win32: [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    `${process.env.LOCALAPPDATA ?? ""}/Google/Chrome/Application/chrome.exe`,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ],
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
  ],
};

export function findBrowser() {
  const override = process.env.PRERENDER_BROWSER;
  if (override) {
    if (!fs.existsSync(override)) {
      throw new Error(`PRERENDER_BROWSER 指向的文件不存在：${override}`);
    }
    return override;
  }
  const found = (CANDIDATES[process.platform] ?? []).find((p) => p && fs.existsSync(p));
  if (!found) {
    throw new Error(
      "未找到 Chrome/Edge。请安装 Chrome，或用 PRERENDER_BROWSER=/path/to/chrome 指定可执行文件。",
    );
  }
  return found;
}

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

function waitForDevTools(port, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get(
        { host: "127.0.0.1", port, path: "/json/version", timeout: 2000 },
        (res) => {
          res.resume();
          if (res.statusCode === 200) resolve();
          else retry();
        },
      );
      req.on("error", retry);
      req.on("timeout", () => {
        req.destroy();
        retry();
      });
    };
    const retry = () => {
      if (Date.now() > deadline) {
        reject(new Error("等待浏览器调试端口超时"));
        return;
      }
      setTimeout(attempt, 250);
    };
    attempt();
  });
}

/** 启动无头浏览器并连上 CDP；返回 { browser, close() } */
export async function launchBrowser({ width = 1440, height = 900, hostMap = [] } = {}) {
  const executablePath = findBrowser();
  const port = await freePort();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "genepad-headless-"));
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    // 只渲染本地服务，绕开系统级代理设置，避免 en.genepad.cn 的本地映射被代理拦走
    "--no-proxy-server",
    `--window-size=${width},${height}`,
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
  ];
  if (hostMap.length > 0) {
    // 把真实主机名解析到本地服务，让预渲染出的页面按线上主机名计算站内链接
    args.push(`--host-resolver-rules=${hostMap.map((h) => `MAP ${h} 127.0.0.1`).join(", ")}`);
  }
  args.push("about:blank");

  const child = spawn(executablePath, args, { stdio: "ignore" });

  const cleanup = () => {
    if (!child.killed) child.kill();
    try {
      // Windows 上浏览器进程退出后仍可能短暂持有 profile 文件，删不掉就留给系统清理临时目录
      fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch {
      /* 忽略 */
    }
  };

  try {
    await waitForDevTools(port);
    const browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${port}`,
      defaultViewport: { width, height, deviceScaleFactor: 1 },
    });
    return {
      browser,
      async close() {
        try {
          await browser.close();
        } catch {
          /* 浏览器可能已退出 */
        }
        cleanup();
      },
    };
  } catch (err) {
    cleanup();
    throw err;
  }
}
