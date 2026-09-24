import { Sparkles, Heart, ShieldCheck, Zap, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

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
    <section id="about" className="py-16 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal animation="slide-right" delay={100}>
              <div className="relative max-w-[400px] mx-auto lg:max-w-none">
                <div className="w-full aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-black/10 bg-[#F5F5F5] group">
                  <img
                    src="/images/about.png"
                    alt="Женя Чирва за роботою"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Quote Card */}
                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 w-full sm:w-4/5 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl space-y-3">
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-black text-black"
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-[#1A1A1A]">5.0</span>
                  </div>
                  <p className="font-serif italic text-base text-[#1A1A1A] leading-snug">
                    "Моя мета — зробити так, щоб ваш бренд виглядав як мрія у стрічці кожного клієнта."
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="ig-story-ring w-8 h-8 shrink-0">
                      <div className="ig-story-ring-inner w-full h-full">
                        <img src="/images/hero.png" alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1A1A1A]">@chirva.cm</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="space-y-3">
                <div className="section-eyebrow">
                  <span className="section-eyebrow-line" />
                  <span className="section-eyebrow-num">01</span>
                  <span className="section-eyebrow-sep">/</span>
                  <span className="section-eyebrow-text">Про мене</span>
                </div>
                <h2 className="font-serif text-[1.7rem] sm:text-5xl leading-tight text-[#1A1A1A]">
                  Привіт, я Женя. <br />
                  <span className="italic font-normal text-black relative inline-block">
                    Створюю візуальні історії
                    <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-black/15" />
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <div className="space-y-4 text-base text-[#52525B] leading-relaxed">
                <p>
                  Я — контент-мейкерка та візуальна стратегиня. Допомагаю брендам одягу, косметики, lifestyle-проєктам та закладам виходити на новий рівень сприйняття через сучасний фото та відеоконтент.
                </p>
                <p>
                  У світі, де увагу користувача потрібно завоювати за 2 секунди, стандартні макети більше не працюють. Я створюю живий, естетичний та розроблений під задачі бізнесу контент, який викликає щирий інтерес і бажання купити.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((item, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={300 + idx * 100}>
                  <div
                    className="p-6 rounded-2xl bg-white border border-[#EBEBEB] shadow-sm space-y-3 hover:border-black/30 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl font-medium text-black">
                        {item.number}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm text-[#1A1A1A]">{item.title}</h3>
                    <p className="text-xs text-[#737373] leading-relaxed">{item.desc}</p>
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

