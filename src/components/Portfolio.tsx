import { useState, useCallback } from 'react';
import { Play, Eye, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import type { PortfolioItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { ScrollReveal } from './ScrollReveal';
import { Photo } from './Photo';

type FilterId = 'all' | PortfolioItem['category'];

const FILTER_TABS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Всі роботи' },
  { id: 'reels', label: 'Reels & Відео' },
  { id: 'ugc', label: 'UGC Content' },
  { id: 'photo', label: 'Предметне фото' },
  { id: 'lifestyle', label: 'Lifestyle' },
];

const isVideoWork = (item: PortfolioItem) =>
  item.category === 'reels' || item.category === 'ugc' || Boolean(item.videoUrl);

export const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterId>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const closeLightbox = useCallback(() => setSelectedItem(null), []);

  const filteredItems = activeTab === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="py-14 md:py-24 bg-[#FAFAFA] relative">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-5 md:gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="section-eyebrow">
                <span className="section-eyebrow-line" />
                <span className="section-eyebrow-num">03</span>
                <span className="section-eyebrow-sep">/</span>
                <span className="section-eyebrow-text">Портфоліо</span>
              </div>
              <h2 id="portfolio-title" className="font-serif text-[2rem] sm:text-5xl leading-tight text-[#1A1A1A]">
                Мої роботи, які <span className="hidden sm:inline"><br /></span>
                <span className="italic font-normal text-black relative inline-block">
                  говорять самі за себе
                  <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#6B6B6B] max-w-md leading-relaxed">
              Естетичний візуал для брендів одягу, косметики, прикрас та закладів.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs — scroll edge-to-edge on mobile */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div
            role="group"
            aria-label="Фільтр робіт за категорією"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x scroll-px-5 -mx-5 px-5 sm:mx-0 sm:px-0 pt-1 pb-4 mb-6 md:mb-10"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`snap-start shrink-0 min-h-[40px] px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-[background-color,color,border-color,box-shadow] duration-300 active:scale-[0.97] ${
                    isActive
                      ? 'bg-black text-white border-black shadow-[0_4px_14px_rgba(0,0,0,0.2)]'
                      : 'bg-white text-[#6B6B6B] border-[#EBEBEB] hover:text-black hover:border-black/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Grid — 2 columns from the smallest phones, 3 on desktop */}
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filteredItems.map((item, idx) => (
            <li key={item.id}>
              <ScrollReveal animation="fade-up" delay={100 + (idx % 3) * 100} className="h-full">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  aria-haspopup="dialog"
                  aria-label={`${item.title} — ${item.categoryLabel}. Відкрити деталі`}
                  className="group w-full h-full text-left cursor-pointer rounded-[16px] sm:rounded-[24px] overflow-hidden bg-white border border-[#EBEBEB] hover:shadow-2xl hover:-translate-y-1 active:scale-[0.985] transition-[box-shadow,transform] duration-400 flex flex-col"
                >
                  {/* Image — 4:5 on mobile (feed format), square from sm */}
                  <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-[#F0F0F0]">
                    <Photo
                      name={item.image}
                      sizes="(min-width: 1024px) 380px, 50vw"
                      alt=""
                      className="w-full h-full object-cover object-center transition-transform duration-600 ease-out-expo group-hover:scale-105"
                    />

                    {/* Hover overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ArrowUpRight className="w-5 h-5 text-black" />
                      </div>
                    </div>

                    {/* Play badge */}
                    {isVideoWork(item) && (
                      <div aria-hidden="true" className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/65 backdrop-blur-sm">
                        <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white" />
                      </div>
                    )}

                    {/* Metrics */}
                    {item.metrics && (
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 max-w-[calc(100%-1rem)] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-white shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.metrics}</span>
                      </div>
                    )}
                  </div>

                  {/* Card footer */}
                  <div className="p-3 sm:p-5 flex flex-col gap-1 sm:gap-1.5 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] truncate">
                        {item.categoryLabel}
                      </span>
                      {item.brand && (
                        <span className="hidden sm:inline text-[11px] text-[#737373] font-medium truncate">
                          {item.brand}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#1A1A1A] text-[13px] sm:text-sm leading-snug">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            </li>
          ))}
        </ul>

      </div>

      <LightboxModal item={selectedItem} onClose={closeLightbox} />
    </section>
  );
};
