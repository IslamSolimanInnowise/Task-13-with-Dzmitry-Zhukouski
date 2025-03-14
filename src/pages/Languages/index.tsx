import Aside from '@entities/ui/Aside';
import { SpinnerContainer } from '@entities/ui/Spinner/spinner.styles';
import useGetLanguages from '@features/hooks/users/useGetLanguages';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import AddLanguageModal from '@widgets/ui/users/AddLanguageModal';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './languages.styles';

interface Language {
  name: string;
}

const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

const LanguagesPage: React.FC = () => {
  const { id } = authVar();
  const { data } = useGetUser(id!);
  const userLanguages = data?.user.profile.languages;

  const { data: languages, loading: languageLoading } = useGetLanguages();

  const filteredLanguages = languages?.languages.filter(
    (language: Language) => {
      return !userLanguages?.some((userLanguage: Language) => {
        return userLanguage.name === language.name;
      });
    },
  );

  console.log(userLanguages, filteredLanguages);

  return (
    <StyledPageContainer>
      <Aside />
      {languageLoading ? (
        <SpinnerContainer />
      ) : (
        <StyledPageContent>
          <Styledh2>Languages</Styledh2>
          <AddLanguageModal
            languages={filteredLanguages}
            userId={id!}
            proficiencyLevels={proficiencyLevels}
          />
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default LanguagesPage;
