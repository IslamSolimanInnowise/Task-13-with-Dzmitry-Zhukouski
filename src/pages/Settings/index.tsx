import Aside from '@entities/ui/Aside';
import Select from '@entities/ui/Select';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  SelectsContainer,
  SettingsContainer,
  StyledPageContainer,
} from './settings.styles';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation('Settings');

  const themesList = [
    { id: 'light', name: t('light') },
    { id: 'dark', name: t('dark') },
  ];

  const LanguagesList = [
    { id: 'en', name: t('english') },
    { id: 'ru', name: t('russian') },
  ];

  const [selectedTheme, setSelectedTheme] = useState(themesList[0].id);
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || 'en',
  );

  useEffect(() => {
    setSelectedLanguage(i18n.language || 'en');
  }, [i18n.language]);

  const handleThemeChange = (value: string) => setSelectedTheme(value);
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <StyledPageContainer>
      <Aside />
      <SettingsContainer>
        <SelectsContainer>
          <Select
            label={t('appearance')}
            placeholderText={t('appearance')}
            itemsList={themesList}
            value={selectedTheme}
            onChange={handleThemeChange}
          />
          <Select
            label={t('language')}
            placeholderText={t('language')}
            itemsList={LanguagesList}
            value={selectedLanguage}
            onChange={handleLanguageChange}
          />
        </SelectsContainer>
      </SettingsContainer>
    </StyledPageContainer>
  );
};
export default SettingsPage;
