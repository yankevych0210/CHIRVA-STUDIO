import type { PortfolioItem, ServiceItem, PricingPlan, CooperationStep, InstagramPost } from '../types';

export const CREATOR_INFO = {
  /**
   * Production domain without a trailing slash, e.g. 'https://chirva.studio'.
   * Used for canonical URL, Open Graph, JSON-LD and sitemap.xml at build time.
   * Leave empty until the domain is known — absolute-URL tags are then skipped.
   */
  siteUrl: 'https://chirva-studio.vercel.app',
  name: 'Женя Чирва',
  nameLatin: 'Evhenia Chirva',
  brandName: 'The Video by Evhenia Chirva',
  role: 'Content Creator & Visual Strategist',
  location: 'Кременчук, Україна • Global Remote',
  instagramHandle: 'chirva.cm',
  instagramUrl: 'https://www.instagram.com/chirva.cm/',
  telegramUrl: 'https://t.me/chirva_cm',
  email: 'chirva.content@gmail.com',
  tagline: 'КОНТЕНТ, ЯКИЙ ЕСТЕЦИЗУЄ БРЕНД ТА ПРОДАЄ БЕЗ НАВ\'ЯЗУВАННЯ',
  heroDescription: 'Створюю естетичні Reels, lifestyle, особисті/fashion зйомки, які прагнуть виглядати преміально і мати високу залученість.',
  heroBadges: [
    { value: '150+', label: 'Створених Reels' },
    { value: '98%', label: 'Задоволених брендів' },
    { value: '2.5M+', label: 'Сумарних переглядів' }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'reels',
    number: '01',
    title: 'Editorial Reels & Short Video',
    subtitle: 'Вірусний контент з естетичною подачею',
    description: 'Динамічні, атмосферні та розроблені під алгоритми ролики 9:16. Викликають емоцію, утримують увагу від першої секунди та закохують у ваш продукт.',
    deliverables: [
      'Розробка сценаріїв та розкадровка',
      'Зйомка у високій якості 4K',
      'Професійний естетичний монтаж',
      'Підбір трендових аудіо та колірокорекція'
    ],
    recommendedFor: 'Брендів одягу, косметики, закладів та особистих блогів',
    iconName: 'Film'
  },
  {
    id: 'ugc',
    number: '02',
    title: 'UGC Content (User Generated)',
    subtitle: 'Живі огляди та тестування від першої особи',
    description: 'Щирий контент без відчуття прямої реклами. Клієнти бачать реальну людину, яка користується продуктом у своєму житті, що гарантує високий рівень довіри.',
    deliverables: [
      'Автентична розпаковка (Unboxing)',
      'Review & Testimonials під таргетинг',
      'Голосове озвучування (Voiceover)',
      'Формати для TikTok, Instagram & Ads'
    ],
    recommendedFor: 'E-commerce, beauty-брендів, гаджетів та сервісів',
    iconName: 'Camera'
  },
  {
    id: 'wedding',
    number: '03',
    title: 'Wedding',
    description: 'Створення унікального контенту, який повністю передає атмосферу пари та їх гостей на весіллі.',
    deliverables: [
      'Консультація з нареченими',
      'Підбір музики за вайбом пари',
      'Підбір трендів за вайбом пари'
    ],
    iconName: 'Heart'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'work-trench',
    title: 'Trench Coat Story',
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'work-trench',
    video: 'work-trench',
    duration: 'PT31S',
    orientation: 'vertical',
    description: 'Fashion-ролик у міському просторі: сміливі нижні ракурси, рух тренча та волосся, живе денне світло.',
    deliverables: ['Reels 9:16', 'Зйомка у 4K', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-leather',
    title: 'Leather Mood',
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'work-leather',
    video: 'work-leather',
    duration: 'PT38S',
    orientation: 'vertical',
    description: 'Атмосферний fashion Reels у темній палітрі: місто, авто та осінній настрій.',
    deliverables: ['Reels 9:16', 'Зйомка у 4K', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-studio',
    title: 'Studio Session',
    category: 'studio',
    categoryLabel: 'Студійна зйомка',
    image: 'work-studio',
    video: 'work-studio',
    duration: 'PT55S',
    orientation: 'vertical',
    description: 'Бекстейдж студійної фотосесії: робота зі світлом, позування та живі моменти між кадрами.',
    deliverables: ['Reels 9:16', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-enduro',
    title: 'Enduro Forest Ride',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    image: 'work-enduro',
    video: 'work-enduro',
    duration: 'PT24S',
    orientation: 'vertical',
    description: 'Динамічний lifestyle-ролик про ендуро: ліс, рух і характер у кожному кадрі.',
    deliverables: ['Reels 9:16', 'Зйомка у 4K', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-picnic',
    title: 'Summer Picnic',
    category: 'events',
    categoryLabel: 'Події',
    image: 'work-picnic',
    video: 'work-picnic',
    duration: 'PT49S',
    orientation: 'horizontal',
    description: 'Теплий літній пікнік з подругами: ніжні емоції, сонце та атмосфера свята.',
    deliverables: ['Відео 16:9', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-christening',
    title: 'Таїнство Хрещення',
    category: 'events',
    categoryLabel: 'Події',
    image: 'work-christening',
    video: 'work-christening',
    duration: 'PT39S',
    orientation: 'horizontal',
    description: 'Відео зі святкового дня хрещення: головні моменти таїнства та емоції рідних.',
    deliverables: ['Відео 16:9', 'Монтаж та колірокорекція']
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'single',
    title: 'SINGLE CONTENT',
    subtitle: 'Точковий контент для вирішення конкретної задачі',
    priceNote: '2000 грн',
    priceCaption: '',
    features: [
      '1 Естетичний Reels / Shorts або UGC-відео',
      'Розробка сценарію та концепту',
      'Професійний монтаж та колірокорекція',
      'Права на використання у соцмережах',
      'Термін виконання: 3-5 днів'
    ],
    ctaText: 'Замовити контент'
  },
  {
    id: 'reels-pack',
    badge: 'ПОПУЛЯРНИЙ ВИБІР',
    isPopular: true,
    title: 'REELS PACK',
    subtitle: 'Серія вірусних та естетичних роликів на місяць',
    priceNote: '7000 грн',
    priceCaption: '',
    features: [
      '8-10 Естетичних роликів Reels / TikTok',
      'Аналіз трендів та аудиторії бренду',
      'Детальний сценарій для кожного відео',
      'Трендове аудіо та субтитри',
      '2 Кола кадрових правок включено',
      'Пріоритетні терміни виробництва'
    ],
    ctaText: 'Запитувати прайс'
  },
  {
    id: 'wedding',
    title: 'WEDDING',
    subtitle: 'Відео для дня вашого кохання',
    priceNote: '2000 грн',
    priceCaption: 'за годину',
    features: [
      'Актуальні тренди для Reels',
      'Ніжні відео для передачі вайбу пари',
      'Особисті ТЗ від пари'
    ],
    ctaText: 'Обговорити дату'
  }
];

export const COOPERATION_STEPS: CooperationStep[] = [
  {
    step: '01',
    title: 'Брифінг та ідея',
    description: 'Обговорюємо ваші цілі, цінності бренду, цільову аудиторію та формат необхідного контенту.'
  },
  {
    step: '02',
    title: 'Мудборд та ТЗ',
    description: 'Формуємо естетичну референсну дошку, погоджуємо локації, реквізит, тези та сценарії.'
  },
  {
    step: '03',
    title: 'Продакшн',
    description: 'Зйомка на професійне обладнання з вивіреним світлом, композицією та стилем.'
  },
  {
    step: '04',
    title: 'Монтаж та передача',
    description: 'Естетичний монтаж, колірокорекція, накладення звуку та передача файлів через хмару.'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'bts-1',
    caption: 'Бекстейдж: зйомка fashion-контенту на вулиці',
    type: 'photo',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-2',
    image: 'work-trench',
    caption: 'Trench Coat Story — fashion Reels',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-3',
    image: 'work-leather',
    caption: 'Leather Mood — fashion Reels',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-4',
    image: 'bts-2',
    caption: 'Бекстейдж: зйомка Reels на телефон',
    type: 'photo',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-5',
    image: 'work-studio',
    caption: 'Studio Session — бекстейдж фотосесії',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-6',
    image: 'work-enduro',
    caption: 'Enduro Forest Ride — lifestyle Reels',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  }
];
