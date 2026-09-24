import React, { useEffect } from 'react';
import { X, ArrowUpRight, Eye, Check } from 'lucide-react';
import type { PortfolioItem } from '../types';
import { CREATOR_INFO } from '../data/portfolioData';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onInquire: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onInquire: _onInquire }) => {
  // Prevent body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#141312]/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-[#FAF8F5] rounded-[22px] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#141312]/75 hover:bg-[#141312] text-white transition-all focus:outline-none cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Media Column (Left / Top on mobile) */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative h-[175px] xs:h-[195px] sm:h-[240px] md:h-auto md:min-h-[460px] shrink-0 overflow-hidden">
          {item.videoUrl ? (
            <video
              src={item.videoUrl}
              poster={item.imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Metric badge overlay */}
          {item.metrics && (
            <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#141312]/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 border border-white/10">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              <span>{item.metrics}</span>
            </div>
          )}
        </div>

        {/* Details Column (Right / Bottom on mobile) */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-3 sm:space-y-4 md:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            
            {/* Category & Brand Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-neutral-600 bg-neutral-200/80 px-2 py-0.5 rounded">
                {item.categoryLabel}
              </span>
              {item.brand && (
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-black uppercase tracking-wider">
                  • {item.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-medium text-[#141312] leading-snug">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[11.5px] sm:text-sm text-[#6E6962] font-light leading-relaxed">
              {item.description}
            </p>

            {/* Deliverables List */}
            {item.deliverables && (
              <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 border-t border-[#141312]/10">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#141312] uppercase tracking-wider block">
                  Формат та матеріали:
                </span>
                <ul className="space-y-1 sm:space-y-1.5">
                  {item.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#6E6962]">
                      <Check className="w-3 h-3 text-black shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-2.5 sm:pt-4 md:pt-6 border-t border-[#141312]/10 space-y-2 sm:space-y-2.5">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="btn-primary w-full py-2.5 sm:py-3.5 md:py-4 text-xs text-center justify-center gap-2"
            >
              <span>Замовити схожий проєкт у Direct</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <p className="text-[10px] sm:text-[11px] text-center text-[#9E988F]">
              Обговорення деталей та розрахунок термінів в Instagram @{CREATOR_INFO.instagramHandle}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
