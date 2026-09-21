import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact: _onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.07] py-3.5 shadow-sm'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="group flex items-center gap-3 text-decoration-none"
          >
            {/* Story-ring Monogram */}
            <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(135deg, #000000, #3f3f46)' }} className="group-hover:scale-105 transition-transform duration-300">
              <div style={{ background: '#fff', borderRadius: '50%', padding: '2px' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-black"
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', userSelect: 'none' }}>
                    ЖЧ
                  </span>
                </div>
              </div>
            </div>
            {/* Name */}
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#1A1A1A]" style={{ letterSpacing: '0.18em' }}>
                Женя Чирва
              </span>
              <span className="text-[0.6rem] tracking-[0.18em] uppercase font-medium text-[#737373]">
                Content Creator
              </span>
            </div>
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
              className="p-2 rounded-full text-[#141312] hover:text-black transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333333] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-all duration-500 flex flex-col md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBEBEB]">
          <div className="flex items-center gap-3">
            {/* Story-ring monogram — matches desktop */}
            <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(135deg, #000000, #3f3f46)' }}>
              <div style={{ background: '#fff', borderRadius: '50%', padding: '2px' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-black"
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>ЖЧ</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#1A1A1A]" style={{ letterSpacing: '0.18em' }}>
                Женя Чирва
              </span>
              <span className="text-[0.6rem] tracking-[0.18em] uppercase font-medium text-[#737373]">
                Content Creator
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#737373] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all"
            aria-label="Закрити меню"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col justify-center px-8 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373] mb-4 block">
            Навігація
          </span>
          <nav className="flex flex-col">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="group font-serif text-[2.6rem] leading-tight text-[#1A1A1A] flex items-center justify-between py-3 border-b border-[#F0F0F0] last:border-0 transition-all duration-200"
                style={{ transitionDelay: `${idx * 30}ms` }}
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

        {/* Bottom CTA */}
        <div className="p-6 border-t border-[#EBEBEB]">
          <a
            href={CREATOR_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-ig w-full py-4 text-sm justify-center"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Написати в Instagram Direct</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-center text-[10px] text-[#ABABAB] mt-3 tracking-wider uppercase">
            Відповідь протягом кількох годин ⚡
          </p>
        </div>
      </div>
    </>
  );
};
