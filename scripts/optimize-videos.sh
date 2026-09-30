#!/usr/bin/env bash
# Web-optimized versions of every video in assets/originals/video/ (not in git):
#   public/videos/<name>.hevc.mp4  — H.265 1080p: Safari/iOS, Chrome, Edge (smaller at equal quality)
#   public/videos/<name>.mp4       — H.264 1080p: universal fallback (Firefox, older devices)
#   assets/originals/<name>.jpg    — poster frame → `npm run images` turns it into WebP
# Both: AAC 128k stereo, +faststart (playback starts before the file is fully loaded).
# 50/60 fps sources are halved exactly (59.94 → 29.97), so motion stays even.
# Quality: capped CRF — constant visual quality, with a bitrate ceiling so very detailed
# scenes (foliage, water) can't balloon the file. Tuned with VMAF against the originals:
# HEVC CRF 25 / ≤6 Mbps ≈ VMAF 95+ on typical footage (visually indistinguishable).
#
# Requires ffmpeg + ffprobe with libx264/libx265 (brew install ffmpeg),
# or set FFMPEG=/path/to/ffmpeg FFPROBE=/path/to/ffprobe.
# Usage: npm run videos            — all videos
#        npm run videos work-trench — only one (file name without extension)
# Poster frame time per video: see poster_at() below (default 0.5s).
set -euo pipefail
cd "$(dirname "$0")/.."
FFMPEG="${FFMPEG:-ffmpeg}"
FFPROBE="${FFPROBE:-ffprobe}"
mkdir -p public/videos

# Seconds into the video to take the poster frame from (skip fades / black frames)
poster_at() {
  case "$1" in
    work-enduro) echo 14 ;;
    work-studio) echo 16 ;;
    work-christening) echo 30 ;;
    *) echo 0.5 ;;
  esac
}

for src in assets/originals/video/*.{mov,MOV,mp4,MP4}; do
  [ -e "$src" ] || continue
  name="$(basename "${src%.*}")"
  [ $# -gt 0 ] && [ "$name" != "$1" ] && continue

  # Long side ≤1920, never upscale; works for portrait and landscape
  fit() { echo "scale='if(gt(iw,ih),min($1,iw),-2)':'if(gt(iw,ih),-2,min($1,ih))':flags=lanczos,format=yuv420p"; }
  # Halve high frame rates exactly: 60000/1001 → 30000/1001, 60/1 → 30/1
  rate="$("$FFPROBE" -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$src")"
  num="${rate%/*}"; den="${rate#*/}"
  if [ $((num / den)) -gt 31 ]; then fps=",fps=$num/$((den * 2))"; else fps=""; fi
  vf="$(fit 1920)$fps"
  common=(-map 0:v:0 -map 0:a:0? -c:a aac -b:a 128k -ac 2
          -colorspace bt709 -color_primaries bt709 -color_trc bt709
          -movflags +faststart -map_metadata -1)

  echo "▶ $name ($rate fps) — HEVC 1080p"
  "$FFMPEG" -hide_banner -loglevel error -stats -y -i "$src" -vf "$vf" \
    -c:v libx265 -preset slow -crf 25 -tag:v hvc1 \
    -x265-params log-level=error:vbv-maxrate=6000:vbv-bufsize=12000 \
    "${common[@]}" "public/videos/$name.hevc.mp4"

  echo "▶ $name — H.264 1080p"
  "$FFMPEG" -hide_banner -loglevel error -stats -y -i "$src" -vf "$vf" \
    -c:v libx264 -preset slow -crf 23 -maxrate 7500k -bufsize 15000k -profile:v high -level 4.2 \
    "${common[@]}" "public/videos/$name.mp4"

  "$FFMPEG" -hide_banner -loglevel error -y -ss "$(poster_at "$name")" -i "$src" \
    -frames:v 1 -vf "$(fit 1920)" -q:v 2 "assets/originals/$name.jpg"

  echo "✓ $name  $(du -h "public/videos/$name.hevc.mp4" | cut -f1) (hevc)  $(du -h "public/videos/$name.mp4" | cut -f1) (h264)"
done
