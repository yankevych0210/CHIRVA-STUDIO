import type { PortfolioItem, ServiceItem, PricingPlan, CooperationStep, InstagramPost } from '../types';

export const CREATOR_INFO = {
  name: 'Женя Чирва',
  role: 'Content Creator & Visual Strategist',
  location: 'Global Remote',
  instagramHandle: 'chirva.cm',
  instagramUrl: 'https://www.instagram.com/chirva.cm/',
  telegramUrl: 'https://t.me/chirva_cm',
  email: 'chirva.content@gmail.com',
  tagline: 'КОНТЕНТ, ЯКИЙ ЕСТЕЦИЗУЄ БРЕНД ТА ПРОДАЄ БЕЗ НАВ\'ЯЗУВАННЯ',
  heroDescription: 'Створюю естетичні Reels, UGC, предметні та lifestyle фото для брендів, які прагнуть виглядати премиально і мати високу залученість.',
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
    id: 'photo',
    number: '03',
    title: 'Brand Photo Production',
    subtitle: 'Предметна та lifestyle фотозйомка',
    description: 'Створення унікального фотоконтенту з вивіреною композицією, грою природного світла та журнальною естетикою для сітки та каталогу.',
    deliverables: [
      'Предметна фотозйомка (Flatlay, macro)',
      'Lifestyle кадри з моделями/в інтер\'єрі',
      'Колірокорекція та ретуш у єдиному стилі',
      'Адаптація під розміри сайту та соцмереж'
    ],
    recommendedFor: 'Лукбуків, маркетплейсів, баннерів та соцмереж',
    iconName: 'Sparkles'
  },
  {
    id: 'turnkey',
    number: '04',
    title: 'Content Package "Turnkey"',
    subtitle: 'Повний візуальний супровід бренду на місяць',
    description: 'Комплексне рішення для тих, хто хоче делегувати візуальну концепцію. Готовий контент-пак на місяць вперед без стресу та пошуку окремих фахівців.',
    deliverables: [
      'Мудборд та візуальна концепція',
      '10-15 роликів Reels / Shorts',
      '20-30 естетичних фотографій',
      'Готовий контент-план та гайд по викладці'
    ],
    recommendedFor: 'Брендів, які прагнуть стабільної присутності та стилю',
    iconName: 'Compass'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'work-1',
    title: 'Aesthetic Skincare Launch',
    category: 'photo',
    categoryLabel: 'Предметне фото',
    imageUrl: '/images/skincare.png',
    ratio: 'square',
    metrics: 'Editorial Visual',
    brand: 'AURA Botanical',
    description: 'Предметна зйомка нової лінії органічної сироватки з використанням природних тіней та мінеральних текстур.',
    deliverables: ['30+ Ретушованих кадрів', 'Контент для сайту', 'Instagram Visual']
  },
  {
    id: 'work-2',
    title: 'Parisian Coat Campaign',
    category: 'reels',
    categoryLabel: 'Reels & Відео',
    imageUrl: '/images/fashion.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-long-coat-41584-large.mp4',
    ratio: 'portrait',
    metrics: '210K+ Переглядів',
    brand: 'Maison Capsule',
    description: 'Атмосферний Reels у журнальному стилі street-style з демонстрацією крою та рухів тканини в міському середовищі.',
    deliverables: ['Вірусний Reels 9:16', 'Звукове оформлення', 'Кадри для ілюстрацій']
  },
  {
    id: 'work-3',
    title: 'Morning Ritual & Matcha',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    imageUrl: '/images/lifestyle.png',
    ratio: 'square',
    metrics: '85K+ Залученість',
    brand: 'Nude Living',
    description: 'Естетичний flatlay з естетикою Kinfolk: журнальний розворот, матча та сонячні бліки для бренду домашнього затишку.',
    deliverables: ['Lifestyle фотопак', 'Сторіс-шаблони']
  },
  {
    id: 'work-4',
    title: 'Honest Skincare UGC Review',
    category: 'ugc',
    categoryLabel: 'UGC Content',
    imageUrl: '/images/ugc.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-filming-a-vlog-with-her-phone-41586-large.mp4',
    ratio: 'portrait',
    metrics: '4.8x ROI в Meta Ads',
    brand: 'Serene Beauty',
    description: 'UGC відео з розпаковкою, текстурою та живим враженням від використання сироватки для таргетованої реклами.',
    deliverables: ['UGC ролик з Voiceover', '3 Рекламні хуки', 'Subtitles on-screen']
  },
  {
    id: 'work-5',
    title: 'Creator Studio BTS',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    imageUrl: '/images/about.png',
    ratio: 'portrait',
    metrics: 'Бекстейдж зйомки',
    brand: 'Zhenya Chirva Studio',
    description: 'Кадри з процесу створення контенту у студії з м\'яким естетичним світлом.',
    deliverables: ['Брендинговий фотопак']
  },
  {
    id: 'work-6',
    title: 'Minimalist Jewelry Concept',
    category: 'photo',
    categoryLabel: 'Предметне фото',
    imageUrl: '/images/hero.png',
    ratio: 'portrait',
    metrics: '120K+ Reach',
    brand: 'LUMIERE Fine Jewelry',
    description: 'Портретна та аксесуарна зйомка з акцентом на мінімалістичні прикраси та природну красу.',
    deliverables: ['Лукбук кадрів', 'Reels прев\'ю']
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'single',
    title: 'SINGLE CONTENT',
    subtitle: 'Точковий контент для вирішення конкретної задачі',
    priceNote: 'Вартість розраховується під ТЗ',
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
    priceNote: 'Вартість — за запитом',
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
    id: 'full-brand',
    title: 'FULL VISUAL BRAND',
    subtitle: 'Повна візуальна трансформація вашого бренду',
    priceNote: 'Індивідуальний розрахунок',
    features: [
      '12-15 Естетичних Reels & UGC роликів',
      '25+ Предметних та lifestyle фото',
      'Розробка єдиної візуальної сітки (Grid)',
      'Повний контент-план на 30 днів',
      'Консультація та гайд по викладці',
      'Повний контроль концепції під ключ'
    ],
    ctaText: 'Обговорити проєкт'
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
    imageUrl: '/images/hero.png',
    likes: '1,420',
    comments: '84',
    caption: 'Естетика в кожній деталі. Створюємо візуал, який говорить сам за себе. #chirvacm #contentcreator',
    type: 'photo',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-2',
    imageUrl: '/images/fashion.png',
    likes: '2,890',
    comments: '132',
    caption: 'Morning walk in Paris style. Як правильно знімати fashion reels для брендів одягу.',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-3',
    imageUrl: '/images/skincare.png',
    likes: '1,950',
    comments: '67',
    caption: 'Гра світла та тіні для косметичного бренду. Коли продукт виглядає преміально.',
    type: 'photo',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-4',
    imageUrl: '/images/lifestyle.png',
    likes: '3,110',
    comments: '148',
    caption: 'Matcha & Kinfolk mood. Естетичні деталі для щоденного натхнення.',
    type: 'photo',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-5',
    imageUrl: '/images/ugc.png',
    likes: '4,200',
    comments: '210',
    caption: 'Чому UGC контент продає в 3 рази ефективніше за звичайні макети? Розбір кейсу.',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  },
  {
    id: 'ig-6',
    imageUrl: '/images/about.png',
    likes: '2,340',
    comments: '98',
    caption: 'Behind the scenes: день з життя контент-мейкерки. Студія, концепт і світло.',
    type: 'reel',
    url: 'https://www.instagram.com/chirva.cm/'
  }
];
