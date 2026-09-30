import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, Eye, Check, Volume2 } from 'lucide-react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundBlocked, setSoundBlocked] = useState(false);

  // The tap on a card counts as a user gesture, so browsers allow playing with sound.
  // If one still refuses (e.g. iOS Low Power Mode), fall back to muted playback and
  // offer a one-tap "turn sound on" button.
  useEffect(() => {
    const video = videoRef.current;
    if (!item?.video || !video) return;
    setSoundBlocked(false);
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      setSoundBlocked(true);
      video.play().catch(() => {});
    });
  }, [item]);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
    setSoundBlocked(false);
  };

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
  const layout = !item.video ? 'image' : item.orientation === 'horizontal' ? 'horizontal' : 'vertical';

  // Phones: a vertical video gets the full-height sheet and every pixel the details
  // don't need; the compact details (title, description, CTA) always stay in view.
  // Phone turned sideways (`short:`): media on the left at full height, details scroll on the right.
  const containerLayout = {
    image: 'flex-col md:flex-row',
    vertical: 'flex-col h-[92dvh] md:h-auto md:flex-row short:flex-row short:h-[calc(100dvh-1.5rem)]',
    horizontal: 'flex-col short:flex-row short:h-[calc(100dvh-1.5rem)]',
  }[layout];

  // Videos are shown whole (object-contain) in their native aspect ratio
  const mediaLayout = {
    image: 'w-full md:w-1/2 h-[clamp(170px,32dvh,300px)] md:h-auto md:min-h-[460px] shrink-0',
    vertical:
      'w-full flex-1 min-h-0 md:flex-none md:w-auto md:h-[min(86vh,780px)] md:aspect-[9/16] short:flex-none short:w-auto short:h-full short:aspect-[9/16]',
    horizontal: 'w-full aspect-video shrink-0 short:w-auto short:h-full short:max-w-[62%]',
  }[layout];

  const closeButton = (
    <button
      ref={closeRef}
      type="button"
      onClick={onClose}
      className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#141312]/75 hover:bg-[#141312] active:scale-95 text-white transition-[background-color,transform] cursor-pointer shadow-md backdrop-blur-sm"
      aria-label="Закрити"
    >
      <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
    </button>
  );

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
        className={`relative w-full ${layout === 'horizontal' ? 'max-w-3xl' : 'max-w-4xl'} max-h-[92dvh] sm:max-h-[90vh] bg-[#FAF8F5] rounded-[22px] sm:rounded-3xl overflow-hidden shadow-2xl flex ${containerLayout} border border-white/20 animate-modal-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button — over the photo; for videos it sits in the details panel,
            because Safari's native player controls occupy the video's top corners */}
        {layout === 'image' && closeButton}

        {/* Media Column (Left / Top on mobile) */}
        <div className={`${mediaLayout} bg-black flex items-center justify-center relative overflow-hidden`}>
          {/* Blurred copy of the cover fills the letterbox around the video (like Reels / TikTok) */}
          {item.video && (
            <img
              src={photoUrl(item.image, 480)}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-60 pointer-events-none"
            />
          )}
          {item.video ? (
            // Started with sound from the effect above; native controls give
            // pause, volume, seeking and fullscreen on every platform.
            <video
              key={item.id}
              ref={videoRef}
              poster={photoUrl(item.image)}
              onVolumeChange={(e) => !e.currentTarget.muted && setSoundBlocked(false)}
              loop
              playsInline
              controls
              preload="metadata"
              aria-label={item.title}
              className="relative w-full h-full object-contain"
            >
              {/* The browser picks the first format it can play */}
              <source src={`/videos/${item.video}.hevc.mp4`} type='video/mp4; codecs="hvc1"' />
              <source src={`/videos/${item.video}.mp4`} type="video/mp4" />
            </video>
          ) : (
            <Photo
              name={item.image}
              sizes="(min-width: 768px) 448px, 100vw"
              alt={`${item.title} — ${item.brand ?? item.categoryLabel}`}
              loading="eager"
              className="w-full h-full object-cover"
            />
          )}

          {/* Shown only if the browser refused to start with sound */}
          {item.video && soundBlocked && (
            <button
              type="button"
              onClick={enableSound}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white/95 text-[#141312] text-[13px] font-semibold shadow-xl backdrop-blur-sm active:scale-95 transition-transform animate-fade-in"
            >
              <Volume2 className="w-4 h-4" aria-hidden="true" />
              <span>Увімкнути звук</span>
            </button>
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
        <div className={`${layout === 'image' ? 'md:w-1/2' : 'md:flex-1'} ${layout === 'vertical' ? 'shrink-0 md:shrink' : ''} w-full min-w-0 min-h-0 p-4 sm:p-6 md:p-8 short:p-5 relative flex flex-col justify-between overflow-y-auto overscroll-contain space-y-3 sm:space-y-4 md:space-y-6 short:space-y-3`}>
          {layout !== 'image' && closeButton}
          <div className="space-y-1.5 sm:space-y-3">

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
            <h3 id={titleId} className="font-serif text-xl sm:text-2xl md:text-3xl short:text-xl font-medium text-[#141312] leading-snug pr-10 md:pr-8">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[12.5px] sm:text-sm text-[#5E5A54] leading-relaxed">
              {item.description}
            </p>

            {/* Deliverables — compact chips on phones, a list on larger screens */}
            {item.deliverables && (
              <ul className="flex flex-wrap gap-1.5 pt-1 md:hidden short:flex" aria-label="Формат та матеріали">
                {item.deliverables.map((del) => (
                  <li key={del} className="px-2 py-0.5 rounded-full border border-[#141312]/12 text-[11px] text-[#5E5A54] whitespace-nowrap">
                    {del}
                  </li>
                ))}
              </ul>
            )}
            {item.deliverables && (
              <div className="hidden md:block short:hidden space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 border-t border-[#141312]/10">
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
          <div className="pt-3 sm:pt-4 md:pt-6 short:pt-3 border-t border-[#141312]/10 space-y-2 sm:space-y-2.5">
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
            <p className="hidden sm:block short:hidden text-[11px] text-center text-[#7A746B]">
              Обговорення деталей та розрахунок термінів в Instagram @{CREATOR_INFO.instagramHandle}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
