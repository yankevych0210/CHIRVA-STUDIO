import { ArrowUpRight, Play, Heart, Bookmark } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact: _onOpenContact }) => {
  return (
    <section id="hero" className="relative pt-28 pb-14 md:pt-32 md:pb-20 bg-white overflow-hidden">

      {/* Subtle background ambient glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] opacity-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] opacity-30 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)' }} />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-8">

            {/* Headline */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-black/30" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#737373]">
                    Content Creator · Visual Strategist
                  </p>
                </div>
                <h1 className="font-serif text-[2rem] sm:text-5xl lg:text-6xl font-normal leading-[1.12] sm:leading-[1.08] tracking-tight text-[#1A1A1A]">
                  Візуальна естетика,{' '}
                  <span className="italic font-normal text-black relative inline-block">
                    яка закохує
                    <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                  </span>{' '}
                  <span className="hidden sm:inline"><br /></span>в бренд та будує довіру
                </h1>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal animation="fade-up" delay={250}>
              <p className="text-base sm:text-lg text-[#52525B] max-w-lg leading-relaxed font-normal">
                {CREATOR_INFO.heroDescription}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal animation="fade-up" delay={350} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={CREATOR_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ig w-full sm:w-auto justify-center py-3.5 px-7"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Написати в Direct</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={CREATOR_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto justify-center py-3.5 px-7"
                >
                  <span>@{CREATOR_INFO.instagramHandle}</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal animation="fade-up" delay={450} className="w-full">
              <div className="w-full pt-6 border-t border-[#F0F0F0] grid grid-cols-3 gap-3 sm:gap-6">
                {CREATOR_INFO.heroBadges.map((badge, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-serif text-xl sm:text-3xl font-semibold text-black">
                      {badge.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#737373] font-medium uppercase tracking-wider leading-tight">
                      {badge.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Instagram Profile Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal animation="scale-up" delay={200} className="w-full max-w-[360px] sm:max-w-[420px]">
              <div className="relative w-full">

                {/* Main photo card */}
                <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#FAFAFA] border border-black/10 shadow-2xl group"
                  style={{ aspectRatio: '4/5' }}>

                  <img
                    src="/images/hero.png"
                    alt="Женя Чирва"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="eager"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* IG-style interactive action buttons */}
                  <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 sm:gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 text-[#1A1A1A] fill-[#1A1A1A]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Bookmark className="w-5 h-5 text-[#1A1A1A]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-[#1A1A1A] fill-[#1A1A1A] ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom caption card */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-xl">
                      <div className="flex items-center gap-3">
                        {/* Story ring avatar */}
                        <div className="ig-story-ring w-10 h-10 shrink-0">
                          <div className="ig-story-ring-inner w-full h-full">
                            <img src="/images/hero.png" alt="avatar"
                              className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#1A1A1A] flex items-center gap-1.5">
                            <span>chirva.cm</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                          </div>
                          <div className="text-xs text-[#737373]">Кременчук · Content Creator</div>
                        </div>
                        <a
                          href={CREATOR_INFO.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto btn-ig py-1.5 px-4 text-xs"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Слідкувати
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge — Reels REC Viewfinder */}
                <div className="absolute -top-2.5 left-2 sm:-top-3 sm:-left-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-white/15 text-white shadow-xl flex items-center gap-2 text-[11px] font-mono tracking-wider z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-semibold text-white/95">REC</span>
                  <span className="text-white/20 font-light">|</span>
                  <span className="text-[10.5px] uppercase tracking-widest text-neutral-300">Reels & UGC</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

