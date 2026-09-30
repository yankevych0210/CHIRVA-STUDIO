import { Play, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { INSTAGRAM_POSTS, CREATOR_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { Photo } from './Photo';
import { photoUrl } from '../lib/photos';

export const InstagramFeed: React.FC = () => {
  return (
    <section id="instagram" aria-labelledby="instagram-title" className="py-14 md:py-24 relative bg-[#FAFAFA]">
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
                <div className="ig-story-ring-inner w-full h-full">
                  <img
                    src={photoUrl('hero', 480)}
                    alt=""
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                  <span>chirva.cm</span>
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs text-[#6B6B6B] truncate">
                  Женя Чирва · Content Creator & Visual Strategist
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

        {/* Photo Grid — 6 posts like Instagram */}
        <ul className="grid grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2.5">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <li key={post.id}>
            <ScrollReveal animation="fade-up" delay={(idx % 3) * 70} delayLg={idx * 40} className="h-full">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Пост в Instagram: ${post.caption}`}
                className="group relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-[#F0F0F0] block h-full"
              >
                <Photo
                  name={post.image}
                  sizes="(min-width: 1024px) 190px, 33vw"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-3"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <InstagramIcon className="w-7 h-7 text-white" />
                </div>

                {/* Reel badge */}
                {post.type === 'reel' && (
                  <div aria-hidden="true" className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 rounded-full backdrop-blur-sm"
                    style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <Play className="w-3 h-3 fill-white text-white" />
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
