import { COOPERATION_STEPS, CREATOR_INFO } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, Clapperboard, Smartphone, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { ScrollReveal } from './ScrollReveal';

interface CasesProps {
  onOpenContact: () => void;
}

export const Cases: React.FC<CasesProps> = ({ onOpenContact: _onOpenContact }) => {
  const formats = [
    {
      title: 'Brand Content Pack',
      subtitle: 'Місячний візуальний супровід',
      description: 'Повний цикл створення контенту на місяць: від мудборду до 15 роликів та 30 фотографій у єдиному стилі.',
      tag: 'Повний супровід',
      icon: Clapperboard
    },
    {
      title: 'UGC & Reels Bundle',
      subtitle: 'Серія вірусних роликів під ключ',
      description: 'Пакет з 5/10 роликів з розкадровками, дикторським озвучуванням та трендовим монтажем для охоплення.',
      tag: 'Конверсія & Охоплення',
      icon: Smartphone
    },
    {
      title: 'Content Production Day',
      subtitle: 'Інтенсивна зйомка на локації',
      description: 'Одноденний контент-день зі зйомкою декількох образів, продуктів або інтер\'єру для наповнення сітки.',
      tag: 'Локаційна зйомка',
      icon: Sparkles
    }
  ];

  return (
    <section id="cases" className="py-14 md:py-20 relative bg-[#FAFAFA]">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="space-y-3 max-w-2xl mb-14">
            <span className="badge-editorial">ФОРМАТИ СПІВПРАЦІ</span>
            <h2 className="font-serif text-[1.7rem] sm:text-5xl leading-tight text-[#1A1A1A]">
              Як будується <span className="hidden sm:inline"><br /></span>
              <span className="italic font-normal text-black relative inline-block">
                наша робота над проєктом
                <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {formats.map((fmt, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={150 + idx * 100}>
              <div
                className="group p-7 rounded-[20px] sm:rounded-[24px] bg-white border border-[#EBEBEB] hover:shadow-xl hover:border-black/30 transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden h-full"
              >
                {/* Black top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="space-y-3">
                  {/* Icon + tag */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0"
                    >
                      <fmt.icon className="w-5 h-5 text-black" />
                    </div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black text-white"
                    >
                      {fmt.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">{fmt.title}</h3>
                  <div className="text-xs font-semibold text-[#737373] uppercase tracking-wider">{fmt.subtitle}</div>
                  <p className="text-sm text-[#737373] leading-relaxed">{fmt.description}</p>
                </div>

                <a
                  href={CREATOR_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-3 text-sm justify-center"
                >
                  <span>Обрати у Direct</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 4-step workflow — Minimalist Black background banner */}
        <ScrollReveal animation="scale-up" delay={200}>
          <div
            className="p-6 sm:p-12 rounded-[24px] sm:rounded-[32px] text-white space-y-10 relative overflow-hidden shadow-2xl bg-[#0A0A0A] border border-neutral-800"
            style={{ background: 'linear-gradient(135deg, #18181B 0%, #000000 100%)' }}
          >
            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-[0.05] rounded-[32px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="space-y-2 max-w-xl relative z-10">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em]">Покроковий процес</p>
              <h3 className="font-serif text-3xl sm:text-4xl text-white">
                4 кроки від ідеї до готового контенту
              </h3>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
              {COOPERATION_STEPS.map((st) => (
                <div key={st.step} className="space-y-2.5">
                  <div
                    className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-serif text-lg font-medium text-white mb-3"
                  >
                    {st.step}
                  </div>
                  <h4 className="font-bold text-base text-white">{st.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{st.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-7 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Дотримання дедлайнів та захист права інтелектуальної власності</span>
              </div>

              <a
                href={CREATOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
              >
                <InstagramIcon className="w-4 h-4 text-black" />
                <span>Почати проєкт у Direct</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
