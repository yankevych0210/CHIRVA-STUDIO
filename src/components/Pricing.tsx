import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { PRICING_PLANS, CREATOR_INFO } from '../data/portfolioData';
import { InstagramIcon } from './Icons';
import { ScrollReveal } from './ScrollReveal';

interface PricingProps {
  onSelectPlan: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan: _onSelectPlan }) => {
  return (
    <section id="pricing" className="py-14 md:py-20 bg-white relative">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="badge-editorial">ПРАЙС & ІНВЕСТИЦІЯ</span>
            <h2 className="font-serif text-[1.7rem] sm:text-5xl leading-tight text-[#1A1A1A]">
              Прозора вартість <span className="hidden sm:inline"><br /></span>
              <span className="italic font-normal text-black relative inline-block">
                під ваші задачі
                <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
              </span>
            </h2>
            <p className="text-sm text-[#737373] leading-relaxed">
              Точний розрахунок залежить від обсягу робіт, складності сценаріїв та кількості локацій. Напишіть мені в Direct для КП.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <ScrollReveal key={plan.id} animation="fade-up" delay={150 + idx * 100}>
              <div
                className={`relative border transition-all duration-300 flex flex-col justify-between h-full ${
                  plan.isPopular
                    ? 'text-white shadow-2xl pt-10 pb-8 px-8 rounded-[20px] sm:rounded-[28px] border-neutral-800'
                    : 'p-8 rounded-[20px] sm:rounded-[28px] bg-white border-[#EBEBEB] hover:shadow-xl hover:border-black/30'
                }`}
                style={plan.isPopular ? { background: 'linear-gradient(135deg, #18181B 0%, #000000 100%)' } : {}}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full whitespace-nowrap z-10 flex items-center gap-1.5 shadow-lg bg-white text-[#1A1A1A] border border-white/80"
                    style={{
                      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <h3 className={`font-serif text-2xl font-medium ${plan.isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {plan.title}
                    </h3>
                    <p className={`text-xs ${plan.isPopular ? 'text-white/70' : 'text-[#737373]'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className={`py-4 border-y space-y-1 ${plan.isPopular ? 'border-white/20' : 'border-[#F0F0F0]'}`}>
                    <div className={`font-serif text-2xl font-normal ${plan.isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {plan.priceNote}
                    </div>
                    <div className={`text-[11px] font-medium uppercase tracking-wider ${plan.isPopular ? 'text-white/60' : 'text-[#ABABAB]'}`}>
                      Персональне КП у Direct
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.isPopular ? 'bg-white/20 text-white' : 'bg-black text-white'
                          }`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className={plan.isPopular ? 'text-white/85' : 'text-[#737373]'}>
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
                    className={`w-full py-3.5 px-6 text-sm font-semibold rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      plan.isPopular
                        ? 'bg-white text-black hover:bg-neutral-100 shadow-lg'
                        : 'btn-ig'
                    }`}
                  >
                    <InstagramIcon className={`w-4 h-4 ${plan.isPopular ? 'text-black' : ''}`} />
                    <span>Запитати прайс у Direct</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note */}
        <ScrollReveal animation="fade-up" delay={450}>
          <div className="mt-10 p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] max-w-2xl mx-auto flex items-center gap-4 text-xs text-[#737373]">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
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
