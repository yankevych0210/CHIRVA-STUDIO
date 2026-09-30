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
    title: 'City Trench',
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'work-trench',
    video: 'work-trench',
    duration: 'PT31S',
    orientation: 'vertical',
    description: 'Street-style Reels: бежевий тренч, старовинні фасади та сміливі ракурси знизу.',
    deliverables: ['Reels 9:16', 'Зйомка у 4K', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-leather',
    title: 'Black Leather',
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'work-leather',
    imagePosition: '50% 8%',
    video: 'work-leather',
    duration: 'PT38S',
    orientation: 'vertical',
    description: 'Монохромний fashion-ролик: шкіряна куртка, міські вулиці та стриманий, але дуже характерний образ.',
    deliverables: ['Reels 9:16', 'Зйомка у 4K', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-studio',
    title: 'Soft Studio',
    category: 'fashion',
    categoryLabel: 'Fashion',
    image: 'work-studio',
    video: 'work-studio',
    duration: 'PT55S',
    orientation: 'vertical',
    description: 'Студійна зйомка у світлому просторі: мʼяке світло, чорно-білі кадри та живі емоції між позами.',
    deliverables: ['Reels 9:16', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-enduro',
    title: 'Enduro Mood',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    image: 'work-enduro',
    video: 'work-enduro',
    duration: 'PT24S',
    orientation: 'vertical',
    description: 'Динамічний Reels для райдера: сосновий ліс, ендуро-мотоцикл і рух, у якому відчувається адреналін.',
    deliverables: ['Reels 9:16', 'Зйомка у 4K', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-picnic',
    title: 'Sunny Picnic',
    category: 'events',
    categoryLabel: 'Events',
    image: 'work-picnic',
    video: 'work-picnic',
    duration: 'PT49S',
    orientation: 'horizontal',
    description: 'Літній пікнік з подругами: сонце, келихи, сміх і атмосфера свята, знята легко та ніжно.',
    deliverables: ['Відео 16:9', 'Монтаж та колірокорекція']
  },
  {
    id: 'work-christening',
    title: 'Christening Day',
    category: 'events',
    categoryLabel: 'Events',
    image: 'work-christening',
    video: 'work-christening',
    duration: 'PT39S',
    orientation: 'horizontal',
    description: 'Хрещення малюка: найзворушливіші моменти таїнства, світло свічок та емоції рідних.',
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

// Covers of the latest 6 posts on @chirva.cm (cropped from the profile grid).
// Replace with a live feed once the Instagram connection is set up.
export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'ig-1',
    caption: 'Fashion-зйомка: тренч і ретро-велосипед',
    type: 'photo',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-2',
    image: 'ig-2',
    caption: 'Студійна чорно-біла зйомка',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-3',
    image: 'ig-3',
    caption: 'Fashion Reels: тренч біля кав’ярні',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-4',
    image: 'ig-4',
    caption: 'Fashion Reels: місто та шкіряна куртка',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-5',
    image: 'ig-5',
    caption: 'Lifestyle Reels: ендуро в лісі',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-6',
    image: 'ig-6',
    caption: 'Reels з події: вогні та феєрверки',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  }
];
