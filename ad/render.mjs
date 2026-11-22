// Render bring-the-humans-03 ad frames from ad/scene.html with Playwright Chromium.
// Usage (from the repo root):
//   NODE_PATH=/path/to/playwright-core/node_modules node ad/render.mjs [outDir] [fps]
// Defaults: frames go to /tmp/bth03-frames, 30 fps, 20 s, 1080x1920.
// The scene's timeline is a pure function of t (window.__setTime), so every frame
// is deterministic; screenshots are PNG, one per frame, named frame-0000.png ...
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright-core"));
} catch {
  ({ chromium } = require("/home/hatch/workspace/grandtheftcrew/node_modules/playwright-core"));
}
import { mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const FPS = Number(process.argv[3] ?? 30);
const DURATION_S = 20;
const TOTAL = FPS * DURATION_S;
const outDir = resolve(process.argv[2] ?? "/tmp/bth03-frames");
mkdirSync(outDir, { recursive: true });

const exe = process.env.PLAYWRIGHT_CHROMIUM ??
  "/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome";
const scenePath = resolve(join("ad", "scene.html"));
if (!existsSync(exe)) throw new Error("Chromium binary not found: " + exe);
if (!existsSync(scenePath)) throw new Error("Scene not found: " + scenePath);

const browser = await chromium.launch({ executablePath: exe, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto("file://" + scenePath, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

for (let i = 0; i < TOTAL; i++) {
  const t = i / FPS;
  await page.evaluate((tt) => window.__setTime(tt), t);
  await page.screenshot({ path: join(outDir, `frame-${String(i).padStart(4, "0")}.png`) });
  if (i % 100 === 0) console.log(`frame ${i}/${TOTAL} t=${t.toFixed(2)}s`);
}
await browser.close();
console.log(`done: ${TOTAL} frames in ${outDir}`);
