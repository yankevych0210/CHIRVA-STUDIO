import type { PhotoName } from './lib/photos';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'reels' | 'ugc' | 'photo' | 'lifestyle';
  categoryLabel: string;
  image: PhotoName;
  videoUrl?: string; // Optional self-hosted MP4 (e.g. /videos/work.mp4) played in the lightbox
  ratio: 'portrait' | 'square' | 'tall';
  metrics?: string; // e.g. "145K+ Переглядів"
  brand?: string;
  description: string;
  deliverables?: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  recommendedFor: string;
  iconName: string;
  isHighlighted?: boolean;
}

export interface PricingPlan {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  priceNote: string;
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
  likes: string;
  comments: string;
  caption: string;
  type: 'reel' | 'photo';
  url: string;
}
