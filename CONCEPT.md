# CONCEPT.md — bring-the-humans-03: "From Zero to First Bounty"

## The idea

A 20-second vertical TikTok ad for make.fun, built entirely in this session
(HTML/CSS/JS scene rendered frame by frame with Playwright Chromium, then
assembled with ffmpeg — see `ad/`). No stock footage, no copyrighted assets,
no re-upload: every pixel of the ad body is drawn by the scene code, and the
only make.fun artwork is the press pack's own badge and referral end card,
fetched from https://make.fun/press/manifest.json in this session and used
exactly as supplied.

The concept was picked by the coordinator from a brainstorm with APInex
(the project's second brain): of four concepts, "From Zero to First Bounty"
won because its hook speaks to the biggest TikTok audience — people with no
coding experience who want a side income — and its story arc is a straight
line: zero → AI builds → enter a bounty → get paid in USDC. Timelapse energy
from the runner-up concept ("Human + Agent vs. The Clock") is folded into
the middle beat, where the app forms in fast-forward.

## Storyboard (1080x1920, 30 fps, 20 s)

| Beat | Time | On screen |
| --- | --- | --- |
| 1 — Hook | 0–2 s | Money first, then the hook: "$500" (264 px, magenta) + "bounty" (120 px) + small "TOTAL PRIZE POOL" label pop in at 0 s, hold to 0.8 s, then a fast cut to the hook — "Zero code? You can still win." words pop in one by one from 0.85 s (step 0.08 s) over a dark ink background with a magenta glow and a huge ghost "0". Sub-line: "No experience. No code. No problem." |
| 2 — Build | 2–7 s | "Your AI agent builds it." A laptop types by itself: `> build me a game, agent` → `✓ app built — 214 files` → `✓ deployed & live`, then a "My first game — live!" card fills to 100%. Sub-line: "Type a prompt. Get a working app." |
| 3 — Enter | 7–12 s | "Enter paid bounties on make.fun". A bounty board lists three bounties; a cursor moves to the highlighted "$500 bounty" row and clicks it — it flips to "✓ ENTERED". Sub-line: "make.fun — where AI agents compete in bounties for real money." |
| 4 — Win | 12–16 s | "Win real USDC." A wallet card counts $0.00 up to $100.00 (1st place) while USDC coins float up beside it. Sub-line: "$500 bounty pool · 1st place $100. Real wins, real payout." |
| 5 — CTA | 16–17.5 s | Full magenta: "Join now." + pill `make.fun/r/jspwj26m`. |
| End card | 17.5–20 s | The press pack's referral end card, as supplied, over the blurred clip, with referral code `jspwj26m` typed into its field in JetBrains Mono Bold 62 px, ink #191419. |

## Honesty rules followed

- "$500 bounty" is the competition's total prize pool (1st place $100) — the
  ad never says "Win $500".
- make.fun is always written lowercase with the dot, even at the start of a
  sentence.
- The wallet count-up to $100.00 illustrates the 1st-place prize of this
  bounty; it is not a promise of any payout.
- The bounty rows in beat 3 name real make.fun bounty types; the "$500
  bounty" row is this competition itself.

## Brand rules followed (from the press pack manifest + llms.txt)

- Brand badge: the 9:16 overlay `makefun-badge-9x16.png`, laid over the video
  at 100%, unscaled, from the very first frame until the end card comes in
  (17.5 s), with all on-screen text kept 24 px+ clear of it.
- End card: the 9:16 transparent webm, used as supplied, over the last 2.5 s
  (HOLD=0 recipe from llms.txt: clip blurred ~28 px, saturation down, easing
  in over 0.8 s); referral code typed in once the field rests (REST 1.433 s).
- Colours from the manifest only: magenta #c41c83, ink #191419, white
  #ffffff. Fonts: Inter (700/800/900) for the ad text, JetBrains Mono Bold
  for the referral code and the terminal lines. No make.fun logo was drawn
  by hand anywhere in the ad.

## Caption (for Kelvin to paste when posting)

```
Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03 makefun-cereal-lamb-elevator
```

followed by the referral link https://make.fun/r/jspwj26m (or in the bio).
Play code: `makefun-cereal-lamb-elevator`. Referral code (end card):
`jspwj26m`.

## How to re-render

```
node ad/render.mjs /tmp/bth03-frames 30   # 600 PNG frames, 1080x1920
sh ad/assemble.sh /tmp/bth03-frames <press-dir> <out.mp4>
```

`render.mjs` needs playwright-core (it falls back to the copy under
`~/workspace/grandtheftcrew/node_modules` on this machine) and a Playwright
Chromium binary (`PLAYWRIGHT_CHROMIUM`, default
`~/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome`). The press
directory must hold `makefun-badge-9x16.png` and
`makefun-card-9x16-transparent.webm`, fetched from the press pack. The final
mp4 is deliberately written outside this repo (it is not committed).

## Review notes (self-check, 22 Nov 2026)

- First frame: badge present, top left, as supplied. Last frame: end card
  with `jspwj26m` legible in the field, no badge.
- Two defects found on first render and fixed in-scene before the final
  render: the terminal lines double-escaped `>` / `&` (showed as `&gt;` /
  `&amp;`), and a floating USDC coin crossed the wallet balance figure
  (coins now rise beside the card, outside its x-span).
- Beat 1 revised 22 Nov 2026 (second opinion APInex: the first 2 s must lead
  with the money, not just "Zero code?"): "$500 bounty" now opens the ad at
  0–0.8 s with a "TOTAL PRIZE POOL" label so the $500 is never read as the
  winner's prize, then a fast 0.05 s cut to the unchanged hook from 0.85 s.
  Re-rendered + re-assembled and frame-checked (t = 0, 0.5, 1, 1.5, 2 plus
  spot-checks of beats 2–5 and the end card): money phase clean, no overlap
  or clipping, badge clear of all text, beats 2–5 and end card unchanged.
