import { useState, useEffect } from 'react';
import { Send, CheckCircle2, Send as TelegramIcon, Check } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CREATOR_INFO } from '../data/portfolioData';

interface ContactFormProps {
  preselectedTopic?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedTopic }) => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    'Reels & Shorts',
    'UGC Content',
    'Предметне фото',
    'Lifestyle зйомка',
    'Пакет "Turnkey"',
    'Консультація'
  ];

  useEffect(() => {
    if (preselectedTopic && !selectedServices.includes(preselectedTopic)) {
      setSelectedServices((prev) => [...prev, preselectedTopic]);
    }
  }, [preselectedTopic]);

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#F3EFEA]/60 relative">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-[#1C1A17]/8 shadow-2xl space-y-10 relative overflow-hidden">
            
            {/* Ambient Dark Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-black/10 via-black/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Emotional Header */}
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="section-eyebrow justify-center">
                <span className="section-eyebrow-line" />
                <span className="section-eyebrow-num">07</span>
                <span className="section-eyebrow-sep">/</span>
                <span className="section-eyebrow-text">Зв'язок</span>
                <span className="section-eyebrow-line" />
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl leading-tight text-[#1C1A17]">
                Створимо щось <br />
                <span className="italic font-normal text-black">
                  красиве разом?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6E6962]">
                Заповніть коротку форму або напишіть мені в Instagram / Telegram. Я відповім протягом кількох годин.
              </p>
            </div>

            {/* Quick Links Banner */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-4 border-y border-[#1C1A17]/8">
              <a
                href={CREATOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill hover:border-black"
              >
                <InstagramIcon className="w-4 h-4 text-black" />
                <span>Instagram @{CREATOR_INFO.instagramHandle}</span>
              </a>

              <a
                href={CREATOR_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill hover:border-[#0088cc]/40"
              >
                <TelegramIcon className="w-4 h-4 text-[#0088cc]" />
                <span>Telegram @chirva_cm</span>
              </a>
            </div>

            {/* Form / Success view */}
            {isSubmitted ? (
              <div className="text-center py-10 space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-black mx-auto flex items-center justify-center border border-neutral-200">
                  <CheckCircle2 className="w-8 h-8 text-black" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl text-[#1C1A17]">Дякую, {name}!</h3>
                  <p className="text-sm text-[#6E6962] max-w-md mx-auto">
                    Ваш запит успішно отримано. Я вивчу ваш бренд та зв'яжуся з вами у найближчий час.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary py-3 px-6 text-xs"
                >
                  Надіслати ще один запит
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                
                {/* Inputs grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                      Ваше ім'я або назва бренду *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="напр. Олена / Maison Brand"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F3EFEA]/60 border border-[#1C1A17]/10 focus:border-black focus:bg-white focus:outline-none text-sm transition-all text-[#1C1A17]"
                    />
                  </div>

                  {/* Handle Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                      Instagram / Telegram / Телефон *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username або +380..."
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F3EFEA]/60 border border-[#1C1A17]/10 focus:border-black focus:bg-white focus:outline-none text-sm transition-all text-[#1C1A17]"
                    />
                  </div>

                </div>

                {/* Topic Chips Selection */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] block">
                    Що вас цікавить? (можна обрати кілька)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-black text-white shadow-md'
                              : 'bg-[#F5F5F5] text-[#737373] hover:bg-neutral-200 hover:text-black'
                          }`}
                        >
                          <span>{srv}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A17]">
                    Коротко про проєкт або ваші побажання
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Розкажіть про продукт, референси або терміни..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#F3EFEA]/60 border border-[#1C1A17]/10 focus:border-black focus:bg-white focus:outline-none text-sm transition-all text-[#1C1A17]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-ig w-full py-4 text-sm justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Надсилаємо...</span>
                  ) : (
                    <>
                      <span>Надіслати запит</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
