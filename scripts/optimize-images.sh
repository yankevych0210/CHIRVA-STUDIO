#!/usr/bin/env bash
# Generates responsive WebP versions of every image in assets/originals/
# into public/images/<name>-480.webp and <name>-960.webp.
# Requires cwebp (brew install webp). Usage: npm run images
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images
for src in assets/originals/*.{png,jpg,jpeg}; do
  [ -e "$src" ] || continue
  name="$(basename "${src%.*}")"
  [ "$name" = "logo-mark" ] && continue
  for w in 480 960; do
    cwebp -quiet -q 74 -m 6 -sharp_yuv -resize "$w" 0 "$src" -o "public/images/${name}-${w}.webp"
  done
  echo "✓ $name"
done
