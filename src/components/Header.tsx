import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Clock } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact: _onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'about', label: 'Про мене' },
    { id: 'services', label: 'Послуги' },
    { id: 'portfolio', label: 'Портфоліо' },
    { id: 'cases', label: 'Формати' },
    { id: 'pricing', label: 'Прайс' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.07] py-3.5 shadow-sm'
            : 'bg-transparent py-5 sm:py-6 md:py-8'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="group flex items-center text-decoration-none"
          >
            <BrandLogo />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-medium text-[#737373] hover:text-[#1A1A1A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig text-sm py-2.5 px-5"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram Direct</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#141312] hover:text-black transition-colors"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333333] transition-colors flex items-center justify-center focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu — 100dvh for iOS Safari compatibility */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-300 flex flex-col md:hidden h-[100dvh] max-h-[100dvh] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] shrink-0">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="text-decoration-none"
          >
            <BrandLogo />
          </a>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#737373] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
            aria-label="Закрити меню"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col justify-center px-8 space-y-2 overflow-y-auto">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373] mb-2 block">
            Навігація
          </span>
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="group font-serif text-3xl sm:text-4xl leading-tight text-[#1A1A1A] flex items-center justify-between py-3.5 border-b border-[#F0F0F0] last:border-0 transition-all duration-200"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                  {link.label}
                </span>
                <ArrowUpRight
                  className="w-5 h-5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-black"
                />
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
            <InstagramIcon className="w-4 h-4" />
            <span>Написати в Instagram Direct</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-center text-[10px] text-[#737373] mt-3 tracking-wider uppercase flex items-center justify-center gap-1.5 font-medium">
            <Clock className="w-3 h-3 text-black" />
            <span>Швидка відповідь у Direct</span>
          </p>
        </div>
      </div>
    </>
  );
};
