import 'i18next';

import auth from '@public/locales/en/auth.json';
import languages from '@public/locales/en/languages.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
      languages: typeof languages;
    };
  }
}
