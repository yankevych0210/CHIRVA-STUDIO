import { Film, Camera, Sparkles, Compass, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES, CREATOR_INFO } from '../data/portfolioData';
import { InstagramIcon } from './Icons';

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

  const igGradient = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

  return (
    <section id="services" className="py-14 md:py-20 relative bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="badge-editorial">ПОСЛУГИ ТА НАПРЯМКИ</span>
            <h2 className="font-serif text-3xl sm:text-5xl leading-tight text-[#1A1A1A]">
              Що я створюю для <br />
              <span
                className="italic font-normal"
                style={{
                  background: igGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                вашого бренду
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#737373] max-w-md leading-relaxed">
            Від точкових вірусних роликів до повного візуального супроводу. Кожна послуга адаптується під концепт вашого проєкту.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`group p-7 sm:p-9 rounded-[28px] border transition-all duration-400 flex flex-col justify-between relative overflow-hidden ${
                service.isHighlighted
                  ? 'bg-[#fff5f6] border-rose-200 hover:shadow-xl hover:border-rose-300'
                  : 'bg-[#FAFAFA] border-[#EBEBEB] hover:shadow-xl hover:border-transparent'
              }`}
            >
              {/* Gradient top line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: igGradient }}
              />

              <div className="space-y-5">
                {/* Number & Icon */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-serif text-4xl font-light"
                    style={{
                      background: igGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {service.number}
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-300"
                    style={{ background: igGradient }}
                  >
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A1A]">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#dc2743' }}>
                    {service.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#737373] leading-relaxed">{service.description}</p>

                {/* Deliverables */}
                <div className="space-y-2.5 pt-3 border-t border-[#EBEBEB]">
                  <span className="text-[11px] font-semibold text-[#1A1A1A] uppercase tracking-wider block">
                    Що входить:
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#737373]">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: igGradient }}>
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-5 border-t border-[#EBEBEB] space-y-3">
                <div className="inline-flex items-start sm:items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F3EFEA]/80 border border-[#1C1A17]/5 text-xs text-[#6E6962] leading-normal w-full">
                  <span className="font-semibold text-[#1C1A17] shrink-0">Для кого:</span>
                  <span>{service.recommendedFor}</span>
                </div>

                <div className="pt-1">
                  <a
                    href={CREATOR_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ig w-full py-3 text-xs justify-center shadow-md hover:shadow-xl transition-all cursor-pointer"
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                    <span>Обговорити проєкт в Direct</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
