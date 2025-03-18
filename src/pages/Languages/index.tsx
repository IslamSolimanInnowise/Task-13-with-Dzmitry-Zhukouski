import Aside from '@entities/ui/Aside';
import { SpinnerContainer } from '@entities/ui/Spinner/spinner.styles';
import useGetLanguages from '@features/hooks/users/useGetLanguages';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import AddLanguageModal from '@widgets/ui/users/AddLanguageModal';
import Language from '@widgets/ui/users/Language';
import { Language as LanguageInterface } from '@widgets/ui/users/types';

import {
  LanguagesContainer,
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './languages.styles';
import { useTranslation } from 'react-i18next';

const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

const LanguagesPage: React.FC = () => {
  const { t } = useTranslation('languages');
  const { id } = authVar();
  const { data, loading: userLoading } = useGetUser(id!);
  const userLanguages = data?.user.profile.languages;

  const { data: languages, loading: languageLoading } = useGetLanguages();

  const filteredLanguages = languages?.languages.filter(
    (language: LanguageInterface) => {
      return !userLanguages?.some((userLanguage: LanguageInterface) => {
        return userLanguage.name === language.name;
      });
    },
  );

  return (
    <StyledPageContainer>
      <Aside />
      {languageLoading || userLoading ? (
        <SpinnerContainer />
      ) : (
        <StyledPageContent>
          <Styledh2>{t('pageHeading')}</Styledh2>
          <AddLanguageModal
            languages={filteredLanguages}
            userId={id!}
            proficiencyLevels={proficiencyLevels}
          />
          {userLanguages?.length !== 0 && (
            <LanguagesContainer>
              {userLanguages?.map((language: LanguageInterface) => {
                return (
                  <Language
                    {...language}
                    key={language.name}
                    proficiencyLevels={proficiencyLevels}
                    userId={id!}
                  />
                );
              })}
            </LanguagesContainer>
          )}
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default LanguagesPage;
