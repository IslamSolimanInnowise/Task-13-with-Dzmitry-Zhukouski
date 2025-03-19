import 'i18next';

import Aside from '@public/locales/en/Aside.json';
import auth from '@public/locales/en/auth.json';
import CVDetails from '@public/locales/en/CVDetails.json';
import CVProjects from '@public/locales/en/CVProjects.json';
import CVsHeader from '@public/locales/en/CVsHeader.json';
import cvsNotifications from '@public/locales/en/cvsNotifications.json';
import CVsTable from '@public/locales/en/CVsTable.json';
import languages from '@public/locales/en/languages.json';
import SearchInput from '@public/locales/en/SearchInput.json';
import Settings from '@public/locales/en/Settings.json';
import skills from '@public/locales/en/skills.json';
import users from '@public/locales/en/users.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
      Aside: typeof Aside;
      Settings: typeof Settings;
      SearchInput: typeof SearchInput;
      users: typeof users;
      languages: typeof languages;
      skills: typeof skills;
      CVsTable: typeof CVsTable;
      CVsHeader: typeof CVsHeader;
      CVDetails: typeof CVDetails;
      CVProjects: typeof CVProjects;
      cvsNotifications: typeof cvsNotifications;
    };
  }
}
