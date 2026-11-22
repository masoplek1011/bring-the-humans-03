// bring-the-humans-03 entry (Node 22, standard library only).
//
// The entry is a TikTok video ad for make.fun; this program's only job is to
// hand the video's address to the gate: it copies VIDEO.json from the repo
// root into the output directory the grader reads. Nothing else here is
// scored — the video itself, its views on TikTok, is the entry.
//
// The ad was made in the same session that wrote this file: its scenes live
// in ad/scene.html, rendered frame by frame with Playwright Chromium by
// ad/render.mjs, then assembled with ffmpeg by ad/assemble.sh, which lays
// make.fun's brand badge over it from the first frame and ends it on the
// press pack's referral end card with the entrant's own code typed in.
// CONCEPT.md documents the creative decisions.
//
// Local check (mirrors the grader's run):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// out/VIDEO.json must then be byte for byte identical to VIDEO.json here.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(join(botDir, "VIDEO.json"), join(outputDir, "VIDEO.json"));
} catch (err) {
  console.error(`could not copy VIDEO.json out of ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
