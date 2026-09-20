import { COOPERATION_STEPS, CREATOR_INFO } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, Clapperboard, Smartphone, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface CasesProps {
  onOpenContact: () => void;
}

const igGradient = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

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
        <div className="space-y-3 max-w-2xl mb-14">
          <span className="badge-editorial">ФОРМАТИ СПІВПРАЦІ</span>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight text-[#1A1A1A]">
            Як будується <br />
            <span
              className="italic font-normal"
              style={{
                background: igGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              наша робота над проєктом
            </span>
          </h2>
        </div>

        {/* Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {formats.map((fmt, idx) => (
            <div
              key={idx}
              className="group p-7 rounded-[24px] bg-white border border-[#EBEBEB] hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              {/* Gradient top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: igGradient }} />

              <div className="space-y-3">
                {/* Icon + tag */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(240,148,51,0.18), rgba(188,24,136,0.18))', border: '1px solid rgba(220,39,67,0.12)' }}
                  >
                    <fmt.icon className="w-5 h-5 text-[#c41f3b]" />
                  </div>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(220,39,67,0.1)',
                      color: '#c41f3b',
                      border: '1px solid rgba(220,39,67,0.2)',
                    }}
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
          ))}
        </div>

        {/* 4-step workflow — IG gradient background */}
        <div
          className="p-8 sm:p-12 rounded-[32px] text-white space-y-10 relative overflow-hidden shadow-2xl"
          style={{ background: igGradient }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.05] rounded-[32px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="space-y-2 max-w-xl relative z-10">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">Покроковий процес</p>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              4 кроки від ідеї до готового контенту
            </h3>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
            {COOPERATION_STEPS.map((st) => (
              <div key={st.step} className="space-y-2.5">
                <div
                  className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-serif text-lg font-medium text-white mb-3"
                >
                  {st.step}
                </div>
                <h4 className="font-bold text-base text-white">{st.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-7 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>Дотримання дедлайнів та захист права інтелектуальної власності</span>
            </div>

            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-[#1A1A1A] font-semibold text-sm px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
            >
              <InstagramIcon className="w-4 h-4" style={{ color: '#dc2743' }} />
              <span>Почати проєкт у Direct</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
