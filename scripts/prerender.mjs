// Static pre-rendering: bakes the React app into dist/index.html so crawlers,
// link previews and slow phones get full HTML immediately; the client then
// hydrates it. Also writes robots.txt and sitemap.xml.
//
// Runs after `vite build` and `vite build --ssr` (see "build" in package.json).
// Production domain: CREATOR_INFO.siteUrl in src/data/portfolioData.ts,
// or override with SITE_URL=https://example.com npm run build

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, buildHead, CREATOR_INFO } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const siteUrl = (process.env.SITE_URL ?? CREATOR_INFO.siteUrl ?? '').replace(/\/$/, '');

const templatePath = path.join(dist, 'index.html');
const template = await fs.readFile(templatePath, 'utf8');

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('index.html is missing <!--app-html--> / <!--app-head--> placeholders');
}

const html = template
  .replace('<!--app-head-->', buildHead(siteUrl))
  .replace('<!--app-html-->', render());

await fs.writeFile(templatePath, html);

// robots.txt + sitemap.xml
const robots = ['User-agent: *', 'Allow: /'];
if (siteUrl) {
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  const today = new Date().toISOString().slice(0, 10);
  await fs.writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
  );
}
await fs.writeFile(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');

await fs.rm(ssrDir, { recursive: true, force: true });

console.log(
  `✓ Pre-rendered dist/index.html (${(html.length / 1024).toFixed(1)} KB)` +
    (siteUrl ? ` for ${siteUrl}` : ' — siteUrl is empty: canonical, og:url and sitemap.xml skipped')
);
