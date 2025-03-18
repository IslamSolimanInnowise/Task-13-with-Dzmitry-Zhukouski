import 'i18next';

import auth from '@public/locales/en/auth.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
    };
  }
}
