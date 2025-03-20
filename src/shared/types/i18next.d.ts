import 'i18next';

import aside from '@public/locales/en/Aside.json';
import auth from '@public/locales/en/auth.json';
import cvDetails from '@public/locales/en/cvDetails.json';
import cvProjects from '@public/locales/en/cvProjects.json';
import cvsHeader from '@public/locales/en/cvsHeader.json';
import cvsNotifications from '@public/locales/en/cvsNotifications.json';
import cvsTable from '@public/locales/en/cvsTable.json';
import page404 from '@public/locales/en/page404.json';
import searchInput from '@public/locales/en/SearchInput.json';
import settings from '@public/locales/en/Settings.json';
import users from '@public/locales/en/users.json';
import usersNotifications from '@public/locales/en/usersNotifications.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
      aside: typeof aside;
      settings: typeof settings;
      searchInput: typeof searchInput;
      users: typeof users;
      cvsTable: typeof cvsTable;
      cvsHeader: typeof cvsHeader;
      cvDetails: typeof cvDetails;
      cvProjects: typeof cvProjects;
      cvsNotifications: typeof cvsNotifications;
      usersNotifications: typeof usersNotifications;
      page404: typeof page404;
    };
  }
}
