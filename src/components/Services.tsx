import { Film, Camera, Sparkles, Compass, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES, CREATOR_INFO } from '../data/portfolioData';
import { InstagramIcon } from './Icons';
import { ScrollReveal } from './ScrollReveal';

interface ServicesProps {
  onSelectService: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService: _onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':     return <Film className="w-5 h-5" />;
      case 'Camera':   return <Camera className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Compass':  return <Compass className="w-5 h-5" />;
      default:         return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-14 md:py-20 relative bg-white">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="badge-editorial">ПОСЛУГИ ТА НАПРЯМКИ</span>
              <h2 className="font-serif text-3xl sm:text-5xl leading-tight text-[#1A1A1A]">
                Що я створюю для <br />
                <span className="italic font-normal text-black relative inline-block">
                  вашого бренду
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#737373] max-w-md leading-relaxed">
              Від точкових вірусних роликів до повного візуального супроводу. Кожна послуга адаптується під концепт вашого проєкту.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.id} animation="fade-up" delay={150 + idx * 100}>
              <div
                className={`group p-7 sm:p-9 rounded-[28px] border transition-all duration-400 flex flex-col justify-between relative overflow-hidden h-full ${
                  service.isHighlighted
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-2xl'
                    : 'bg-[#FAFAFA] border-[#EBEBEB] text-[#1A1A1A] hover:shadow-xl hover:border-black/30'
                }`}
              >
                {/* Dark/Black top line on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${
                    service.isHighlighted ? 'bg-white' : 'bg-black'
                  }`}
                />

                <div className="space-y-5">
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-serif text-4xl font-light ${
                        service.isHighlighted ? 'text-white' : 'text-black'
                      }`}
                    >
                      {service.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        service.isHighlighted ? 'bg-white text-black' : 'bg-black text-white'
                      }`}
                    >
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className={`font-serif text-2xl sm:text-3xl font-medium ${
                      service.isHighlighted ? 'text-white' : 'text-[#1A1A1A]'
                    }`}>
                      {service.title}
                    </h3>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      service.isHighlighted ? 'text-white/70' : 'text-[#737373]'
                    }`}>
                      {service.subtitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed ${
                    service.isHighlighted ? 'text-white/80' : 'text-[#737373]'
                  }`}>{service.description}</p>

                  {/* Deliverables */}
                  <div className={`space-y-2.5 pt-3 border-t ${
                    service.isHighlighted ? 'border-white/15' : 'border-[#EBEBEB]'
                  }`}>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider block ${
                      service.isHighlighted ? 'text-white' : 'text-[#1A1A1A]'
                    }`}>
                      Що входить:
                    </span>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className={`flex items-start gap-2.5 text-xs ${
                          service.isHighlighted ? 'text-white/85' : 'text-[#737373]'
                        }`}>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            service.isHighlighted ? 'bg-white text-black' : 'bg-black text-white'
                          }`}>
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className={`pt-4 mt-5 border-t ${
                  service.isHighlighted ? 'border-white/15' : 'border-[#EBEBEB]'
                }`}>
                  <div>
                    <a
                      href={CREATOR_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 text-xs justify-center shadow-md hover:shadow-xl transition-all cursor-pointer rounded-full inline-flex items-center gap-2 font-semibold ${
                        service.isHighlighted
                          ? 'bg-white text-black hover:bg-neutral-100'
                          : 'btn-ig'
                      }`}
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>Обговорити проєкт в Direct</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
