import type { SupportedLang } from './types';

export const translations = {
  ar: {
    siteTitle: 'دراما برو - منصة المسلسلات والأفلام العربية والعالمية',
    siteDescription: 'استمتع بمشاهدة أحدث الأفلام والمسلسلات العربية والعالمية بجودة عالية على تطبيق دراما برو.',
    home: 'الرئيسية',
    movies: 'الأفلام',
    series: 'المسلسلات',
    search: 'بحث',
    watchOnApp: 'شاهد على تطبيق دراما برو',
    downloadApp: 'تحميل تطبيق Drama Pro',
    appStoreBadge: 'متوفر على Android',
    rating: 'التقييم',
    year: 'سنة الإنتاج',
    category: 'التصنيف',
    episodes: 'الحلقات',
    episode: 'الحلقة',
    featured: 'مميز',
    newBadge: 'جديد',
    views: 'مشاهدة',
    genres: 'الأنواع',
    synopsis: 'قصة العمل',
    watchInAppPrompt: 'لمشاهدة هذا العمل بجودة عالية وبدون إعلانات، حمّل تطبيق دراما برو الآن على هاتفك الأندرويد.',
    allRightsReserved: 'جميع الحقوق محفوظة © دراما برو',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الاستخدام',
    switchLang: 'English',
    switchLangUrl: '/en',
    dir: 'rtl',
    langName: 'العربية',
    noItemsFound: 'لم يتم العثور على أعمال في هذا التصنيف.',
    relatedMedia: 'أعمال قد تعجبك'
  },
  en: {
    siteTitle: 'Drama Pro - Arabic & International Movies and Series Catalog',
    siteDescription: 'Discover the latest movies, drama series, and shows in Arabic and English on Drama Pro.',
    home: 'Home',
    movies: 'Movies',
    series: 'Series',
    search: 'Search',
    watchOnApp: 'Watch on Drama Pro App',
    downloadApp: 'Download Drama Pro App',
    appStoreBadge: 'Available on Android',
    rating: 'Rating',
    year: 'Release Year',
    category: 'Category',
    episodes: 'Episodes',
    episode: 'Episode',
    featured: 'Featured',
    newBadge: 'New',
    views: 'Views',
    genres: 'Genres',
    synopsis: 'Synopsis',
    watchInAppPrompt: 'To watch this content in HD with no interruptions, download the Drama Pro app for Android.',
    allRightsReserved: 'All rights reserved © Drama Pro',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    switchLang: 'العربية',
    switchLangUrl: '/ar',
    dir: 'ltr',
    langName: 'English',
    noItemsFound: 'No items found in this category.',
    relatedMedia: 'You May Also Like'
  }
};

export function getTranslation(lang: SupportedLang) {
  return translations[lang] || translations.ar;
}

export function getLocalizedField(item: { [key: string]: any }, fieldName: string, lang: SupportedLang): string {
  const suffix = lang === 'en' ? 'En' : 'Ar';
  const val = item[`${fieldName}${suffix}`] || item[`${fieldName}Ar`] || item[`${fieldName}En`];
  return val ? String(val) : '';
}
