import { useEffect, useRef, useState } from 'react';
import { Play, ArrowUpRight, Copy, Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import savedFeed from '../data/instagram.generated.json';
import {
  BEHOLD_FEED_URL,
  toProfile,
  followersLabel,
  type BeholdFeed,
  type InstagramProfile,
} from '../lib/instagram';

// Feed saved at build time — rendered into the static HTML and used if Behold is unreachable
const INITIAL_PROFILE = toProfile(savedFeed as BeholdFeed);

const CACHE_KEY = 'chirva:instagram';
const CACHE_TTL = 30 * 60 * 1000;

function readCache(): InstagramProfile | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, profile } = JSON.parse(raw) as { at: number; profile: InstagramProfile };
    return Date.now() - at < CACHE_TTL && profile.tiles?.length ? profile : null;
  } catch {
    return null; // private mode / storage blocked
  }
}

function writeCache(profile: InstagramProfile) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), profile }));
  } catch {
    // storage unavailable — just refetch next time
  }
}

export const InstagramFeed: React.FC = () => {
  const [profile, setProfile] = useState<InstagramProfile>(INITIAL_PROFILE);

  const sectionRef = useRef<HTMLElement>(null);

  // Pick up posts published after the last deploy. Behold's free plan counts every
  // feed request (1.2k/month), so: fetch only when the visitor gets close to this
  // section, and at most once per 30 minutes per browser session.
  useEffect(() => {
    // sessionStorage can't be read during render: the server-rendered HTML must match
    // the first client render (hydration), so the cached feed is applied right after it.
    const cached = readCache();
    if (cached) {
      queueMicrotask(() => setProfile(cached));
      return;
    }
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;

    const controller = new AbortController();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        fetch(BEHOLD_FEED_URL, { signal: controller.signal })
          .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
          .then((feed: BeholdFeed) => {
            const fresh = toProfile(feed);
            if (fresh.tiles.length === 0) return;
            setProfile(fresh);
            writeCache(fresh);
          })
          .catch(() => {
            // Offline / Behold down / limit reached — keep the saved feed
          });
      },
      { rootMargin: '100% 0px' } // one screen ahead, so the fresh feed is ready on arrival
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);

  return (
    <section ref={sectionRef} id="instagram" aria-labelledby="instagram-title" className="py-14 md:py-24 relative bg-[#FAFAFA]">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="section-eyebrow">
                <span className="section-eyebrow-line" />
                <span className="section-eyebrow-num">06</span>
                <span className="section-eyebrow-sep">/</span>
                <span className="section-eyebrow-text">Instagram</span>
              </div>
              <h2 id="instagram-title" className="font-serif text-[2rem] sm:text-5xl leading-tight text-[#1A1A1A]">
                Більше живого контенту — <span className="hidden sm:inline"><br /></span>
                <span className="italic font-normal text-black relative inline-block">
                  в Instagram
                  <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                </span>
              </h2>
            </div>

            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig self-start md:self-auto"
            >
              <InstagramIcon className="w-4 h-4" aria-hidden="true" />
              <span>Перейти в @{CREATOR_INFO.instagramHandle}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

        {/* Instagram Profile Card */}
        <ScrollReveal animation="scale-up" delay={80}>
          <div className="p-4 sm:p-5 mb-5 sm:mb-8 rounded-2xl bg-white border border-[#EBEBEB] shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {/* Story ring avatar */}
              <div className="ig-story-ring w-14 h-14 shrink-0">
                <div className="ig-story-ring-inner w-full h-full bg-[#F0F0F0]">
                  {profile.avatar && (
                    <img
                      src={profile.avatar}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                  <span>{profile.username}</span>
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs text-[#6B6B6B] truncate">
                  {CREATOR_INFO.name}
                  {profile.followers ? ` · ${followersLabel(profile.followers)}` : ' · Content Creator'}
                </div>
              </div>
            </div>

            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig min-h-[38px] py-2 px-5 text-xs hidden sm:inline-flex shrink-0"
            >
              Підписатися
            </a>
          </div>
        </ScrollReveal>

        {/* Latest 6 posts, live from Instagram */}
        <ul className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2.5">
          {profile.tiles.map((post, idx) => (
            <li key={post.id}>
            <ScrollReveal animation="fade-up" delay={(idx % 3) * 70} delayLg={idx * 40} className="h-full">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Пост в Instagram${post.caption ? `: ${post.caption}` : ''}`}
                className="group relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#F0F0F0] block h-full"
              >
                <img
                  src={post.src}
                  srcSet={post.srcSet}
                  sizes="(min-width: 1024px) 190px, 33vw"
                  alt=""
                  width={525}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay — real likes / comments */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-sm font-semibold"
                >
                  {post.likes !== undefined ? (
                    <>
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 fill-white" />
                        {post.likes}
                      </span>
                      {post.comments !== undefined && (
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4 fill-white" />
                          {post.comments}
                        </span>
                      )}
                    </>
                  ) : (
                    <InstagramIcon className="w-7 h-7 text-white" />
                  )}
                </div>

                {/* Post type badge, like in the Instagram grid */}
                {post.type !== 'photo' && (
                  <div aria-hidden="true" className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                    {post.type === 'reel' ? (
                      <Play className="w-3 h-3 fill-white text-white" />
                    ) : (
                      <Copy className="w-3 h-3 text-white" />
                    )}
                  </div>
                )}
              </a>
            </ScrollReveal>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};
