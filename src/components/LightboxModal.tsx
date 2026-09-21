import { X, ArrowUpRight, Eye, Check } from 'lucide-react';
import type { PortfolioItem } from '../types';
import { CREATOR_INFO } from '../data/portfolioData';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onInquire: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onInquire: _onInquire }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#141312]/80 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-[#141312]/70 text-white hover:bg-[#141312] transition-all focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Column (Left) */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[480px]">
          {item.videoUrl ? (
            <video
              src={item.videoUrl}
              poster={item.imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover max-h-[80vh]"
            />
          ) : (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover max-h-[80vh]"
            />
          )}

          {/* Metric badge overlay */}
          {item.metrics && (
            <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-[#141312]/80 backdrop-blur-md text-white text-xs font-mono font-semibold flex items-center gap-1.5 border border-white/10">
              <Eye className="w-3.5 h-3.5 text-white" />
              <span>{item.metrics}</span>
            </div>
          )}
        </div>

        {/* Details Column (Right) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            
            {/* Category & Brand Tag */}
            <div className="flex items-center gap-2">
              <span className="badge-editorial text-[10px]">
                {item.categoryLabel}
              </span>
              {item.brand && (
                <span className="text-xs font-mono font-semibold text-black uppercase tracking-wider">
                  • {item.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#141312]">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#6E6962] font-light leading-relaxed">
              {item.description}
            </p>

            {/* Deliverables List */}
            {item.deliverables && (
              <div className="space-y-2 pt-4 border-t border-[#141312]/10">
                <span className="text-[11px] font-mono font-bold text-[#141312] uppercase tracking-wider block">
                  Формат та матеріали:
                </span>
                <ul className="space-y-2">
                  {item.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#6E6962]">
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#141312]/10 space-y-3">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="btn-primary w-full py-4 text-xs text-center justify-center gap-2"
            >
              <span>Замовити схожий проєкт у Direct</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-[11px] text-center text-[#9E988F]">
              Обговорення деталей та розрахунок термінів в Instagram @{CREATOR_INFO.instagramHandle}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
