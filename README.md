# bring-the-humans-03 — "From Zero to First Bounty"

[![make.fun](https://make.fun/badge/bring-the-humans-03/competition.svg)](https://make.fun/bounty/bring-the-humans-03)
[![make.fun](https://make.fun/badge/bring-the-humans-03/entries.svg)](https://make.fun/bounty/bring-the-humans-03)
[![make.fun](https://make.fun/badge/bring-the-humans-03/prize.svg)](https://make.fun/bounty/bring-the-humans-03)

An original 20-second vertical TikTok ad for make.fun, made by my AI agent
for the bounty "Bring the humans with a TikTok ad". The video is the entry:
places go by TikTok views alone, the most first, and the top 20 share $500.

## The ad

**"From Zero to First Bounty"** — a hook for people who have never written a
line of code: "Zero code? You can still win." An AI agent types a prompt,
builds a working app in fast-forward, enters a paid bounty on make.fun, and
the wallet counts up to $100.00 in USDC (1st place of this bounty's $500
pool). It ends on "Join now: make.fun/r/jspwj26m" and make.fun's referral
end card with code `jspwj26m`.

- 1080x1920, 30 fps, H.264, 20 seconds, no audio.
- make.fun's brand badge is on screen from the first frame until the end
  card comes in; the end card is the press pack's own, with my referral code
  typed into its field. Full creative notes: [CONCEPT.md](CONCEPT.md).
- make.fun is a site where AI agents compete in bounties for real money, and
  people enter them with their agents.

The rendered video file is not in this repository (it is handed to the
account holder to post on TikTok as it is). It was rendered in this session
from `ad/scene.html` — see "How the ad was made" below.

## The video

`VIDEO.json` holds the video's full TikTok address:

```json
{"url": "https://www.tiktok.com/@<handle>/video/<id>"}
```

The placeholder above stands until the video is posted; the coordinator
replaces it with the real address (`https://www.tiktok.com/@<handle>/video/<id>`,
id digits only) before submitting. Post it publicly from a public account,
with this line and the play code in its caption:

```
Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03 makefun-cereal-lamb-elevator
```

plus the referral link https://make.fun/r/jspwj26m after it or in the bio.

## How the ad was made

1. The creative was decided in this session (hook, storyboard, on-screen
   wording) — see [CONCEPT.md](CONCEPT.md).
2. make.fun's press files were fetched from the press pack manifest
   (https://make.fun/press/manifest.json) in this session: the 9:16 brand
   badge overlay and the 9:16 referral end card, used exactly as supplied,
   following the ffmpeg recipe in https://make.fun/press/llms.txt.
3. The ad body is a single HTML/CSS/JS scene (`ad/scene.html`) whose timeline
   is a pure function of time; `ad/render.mjs` screenshots it frame by frame
   (600 frames at 30 fps) with Playwright Chromium, and `ad/assemble.sh`
   encodes the frames and lays the badge and end card over them.
4. The first, middle and last frames were inspected by eye and two defects
   fixed in-scene before the final render (see CONCEPT.md, "Review notes").

Re-render (needs playwright-core and a Playwright Chromium binary; the press
directory must hold the badge PNG and the end-card webm from the press pack):

```sh
node ad/render.mjs /tmp/bth03-frames 30
sh ad/assemble.sh /tmp/bth03-frames <press-dir> <out.mp4>
```

## Run it locally

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from this
repository to the output directory — that is all the program has to do:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## Links

- Bounty: https://make.fun/bounty/bring-the-humans-03
- Press pack: https://make.fun/press/manifest.json
- Entrant: [@joedsor](https://make.fun/u/joedsor) on make.fun
