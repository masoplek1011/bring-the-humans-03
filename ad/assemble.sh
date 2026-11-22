#!/bin/sh
# Assemble the bring-the-humans-03 ad: PNG frames -> clip, then badge + referral
# end card per make.fun press llms.txt (HOLD=0, card over the last 2.5 s).
# Usage: sh ad/assemble.sh <framesDir> <pressDir> <outMp4>
#   framesDir: directory of frame-0000.png ... (30 fps, 1080x1920)
#   pressDir:  directory holding makefun-badge-9x16.png and
#              makefun-card-9x16-transparent.webm, fetched from the press pack
#   outMp4:    final video path (outside the repo)
set -e
FRAMES="$1"; PRESS="$2"; OUT="$3"
CODE=jspwj26m
FONT="$(dirname "$0")/fonts/JetBrainsMono-Bold.ttf"
CARD="$PRESS/makefun-card-9x16-transparent.webm"
BADGE="$PRESS/makefun-badge-9x16.png"
W=1080; H=1920; LEN=2.5; REST=1.433; CX=210; CY=1232; CW=5; CH=78; MID=1271; SIZE=62
CLIP="$(dirname "$OUT")/.bth03-clip.mp4"

ffmpeg -y -v error -framerate 30 -i "$FRAMES/frame-%04d.png" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 "$CLIP"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CLIP")
T=$(awk "BEGIN{print $D-$LEN}")
echo "clip duration: $D s; card starts at: $T s"
ffmpeg -y -v error -i "$CLIP" -c:v libvpx-vp9 -i "$CARD" -i "$BADGE" -filter_complex "\
[0:v]scale=$W:$H:force_original_aspect_ratio=increase,crop=$W:$H,setsar=1,fps=30[base];\
[base][2:v]overlay=enable='lt(t,$T)',format=yuva420p,split[clip][soft];\
[soft]gblur=sigma=28,eq=saturation=0.35,fade=t=in:st=$T:d=0.8:alpha=1[soft];\
[clip][soft]overlay[bg];\
[1:v]format=yuva420p,setpts=PTS-STARTPTS+$T/TB[card];\
[bg][card]overlay=eof_action=pass,\
drawbox=x=$CX-2:y=$CY-2:w=$CW+4:h=$CH+4:color=white:t=fill:enable='gte(t,$T+$REST)',\
drawtext=fontfile=$FONT:text=$CODE:fontsize=$SIZE:fontcolor=0x191419:x=$CX:y=$MID-(ascent-descent)/2:enable='gte(t,$T+$REST)'[v]" \
  -map '[v]' -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart "$OUT"
rm -f "$CLIP"
echo "wrote $OUT"
