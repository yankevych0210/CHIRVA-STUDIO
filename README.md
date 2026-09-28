# ✨ Женя Чирва — Personal Brand & Creator Portfolio

Сучасний преміальний односторінковий сайт-портфоліо (**landing page**) для контент-мейкерки та візуальної стратегині **Жені Чирви** ([@chirva.cm](https://www.instagram.com/chirva.cm/)).

Сайт розроблено в стилістиці **minimalistic editorial + fashion creator**, що формує відчуття дорогого та професійного личного бренду.

---

## 🎨 Візуальна концепція та палітра

- **Палітра**: монохром — білий, `#FAFAFA`, графіт `#1A1A1A` та чорний `#0A0A0A`.
- **Типографіка** (self-hosted через Fontsource, з підтримкою кирилиці):
  `Cormorant Garamond` — editorial-заголовки, `Inter` — текст та UI, `IBM Plex Mono` — підписи й мітки,
  `Alex Brush` + `DM Sans` — лише у логотипі.
- **Mobile First**: від 320px до 1920px+, safe-area для iPhone, hover-ефекти лише на пристроях з мишею.

---

## 🚀 Структура розділів

1. **Hero Screen** — Головний екран із виразним заголовком, фотографією Жені, локаційним бейджем та кнопками заклику до дії.
2. **Про мене (Storytelling)** — Філософія роботи, підхід до створення контенту та 4 принципи якості.
3. **Послуги (Що я створюю)** — Картки послуг (*Editorial Reels*, *UGC Content*, *Brand Photo Production*, *Content Package "Turnkey"*) з інтерактивним замовленням.
4. **Мої роботи (Портфоліо)** — Галерея з фільтрами категорій та **Full-Screen Lightbox Modal** для інтерактивного перегляду фото та відеоматеріалів.
5. **Формати співпраці & Кейси** — Розбір 3 форматів роботи та 4-етапний алгоритм продакшну.
6. **Прайс** — Акуратні картки тарифних планів із прозорим розрахунком за запитом.
7. **Instagram Feed** — Жива інтерактивна сітка у стилі стрічки `@chirva.cm`.
8. **Контактна форма** — Зручна форма заявки з вибором категорій (чипи) та миттєвим станом підтвердження.
9. **Footer** — Підвал із контактами та швидким поверненням нагору.

---

## 🛠 Технології

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v3](https://v3.tailwindcss.com/) + CSS-змінні (`src/index.css`)
- **Icons**: [Lucide React](https://lucide.dev/) + власні SVG
- **SEO**: статичний пре-рендер HTML під час збірки, Open Graph, JSON-LD (Person / ProfessionalService / WebSite), robots.txt, sitemap.xml

---

## 📦 Встановлення та запуск

```bash
npm install        # залежності
npm run dev        # dev-сервер → http://localhost:5173/
npm run build      # продакшн-збірка в dist/ (з пре-рендером HTML)
npm run preview    # перегляд продакшн-збірки
npm run lint       # oxlint
```

---

## 🌐 Домен сайту (важливо для SEO)

Вкажіть домен у `src/data/portfolioData.ts` → `CREATOR_INFO.siteUrl` (наприклад `'https://chirva.studio'`)
або під час збірки: `SITE_URL=https://chirva.studio npm run build`.
Тоді у збірку додаються `canonical`, `og:url`, абсолютні посилання на OG-картинку та `sitemap.xml`.

---

## 📝 Редагування контенту

Усі тексти, послуги, роботи портфоліо, прайс та посилання — в одному файлі: `src/data/portfolioData.ts`.
SEO-заголовок та опис — `src/seo.ts` та `index.html`.

### Фото

1. Покладіть оригінал (PNG/JPG) у `assets/originals/`, наприклад `assets/originals/newwork.png`.
2. Запустіть `npm run images` (потрібен `cwebp`: `brew install webp`) — з'являться `public/images/newwork-480.webp` та `-960.webp`.
3. Додайте назву в `PhotoName` та `PHOTO_SIZE` у `src/lib/photos.ts` і використайте `image: 'newwork'` у даних.

### Відео у портфоліо

Покладіть MP4 у `public/videos/` і вкажіть `videoUrl: '/videos/work.mp4'` у роботі — воно відтворюватиметься в лайтбоксі.

### Фавікон

Вихідник монограми — `assets/brand/monogram.svg`. Готові іконки лежать у `public/`
(`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png`, `og-image.jpg`).

---

## 📜 Ліцензія

Проєкт поширюється під ліцензією [MIT License](./LICENSE). © 2026 Женя Чирва.
