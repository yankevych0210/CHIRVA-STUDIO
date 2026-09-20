export interface PortfolioItem {
  id: string;
  title: string;
  category: 'reels' | 'ugc' | 'photo' | 'lifestyle';
  categoryLabel: string;
  imageUrl: string;
  videoUrl?: string; // Optional HTML5 video fallback / ambient loop preview
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
  imageUrl: string;
  likes: string;
  comments: string;
  caption: string;
  type: 'reel' | 'photo';
  url: string;
}
