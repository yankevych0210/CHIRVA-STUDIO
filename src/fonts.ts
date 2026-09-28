// Self-hosted fonts (no Google Fonts request, works offline, GDPR-friendly).
// Each CSS file declares per-subset @font-face rules with unicode-range,
// so the browser downloads only the Latin / Cyrillic files a page actually uses.
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/alex-brush/400.css';
// Logo subtitle only (Latin) — keeps the wordmark identical to the brand logo
import '@fontsource/dm-sans/latin-600.css';
