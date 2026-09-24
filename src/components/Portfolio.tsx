import { useState } from 'react';
import { Play, Eye, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import type { PortfolioItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { ScrollReveal } from './ScrollReveal';

interface PortfolioProps {
  onInquire: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onInquire }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reels' | 'ugc' | 'photo' | 'lifestyle'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filterTabs = [
    { id: 'all',      label: 'Всі роботи' },
    { id: 'reels',    label: 'Reels & Відео' },
    { id: 'ugc',      label: 'UGC Content' },
    { id: 'photo',    label: 'Предметне фото' },
    { id: 'lifestyle',label: 'Lifestyle' }
  ];

  const filteredItems = activeTab === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="portfolio" className="py-14 md:py-20 bg-[#FAFAFA] relative">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="section-eyebrow">
                <span className="section-eyebrow-line" />
                <span className="section-eyebrow-num">02</span>
                <span className="section-eyebrow-sep">/</span>
                <span className="section-eyebrow-text">Портфоліо</span>
              </div>
              <h2 className="font-serif text-[1.7rem] sm:text-5xl leading-tight text-[#1A1A1A]">
                Мої роботи, які <span className="hidden sm:inline"><br /></span>
                <span className="italic font-normal text-black relative inline-block">
                  говорять самі за себе
                  <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#737373] max-w-md leading-relaxed">
              Естетичний візуал для брендів одягу, косметики, прикрас та закладів.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs — Minimalist pills */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border"
                style={
                  activeTab === tab.id
                    ? { background: '#000000', color: '#ffffff', border: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }
                    : { background: '#fff', color: '#737373', borderColor: '#EBEBEB' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid — Instagram-style equal square/portrait cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} animation="fade-up" delay={100 + (idx % 3) * 100}>
              <div
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer rounded-[16px] sm:rounded-[24px] overflow-hidden bg-white border border-[#EBEBEB] hover:shadow-2xl transition-all duration-400 flex flex-col h-full"
              >
                {/* Square image */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#F5F5F5]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.35)' }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
                      <ArrowUpRight className="w-5 h-5 text-black" />
                    </div>
                  </div>

                  {/* Play badge */}
                  {(item.category === 'reels' || item.category === 'ugc' || item.videoUrl) && (
                    <div className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm"
                      style={{ background: 'rgba(0,0,0,0.65)' }}>
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  )}

                  {/* Metrics */}
                  {item.metrics && (
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5"
                      style={{ background: 'rgba(0,0,0,0.6)' }}>
                      <Eye className="w-3 h-3 text-white" />
                      <span>{item.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="p-5 flex flex-col gap-1.5 flex-1 justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                        {item.categoryLabel}
                      </span>
                      {item.brand && <span className="text-[11px] text-[#ABABAB] font-medium">{item.brand}</span>}
                    </div>
                    <h3 className="font-semibold text-[#1A1A1A] text-sm group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onInquire={onInquire}
      />
    </section>
  );
};
