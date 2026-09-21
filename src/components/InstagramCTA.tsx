import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';

export const InstagramCTA: React.FC = () => {
  return (
    <section id="contact" className="py-14 md:py-20 relative overflow-hidden bg-[#050505]">
      {/* Dark sleek gradient background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #18181B 0%, #050505 100%)' }} />
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Soft ambient light orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          {/* Instagram icon large */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-[28px] bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
              <InstagramIcon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-[0.2em]">
              Direct Collaboration
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight text-white">
              Готові створити <br />
              <span className="italic">щось виняткове?</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Усі обговорення проєктів, розрахунок кошторису та бронь дат проходять безпосередньо в Instagram Direct.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black font-semibold text-sm px-9 py-4 rounded-full transition-all duration-300 hover:bg-neutral-100 hover:scale-105 shadow-2xl"
            >
              <InstagramIcon className="w-5 h-5 text-black" />
              <span>Написати в Instagram Direct</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </a>
          </div>

          {/* Tagline */}
          <div className="pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60 font-medium">
            <span>@{CREATOR_INFO.instagramHandle}</span>
            <span>·</span>
            <span>Kremenchuk, Ukraine</span>
            <span>·</span>
            <span>Fast Reply in Direct ⚡</span>
          </div>

        </div>
      </div>
    </section>
  );
};
