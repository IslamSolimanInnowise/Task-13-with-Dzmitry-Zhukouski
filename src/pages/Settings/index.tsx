import { useReactiveVar } from '@apollo/client';
import Aside from '@entities/ui/Aside';
import Select from '@entities/ui/Select';
import { setTheme, themeVar } from '@shared/store/globalAuthState';
import { useColorMode } from '@shared/ui/color-mode';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  SelectsContainer,
  SettingsContainer,
  StyledPageContainer,
} from './settings.styles';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation('settings');
  const { colorMode, setColorMode } = useColorMode();
  const currentTheme = useReactiveVar(themeVar);

  useEffect(() => {
    if (colorMode !== currentTheme) {
      setTheme(colorMode);
    }
  }, [colorMode, currentTheme]);

  const themesList = [
    { id: 'light', name: t('light') },
    { id: 'dark', name: t('dark') },
  ];

  const LanguagesList = [
    { id: 'en', name: t('english') },
    { id: 'ru', name: t('russian') },
    { id: 'ar', name: t('arabic') },
  ];

  const handleThemeChange = (value: string) => {
    const newTheme = value as 'light' | 'dark';
    setTheme(newTheme);
    setColorMode(newTheme);
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    document.documentElement.dir = i18n.dir(value);
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
            value={currentTheme}
            onChange={handleThemeChange}
          />
          <Select
            label={t('language')}
            placeholderText={t('language')}
            itemsList={LanguagesList}
            value={i18n.language || 'en'}
            onChange={handleLanguageChange}
          />
        </SelectsContainer>
      </SettingsContainer>
    </StyledPageContainer>
  );
};

export default SettingsPage;
