import { ArrowUpRight, MapPin, Play, Heart, Bookmark } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact: _onOpenContact }) => {
  return (
    <section id="hero" className="relative pt-20 pb-12 md:pt-28 md:pb-16 bg-white overflow-hidden">

      {/* Subtle background gradient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.07] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.05] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'linear-gradient(45deg, #bc1888, #dc2743)' }} />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Text */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-7">

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] text-xs font-semibold text-[#737373]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MapPin className="w-3.5 h-3.5" style={{ color: '#dc2743' }} />
              <span>{CREATOR_INFO.location}</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#737373]">
                Content Creator · Visual Strategist
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#1A1A1A]">
                Візуальна естетика,{' '}
                <span
                  className="italic font-normal"
                  style={{
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  яка закохує
                </span>{' '}
                <br />в бренд та будує довіру
              </h1>
            </div>

            {/* Bio */}
            <p className="text-base text-[#737373] max-w-lg leading-relaxed font-normal">
              {CREATOR_INFO.heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={CREATOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ig py-3.5 px-7"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Написати в Direct</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-3.5 px-7"
              >
                <span>@{CREATOR_INFO.instagramHandle}</span>
              </a>
            </div>

            {/* Stats */}
            <div className="w-full pt-6 border-t border-[#F0F0F0] grid grid-cols-3 gap-6">
              {CREATOR_INFO.heroBadges.map((badge, idx) => (
                <div key={idx} className="space-y-1">
                  <div
                    className="font-serif text-2xl sm:text-3xl font-normal"
                    style={{
                      background: 'linear-gradient(45deg, #f09433, #dc2743)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {badge.value}
                  </div>
                  <div className="text-[11px] text-[#737373] font-semibold uppercase tracking-wider leading-tight">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Instagram Profile Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">

              {/* Main photo — Instagram post style */}
              <div className="relative rounded-[32px] overflow-hidden bg-[#FAFAFA] border border-[#EBEBEB] shadow-xl"
                style={{ aspectRatio: '4/5' }}>

                <img
                  src="/images/hero.png"
                  alt="Женя Чирва"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* IG-style like & save buttons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                    <Bookmark className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-[#1A1A1A] fill-[#1A1A1A] ml-0.5" />
                  </div>
                </div>

                {/* Bottom caption card */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg">
                    <div className="flex items-center gap-3">
                      {/* Story ring avatar */}
                      <div className="ig-story-ring w-10 h-10 shrink-0">
                        <div className="ig-story-ring-inner w-full h-full">
                          <img src="/images/hero.png" alt="avatar"
                            className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#1A1A1A]">chirva.cm</div>
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

              {/* Floating badge — Reels */}
              <div className="absolute -top-3 -left-3 px-4 py-2 rounded-full bg-white border border-[#EBEBEB] shadow-lg flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
                <Play className="w-3 h-3 fill-[#dc2743] text-[#dc2743]" />
                Reels & UGC
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
