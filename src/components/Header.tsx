import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Clock } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';
import { lockScroll } from '../lib/scrollLock';

const NAV_LINKS = [
  { id: 'about', label: 'Про мене' },
  { id: 'services', label: 'Послуги' },
  { id: 'portfolio', label: 'Портфоліо' },
  { id: 'cases', label: 'Процес' },
  { id: 'pricing', label: 'Прайс' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the nav link of the section currently in the middle of the screen
  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock page scroll, close on Escape, manage focus
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const unlock = lockScroll();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    // Focus after the drawer's visibility transition has started
    const focusTimer = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50);
    const toggle = toggleRef.current;
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      unlock();
      toggle?.focus({ preventScroll: true });
    };
  }, [mobileMenuOpen]);

  // Close the drawer if the viewport grows to desktop while it's open
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setMobileMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    // Wait a frame so the scroll lock is released before scrolling
    requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId === 'hero' ? location.pathname : `#${targetId}`);
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background-color,box-shadow,border-color] duration-300 border-b ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md backdrop-saturate-150 border-black/[0.07] py-3.5 shadow-sm'
            : 'bg-transparent border-transparent py-5 sm:py-6 md:py-8'
        }`}
      >
        <div className="container-custom flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="group flex items-center"
            aria-label={`${CREATOR_INFO.brandName} — на початок сторінки`}
          >
            <BrandLogo />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Основна навігація">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-current after:origin-left after:transition-transform after:duration-300 ${
                    isActive
                      ? 'text-[#1A1A1A] after:scale-x-100'
                      : 'text-[#6B6B6B] hover:text-[#1A1A1A] after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig text-sm py-2.5 px-5"
            >
              <InstagramIcon className="w-4 h-4" aria-hidden="true" />
              <span>Instagram Direct</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#141312] active:bg-black/5 transition-colors"
              aria-label={`Instagram @${CREATOR_INFO.instagramHandle}`}
            >
              <InstagramIcon className="w-5 h-5" aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-11 h-11 rounded-full bg-[#1A1A1A] text-white active:scale-95 transition-transform flex items-center justify-center"
              aria-label="Відкрити меню"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        inert={!mobileMenuOpen}
        className={`fixed inset-0 z-50 bg-white flex flex-col md:hidden h-screen-dynamic transition-[opacity,transform,visibility] duration-300 ease-out-expo ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-3 invisible'
        }`}
      >
        {/* Drawer Header */}
        <div className="container-custom flex items-center justify-between py-4 border-b border-[#EBEBEB] shrink-0 pt-[max(1rem,env(safe-area-inset-top))]">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            aria-label="На початок сторінки"
          >
            <BrandLogo />
          </a>

          <button
            ref={closeRef}
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-11 h-11 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#1A1A1A] active:bg-black/5 transition-colors"
            aria-label="Закрити меню"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col justify-center px-8 overflow-y-auto overscroll-contain">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#737373] mb-3 block">
            Навігація
          </span>
          <nav className="flex flex-col" aria-label="Мобільна навігація">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-current={activeId === link.id ? 'location' : undefined}
                className={`group font-serif text-[2rem] leading-tight text-[#1A1A1A] flex items-center justify-between py-3.5 border-b border-[#F0F0F0] last:border-0 active:opacity-60 transition-[opacity,transform] duration-500 ease-out-expo ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${80 + idx * 45}ms` : '0ms' }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-[#A1A1AA] tracking-wider">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </span>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-black" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom CTA with iOS safe area inset */}
        <div className="p-6 border-t border-[#EBEBEB] shrink-0 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
          <a
            href={CREATOR_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-ig w-full py-3.5 text-sm justify-center"
          >
            <InstagramIcon className="w-4 h-4" aria-hidden="true" />
            <span>Написати в Instagram Direct</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <p className="text-center text-[10px] text-[#737373] mt-3 tracking-wider uppercase flex items-center justify-center gap-1.5 font-medium">
            <Clock className="w-3 h-3 text-black" aria-hidden="true" />
            <span>Швидка відповідь у Direct</span>
          </p>
        </div>
      </div>
    </>
  );
};
