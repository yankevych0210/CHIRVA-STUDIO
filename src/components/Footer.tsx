import { ArrowUp } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-10 border-t border-white/[0.07]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.07]">

          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              {/* Monogram */}
              <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(135deg, #3f3f46 0%, #000000 100%)', display: 'inline-block' }}>
                <div style={{ background: '#0A0A0A', borderRadius: '50%', padding: '2px' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-black"
                  >
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', fontWeight: 600, color: '#fff', letterSpacing: '0.06em' }}>
                      ЖЧ
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-widest uppercase text-white">
                  Женя Чирва
                </span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase font-medium text-white/60">
                  Content Creator
                </span>
              </div>
            </div>

            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Контент-мейкерка & візуальна стратегиня. Естетичний фото та відеоконтент для брендів, що формує емоційний зв'язок з аудиторією.
            </p>

            <div className="text-xs text-white/35 font-medium uppercase tracking-wider">
              📍 Кременчук, Україна · Global Remote
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 block">
              Навігація
            </span>
            <ul className="space-y-2.5">
              {[
                { href: '#about',     label: 'Про мене' },
                { href: '#services',  label: 'Послуги' },
                { href: '#portfolio', label: 'Портфоліо' },
                { href: '#cases',     label: 'Формати співпраці' },
                { href: '#pricing',   label: 'Прайс' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 block">
              Instagram Direct
            </span>

            <a
              href={CREATOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-[#18181B] transition-all group"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <InstagramIcon className="w-5 h-5 text-white" />
              <div>
                <div className="text-sm font-semibold text-white">@{CREATOR_INFO.instagramHandle}</div>
                <div className="text-xs text-white/40">Написати в Direct</div>
              </div>
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div>© 2026 Женя Чирва. Усі права захищено.</div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold text-white/30 hover:text-white transition-colors cursor-pointer"
          >
            <span>НАГОРУ</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
