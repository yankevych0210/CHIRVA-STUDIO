// Downloads the latest Instagram feed (Behold JSON) before the build, so the posts
// are part of the pre-rendered HTML. Never fails the build: if Behold is unreachable,
// the previously saved feed (committed to git) is used.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'src/data/instagram.generated.json');
const src = await fs.readFile(path.join(root, 'src/lib/instagram.ts'), 'utf8');
const url = src.match(/BEHOLD_FEED_URL = '([^']+)'/)?.[1];

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const feed = await res.json();
  if (!Array.isArray(feed.posts) || feed.posts.length === 0) throw new Error('empty feed');
  await fs.writeFile(out, JSON.stringify(feed, null, 2) + '\n');
  console.log(`✓ Instagram: ${feed.posts.length} posts from @${feed.username}`);
} catch (err) {
  console.warn(`⚠ Instagram feed not updated (${err.message}) — using the saved copy`);
}
