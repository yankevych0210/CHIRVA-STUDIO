import { COOPERATION_STEPS, CREATOR_INFO } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { ScrollReveal } from './ScrollReveal';

export const Cases: React.FC = () => {
  return (
    <section id="cases" aria-labelledby="cases-title" className="py-14 md:py-24 relative bg-[#FAFAFA]">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="space-y-3 max-w-2xl mb-10 md:mb-14">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span className="section-eyebrow-num">04</span>
              <span className="section-eyebrow-sep">/</span>
              <span className="section-eyebrow-text">Процес роботи</span>
            </div>
            <h2 id="cases-title" className="font-serif text-[2rem] sm:text-5xl leading-tight text-[#1A1A1A]">
              Як будується <span className="hidden sm:inline"><br /></span>
              <span className="italic font-normal text-black relative inline-block">
                наша робота над проєктом
                <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* 4-step workflow — Minimalist Black background banner */}
        <ScrollReveal animation="scale-up">
          <div
            className="p-6 sm:p-12 rounded-[24px] sm:rounded-[32px] text-white space-y-10 relative overflow-hidden shadow-2xl bg-[#0A0A0A] border border-neutral-800"
            style={{ background: 'linear-gradient(135deg, #18181B 0%, #000000 100%)' }}
          >
            {/* Noise overlay */}
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="space-y-2 max-w-xl relative z-10">
              <p className="font-mono text-white/60 text-[11px] font-medium uppercase tracking-[0.22em]">Покроковий процес</p>
              <h3 className="font-serif text-[1.75rem] sm:text-4xl leading-tight text-white">
                4 кроки від ідеї до готового контенту
              </h3>
            </div>

            {/* Steps */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
              {COOPERATION_STEPS.map((st) => (
                <li key={st.step} className="space-y-2.5">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-serif text-lg font-medium text-white mb-3"
                  >
                    {st.step}
                  </div>
                  <h4 className="font-bold text-base text-white">{st.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{st.description}</p>
                </li>
              ))}
            </ol>

            <div className="pt-7 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start sm:items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                <span>Дотримання дедлайнів та захист права інтелектуальної власності</span>
              </div>

              <a
                href={CREATOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-sm px-7 py-3.5 min-h-[48px] rounded-full hover:bg-neutral-100 hover:scale-[1.03] active:scale-[0.97] transition-[background-color,transform] duration-300 shadow-lg whitespace-nowrap w-full sm:w-auto"
              >
                <InstagramIcon className="w-4 h-4 text-black" aria-hidden="true" />
                <span>Почати проєкт у Direct</span>
                <ArrowUpRight className="w-4 h-4 text-black" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
