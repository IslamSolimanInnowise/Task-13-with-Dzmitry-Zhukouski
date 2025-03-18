import 'i18next';

import auth from '@public/locales/en/auth.json';
import CVDetails from '@public/locales/en/CVDetails.json';
import CVProjects from '@public/locales/en/CVProjects.json';
import CVsHeader from '@public/locales/en/CVsHeader.json';
import cvsNotifications from '@public/locales/en/cvsNotifications.json';
import CVsTable from '@public/locales/en/CVsTable.json';
import languages from '@public/locales/en/languages.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
      languages: typeof languages;
      CVsTable: typeof CVsTable;
      CVsHeader: typeof CVsHeader;
      CVDetails: typeof CVDetails;
      CVProjects: typeof CVProjects;
      cvsNotifications: typeof cvsNotifications;
    };
  }
}
