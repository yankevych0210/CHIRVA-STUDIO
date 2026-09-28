import { Sparkles, Heart, ShieldCheck, Zap, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Photo } from './Photo';
import { photoUrl } from '../lib/photos';

export const About: React.FC = () => {
  const pillars = [
    {
      number: '01',
      icon: Sparkles,
      title: 'Журнальна естетика',
      desc: 'Кожен кадр будується з урахуванням вивіреного світла, природних відтінків та чистих ліній. Ваш візуал виглядає дорого.'
    },
    {
      number: '02',
      icon: Heart,
      title: 'Емоційний зв\'язок',
      desc: 'Контент не просто показує товар, а викликає бажання розділити цінності вашого бренду та оформити замовлення.'
    },
    {
      number: '03',
      icon: Zap,
      title: 'Hook & Retention',
      desc: 'Перші 3 секунди тримають увагу, а трендова подача забезпечує високі охоплення та вірусний ефект роликів.'
    },
    {
      number: '04',
      icon: ShieldCheck,
      title: 'Чіткість та дедлайни',
      desc: 'Прозорий системний процес: розкадровка, вивірений реквізит і здача матеріалів точно у погоджений термін.'
    }
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-16 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal animation="slide-right">
              <div className="relative max-w-[400px] mx-auto lg:max-w-none">
                <div className="w-full aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-black/10 bg-[#F5F5F5] group">
                  <Photo
                    name="about"
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 400px, calc(100vw - 2.5rem)"
                    alt="Женя Чирва з камерою під час зйомки в студії"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Quote Card */}
                <figure className="relative -mt-10 mx-3 sm:mx-0 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 sm:w-4/5 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl space-y-3">
                  <div className="flex gap-1 items-center" aria-label="Рейтинг 5 з 5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className="w-4 h-4 fill-black text-black"
                      />
                    ))}
                    <span aria-hidden="true" className="ml-1.5 text-xs font-bold text-[#1A1A1A]">5.0</span>
                  </div>
                  <blockquote className="font-serif italic text-[1.05rem] text-[#1A1A1A] leading-snug">
                    «Моя мета — зробити так, щоб ваш бренд виглядав як мрія у стрічці кожного клієнта.»
                  </blockquote>
                  <figcaption className="flex items-center gap-2.5">
                    <div className="ig-story-ring w-8 h-8 shrink-0">
                      <div className="ig-story-ring-inner w-full h-full">
                        <img src={photoUrl('hero', 480)} alt="" width={32} height={32} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1A1A1A]">@chirva.cm</span>
                  </figcaption>
                </figure>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <ScrollReveal animation="fade-up">
              <div className="space-y-3">
                <div className="section-eyebrow">
                  <span className="section-eyebrow-line" />
                  <span className="section-eyebrow-num">01</span>
                  <span className="section-eyebrow-sep">/</span>
                  <span className="section-eyebrow-text">Про мене</span>
                </div>
                <h2 id="about-title" className="font-serif text-[2rem] sm:text-5xl leading-tight text-[#1A1A1A]">
                  Привіт, я Женя. <br />
                  <span className="italic font-normal text-black relative inline-block">
                    Створюю візуальні історії
                    <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={80}>
              <div className="space-y-4 text-[15px] sm:text-base text-[#52525B] leading-relaxed">
                <p>
                  Я — контент-мейкерка та візуальна стратегиня. Допомагаю брендам одягу, косметики, lifestyle-проєктам та закладам виходити на новий рівень сприйняття через сучасний фото та відеоконтент.
                </p>
                <p>
                  У світі, де увагу користувача потрібно завоювати за 2 секунди, стандартні макети більше не працюють. Я створюю живий, естетичний та розроблений під задачі бізнесу контент, який викликає щирий інтерес і бажання купити.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              {pillars.map((item, idx) => (
                <ScrollReveal key={item.number} animation="fade-up" delay={0} delayLg={(idx % 2) * 100} className="h-full">
                  <div
                    className="h-full p-5 sm:p-6 rounded-2xl bg-white border border-[#EBEBEB] shadow-sm space-y-3 hover:border-black/30 hover:shadow-xl hover:-translate-y-0.5 transition-[border-color,box-shadow,transform] duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span aria-hidden="true" className="font-serif text-xl font-medium text-black">
                        {item.number}
                      </span>
                      <div aria-hidden="true" className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-[15px] text-[#1A1A1A]">{item.title}</h3>
                    <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

