import 'i18next';

import aside from '@public/locales/en/Aside.json';
import auth from '@public/locales/en/auth.json';
import cvs from '@public/locales/en/cvs.json';
import page404 from '@public/locales/en/page404.json';
import searchInput from '@public/locales/en/SearchInput.json';
import settings from '@public/locales/en/Settings.json';
import users from '@public/locales/en/users.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
      aside: typeof aside;
      settings: typeof settings;
      searchInput: typeof searchInput;
      users: typeof users;
      cvs: typeof cvs;
      page404: typeof page404;
    };
  }
}
