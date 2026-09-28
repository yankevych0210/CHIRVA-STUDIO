import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Eye, Check } from 'lucide-react';
import type { PortfolioItem } from '../types';
import { CREATOR_INFO } from '../data/portfolioData';
import { lockScroll } from '../lib/scrollLock';
import { Photo } from './Photo';
import { photoUrl } from '../lib/photos';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll, Escape to close, keep Tab focus inside, restore focus on close
  useEffect(() => {
    if (!item) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlock();
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [item, onClose]);

  if (!item) return null;

  const titleId = `lightbox-title-${item.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#141312]/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-[#FAF8F5] rounded-[22px] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#141312]/75 hover:bg-[#141312] active:scale-95 text-white transition-[background-color,transform] cursor-pointer shadow-md backdrop-blur-sm"
          aria-label="Закрити"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </button>

        {/* Media Column (Left / Top on mobile) */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative h-[clamp(170px,32dvh,300px)] md:h-auto md:min-h-[460px] shrink-0 overflow-hidden">
          {item.videoUrl ? (
            <video
              src={item.videoUrl}
              poster={photoUrl(item.image)}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Photo
              name={item.image}
              sizes="(min-width: 768px) 448px, 100vw"
              alt={`${item.title} — ${item.brand ?? item.categoryLabel}`}
              loading="eager"
              className="w-full h-full object-cover"
            />
          )}

          {/* Metric badge overlay */}
          {item.metrics && (
            <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#141312]/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-mono font-medium flex items-center gap-1.5 border border-white/10">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" aria-hidden="true" />
              <span>{item.metrics}</span>
            </div>
          )}
        </div>

        {/* Details Column (Right / Bottom on mobile) */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain space-y-3 sm:space-y-4 md:space-y-6">
          <div className="space-y-2 sm:space-y-3">

            {/* Category & Brand Tag */}
            <div className="flex flex-wrap items-center gap-2">
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
            <h3 id={titleId} className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-[#141312] leading-snug pr-10 md:pr-8">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[12.5px] sm:text-sm text-[#5E5A54] leading-relaxed">
              {item.description}
            </p>

            {/* Deliverables List */}
            {item.deliverables && (
              <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 border-t border-[#141312]/10">
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#141312] uppercase tracking-wider block">
                  Формат та матеріали:
                </span>
                <ul className="space-y-1 sm:space-y-1.5">
                  {item.deliverables.map((del) => (
                    <li key={del} className="flex items-center gap-2 text-[12px] sm:text-xs text-[#5E5A54]">
                      <Check className="w-3 h-3 text-black shrink-0" aria-hidden="true" />
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
              className="btn-primary w-full py-2.5 sm:py-3.5 md:py-4 text-[13px] text-center justify-center gap-2"
            >
              <span>Замовити схожий проєкт у Direct</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            </a>
            <p className="text-[10px] sm:text-[11px] text-center text-[#7A746B]">
              Обговорення деталей та розрахунок термінів в Instagram @{CREATOR_INFO.instagramHandle}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
