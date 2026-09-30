import { CREATOR_INFO, SERVICES, PORTFOLIO_ITEMS } from './data/portfolioData';

// Everything search engines and social previews see, generated from site data.
// Injected into <head> at build time by scripts/prerender.mjs.

export const SEO = {
  title: 'Женя Чирва — контент-мейкерка: Reels, fashion та lifestyle зйомки',
  description:
    'Естетичні Reels, fashion та lifestyle зйомки, відео з весіль і подій. Контент-мейкерка Женя Чирва, Кременчук.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'The Video by Evhenia Chirva — Reels, UGC та фото, які закохують у бренд',
  locale: 'uk_UA',
};

/** Date the portfolio videos were published on the site (schema.org uploadDate) */
const VIDEOS_PUBLISHED = '2026-09-30';

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function structuredData(siteUrl: string) {
  const url = siteUrl ? `${siteUrl}/` : undefined;
  const id = (fragment: string) => (url ? `${url}#${fragment}` : `#${fragment}`);

  const person = {
    '@type': 'Person',
    '@id': id('person'),
    name: CREATOR_INFO.name,
    alternateName: [CREATOR_INFO.nameLatin, 'Zhenya Chirva', `@${CREATOR_INFO.instagramHandle}`],
    jobTitle: 'Content Creator',
    knowsAbout: ['Reels', 'UGC', 'Content creation', 'Fashion video', 'Lifestyle video', 'Event video'],
    sameAs: [CREATOR_INFO.instagramUrl],
    ...(siteUrl && { image: `${siteUrl}/images/hero-960.webp`, url }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Кременчук',
      addressCountry: 'UA',
    },
  };

  const business = {
    '@type': 'ProfessionalService',
    '@id': id('service'),
    name: CREATOR_INFO.brandName,
    description: SEO.description,
    founder: { '@id': id('person') },
    sameAs: [CREATOR_INFO.instagramUrl],
    areaServed: ['UA', 'Worldwide'],
    priceRange: '$$',
    address: person.address,
    ...(siteUrl && { url, image: `${siteUrl}${SEO.ogImage}`, logo: `${siteUrl}/icon-512.png` }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Послуги',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': id('website'),
    name: CREATOR_INFO.brandName,
    inLanguage: 'uk',
    publisher: { '@id': id('person') },
    ...(url && { url }),
  };

  // Portfolio videos — eligible for Google video results (needs absolute URLs)
  const videos = siteUrl
    ? PORTFOLIO_ITEMS.filter((item) => item.video).map((item) => ({
        '@type': 'VideoObject',
        name: item.title,
        description: item.description,
        thumbnailUrl: `${siteUrl}/images/${item.image}-960.webp`,
        contentUrl: `${siteUrl}/videos/${item.video}.mp4`,
        uploadDate: VIDEOS_PUBLISHED,
        ...(item.duration && { duration: item.duration }),
        inLanguage: 'uk',
        creator: { '@id': id('person') },
      }))
    : [];

  return { '@context': 'https://schema.org', '@graph': [website, person, business, ...videos] };
}

/** Head tags that depend on the production domain (canonical, absolute OG urls, JSON-LD). */
export function buildHead(siteUrl = CREATOR_INFO.siteUrl): string {
  const base = siteUrl.replace(/\/$/, '');
  const abs = (path: string) => (base ? `${base}${path}` : path);

  const tags = [
    base && `<link rel="canonical" href="${base}/" />`,
    base && `<meta property="og:url" content="${base}/" />`,
    `<meta property="og:image" content="${abs(SEO.ogImage)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(SEO.ogImageAlt)}" />`,
    `<meta name="twitter:image" content="${abs(SEO.ogImage)}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(base)).replace(/</g, '\\u003c')}</script>`,
  ];

  return tags.filter(Boolean).join('\n    ');
}
