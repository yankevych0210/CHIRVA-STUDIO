import { Check, ArrowUpRight } from 'lucide-react';
import { PRICING_PLANS, CREATOR_INFO } from '../data/portfolioData';
import { InstagramIcon } from './Icons';
import { ScrollReveal } from './ScrollReveal';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-14 md:py-24 bg-white relative">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4">
            <div className="section-eyebrow justify-center">
              <span className="section-eyebrow-line" />
              <span className="section-eyebrow-num">05</span>
              <span className="section-eyebrow-sep">/</span>
              <span className="section-eyebrow-text">Вартість</span>
              <span className="section-eyebrow-line" />
            </div>
            <h2 id="pricing-title" className="font-serif text-[2rem] sm:text-5xl leading-tight text-[#1A1A1A]">
              Прозора вартість <span className="hidden sm:inline"><br /></span>
              <span className="italic font-normal text-black relative inline-block">
                під ваші задачі
                <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
              </span>
            </h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Точний розрахунок залежить від обсягу робіт, складності сценаріїв та кількості локацій. Напишіть мені в Direct для КП.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <ScrollReveal key={plan.id} animation="fade-up" delay={0} delayLg={idx * 90} className="h-full">
              <div
                className={`relative border transition-[box-shadow,border-color,transform] duration-300 flex flex-col justify-between h-full ${
                  plan.isPopular
                    ? 'text-white shadow-2xl pt-10 pb-7 px-6 sm:pb-8 sm:px-8 rounded-[20px] sm:rounded-[28px] border-neutral-800'
                    : 'p-6 sm:p-8 rounded-[20px] sm:rounded-[28px] bg-white border-[#EBEBEB] hover:shadow-xl hover:border-black/30 hover:-translate-y-0.5'
                }`}
                style={plan.isPopular ? { background: 'linear-gradient(135deg, #18181B 0%, #000000 100%)' } : {}}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full whitespace-nowrap z-10 bg-white text-[#18181B] text-[10px] font-mono font-semibold uppercase tracking-[0.2em] shadow-md border border-black/10 flex items-center gap-1.5"
                  >
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-black" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <h3 className={`font-serif text-2xl font-medium ${plan.isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {plan.title}
                    </h3>
                    <p className={`text-[13px] leading-snug ${plan.isPopular ? 'text-white/70' : 'text-[#6B6B6B]'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className={`py-4 border-y space-y-1 ${plan.isPopular ? 'border-white/20' : 'border-[#F0F0F0]'}`}>
                    <div className={`font-serif text-2xl font-normal lining-nums ${plan.isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {plan.priceNote}
                    </div>
                    {plan.priceCaption !== '' && (
                      <div className={`text-[11px] font-medium uppercase tracking-wider ${plan.isPopular ? 'text-white/60' : 'text-[#737373]'}`}>
                        {plan.priceCaption ?? 'Персональне КП у Direct'}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm">
                        <div
                          aria-hidden="true"
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.isPopular ? 'bg-white/20 text-white' : 'bg-black text-white'
                          }`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className={plan.isPopular ? 'text-white/85' : 'text-[#52525B]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className={`pt-7 mt-7 border-t ${plan.isPopular ? 'border-white/20' : 'border-[#F0F0F0]'}`}>
                  <a
                    href={CREATOR_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full min-h-[48px] py-3.5 px-6 text-sm font-semibold rounded-full flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all active:scale-[0.97] ${
                      plan.isPopular
                        ? 'bg-white text-black hover:bg-neutral-100 shadow-lg'
                        : 'btn-ig'
                    }`}
                  >
                    <InstagramIcon className={`w-4 h-4 shrink-0 ${plan.isPopular ? 'text-black' : ''}`} aria-hidden="true" />
                    <span>Замовити у Direct</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note */}
        <ScrollReveal animation="fade-up">
          <div className="mt-10 p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] max-w-2xl mx-auto flex items-start sm:items-center gap-4 text-[13px] leading-relaxed text-[#6B6B6B]">
            <div aria-hidden="true" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <InstagramIcon className="w-4 h-4 text-white" />
            </div>
            <p>
              Потрібен індивідуальний контент-день або термінова зйомка? Напишіть в Instagram Direct — розрахую детальний кошторис за декілька хвилин.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
