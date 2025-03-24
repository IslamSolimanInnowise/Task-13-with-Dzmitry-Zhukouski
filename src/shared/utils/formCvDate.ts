const localeMap = {
  en: 'en-GB',
  ru: 'ru-RU',
  ar: 'ar-SA',
} as const;

export type LocaleMap = typeof localeMap;

const getFullLocale = (language: keyof typeof localeMap) => {
  return localeMap[language] || 'en-GB';
};

const formatCvDate = (
  date: string | null | undefined,
  locale: string = 'en-GB',
) => {
  if (!date) return 'Till now';
  return new Date(date)
    .toLocaleDateString(locale, {
      month: '2-digit',
      year: 'numeric',
    })
    .replace('/', '.');
};

export { formatCvDate, getFullLocale };
