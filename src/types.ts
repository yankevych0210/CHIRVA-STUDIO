import type { PhotoName } from './lib/photos';

export type PortfolioCategory = 'fashion' | 'lifestyle' | 'studio' | 'events';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  /** Card thumbnail / video poster */
  image: PhotoName;
  /**
   * Base name of a video in public/videos/ (made by `npm run videos`):
   * plays <name>.hevc.mp4 with <name>.mp4 (H.264) as fallback in the lightbox.
   */
  video?: string;
  orientation?: 'vertical' | 'horizontal';
  /** ISO 8601 duration for search engines, e.g. 'PT31S' */
  duration?: string;
  metrics?: string; // e.g. "145K+ Переглядів" — only real, verifiable numbers
  brand?: string;
  description: string;
  deliverables?: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle?: string; // small uppercase line under the title; hidden when empty
  description: string;
  deliverables: string[];
  recommendedFor?: string;
  iconName: string;
  isHighlighted?: boolean;
}

export interface PricingPlan {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  priceNote: string;
  priceCaption?: string; // small line under the price; defaults to 'Персональне КП у Direct', '' hides it
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface CooperationStep {
  step: string;
  title: string;
  description: string;
}

export interface InstagramPost {
  id: string;
  image: PhotoName;
  caption: string; // used as the accessible label of the tile
  type: 'reel' | 'photo';
  url: string;
}
