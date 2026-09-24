import { Heart, MessageCircle, Play, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { INSTAGRAM_POSTS, CREATOR_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-14 md:py-20 relative bg-[#FAFAFA]">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="badge-editorial">
                <InstagramIcon className="w-3.5 h-3.5 text-black" />
                <span>@{CREATOR_INFO.instagramHandle}</span>
              </span>
              <h2 className="font-serif text-[1.7rem] sm:text-5xl leading-tight text-[#1A1A1A]">
                Більше живого контенту — <span className="hidden sm:inline"><br /></span>
                <span className="italic font-normal text-black relative inline-block">
                  в Instagram
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                </span>
              </h2>
            </div>

            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig self-start md:self-auto"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Перейти в @{CREATOR_INFO.instagramHandle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

        {/* Instagram Profile Card */}
        <ScrollReveal animation="scale-up" delay={150}>
          <div className="p-4 sm:p-5 mb-8 rounded-2xl bg-white border border-[#EBEBEB] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Story ring avatar */}
              <div className="ig-story-ring w-14 h-14 shrink-0">
                <div className="ig-story-ring-inner w-full h-full">
                  <img
                    src="/images/hero.png"
                    alt="Женя Чирва"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                  <span>chirva.cm</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs text-[#737373]">
                  Женя Чирва · Content Creator & Visual Strategist
                </div>
              </div>
            </div>

            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig py-2 px-5 text-sm hidden sm:inline-flex"
              style={{ fontSize: '0.75rem' }}
            >
              Підписатися
            </a>
          </div>
        </ScrollReveal>

        {/* Photo Grid — 6 posts like Instagram */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={200 + idx * 60}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#F5F5F5] block h-full"
              >
                <img
                  src={post.imageUrl}
                  alt="Instagram Post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-3"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                </div>

                {/* Reel badge */}
                {post.type === 'reel' && (
                  <div className="absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm"
                    style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <Play className="w-3 h-3 fill-white text-white" />
                  </div>
                )}
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
