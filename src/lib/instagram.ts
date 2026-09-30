// Live Instagram feed of @chirva.cm via Behold (https://behold.so) — JSON output.
// Behold hosts the images on its own CDN (stable URLs, unlike Instagram's expiring ones).
// The feed is baked into the page at build time (scripts/fetch-instagram.mjs →
// src/data/instagram.generated.json) and refreshed in the browser on each visit.

export const BEHOLD_FEED_URL = 'https://feeds.behold.so/wySMUqKWpC58hnDauH0Z';
export const INSTAGRAM_TILES = 6;

interface BeholdSize {
  width: number;
  height: number;
  mediaUrl: string;
}

interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  prunedCaption?: string;
  caption?: string;
  likeCount?: number;
  commentsCount?: number;
  sizes?: Partial<Record<'small' | 'medium' | 'large' | 'full', BeholdSize>>;
}

export interface BeholdFeed {
  username: string;
  profilePictureUrl?: string;
  followersCount?: number;
  posts: BeholdPost[];
}

export interface InstagramTile {
  id: string;
  url: string;
  type: 'reel' | 'carousel' | 'photo';
  caption: string;
  likes?: number;
  comments?: number;
  src: string;
  srcSet: string;
}

export interface InstagramProfile {
  username: string;
  avatar?: string;
  followers?: number;
  tiles: InstagramTile[];
}

const TYPE: Record<BeholdPost['mediaType'], InstagramTile['type']> = {
  VIDEO: 'reel',
  CAROUSEL_ALBUM: 'carousel',
  IMAGE: 'photo',
};

/** First line of the caption, trimmed — used as the tile's accessible label. */
const shortCaption = (post: BeholdPost) => {
  const text = (post.prunedCaption ?? post.caption ?? '').split('\n').find((l) => l.trim()) ?? '';
  return text.length > 90 ? `${text.slice(0, 87).trimEnd()}…` : text.trim();
};

export function toProfile(feed: BeholdFeed): InstagramProfile {
  const tiles = feed.posts
    .filter((p) => p.sizes?.medium)
    .slice(0, INSTAGRAM_TILES)
    .map((p): InstagramTile => {
      const s = p.sizes!;
      const set = (['small', 'medium', 'large'] as const)
        .map((k) => s[k] && `${s[k]!.mediaUrl} ${s[k]!.width}w`)
        .filter(Boolean)
        .join(', ');
      return {
        id: p.id,
        url: p.permalink,
        type: TYPE[p.mediaType] ?? 'photo',
        caption: shortCaption(p),
        likes: p.likeCount,
        comments: p.commentsCount,
        src: s.medium!.mediaUrl,
        srcSet: set,
      };
    });

  return {
    username: feed.username,
    avatar: feed.profilePictureUrl,
    followers: feed.followersCount,
    tiles,
  };
}

/** 1 підписник, 2 підписники, 5 підписників */
export function followersLabel(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  const word =
    mod10 === 1 && mod100 !== 11
      ? 'підписник'
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? 'підписники'
        : 'підписників';
  return `${n.toLocaleString('uk-UA')} ${word}`;
}
