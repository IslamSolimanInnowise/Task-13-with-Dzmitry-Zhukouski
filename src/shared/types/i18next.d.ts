import 'i18next';

import auth from '@public/locales/en/auth.json';
import cvs from '@public/locales/en/cvs.json';
import others from '@public/locales/en/others.json';
import page404 from '@public/locales/en/page404.json';
import settings from '@public/locales/en/Settings.json';
import users from '@public/locales/en/users.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
      settings: typeof settings;
      users: typeof users;
      cvs: typeof cvs;
      page404: typeof page404;
      others: typeof others;
    };
  }
}
