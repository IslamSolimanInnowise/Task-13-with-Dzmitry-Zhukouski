import Spinner from '@entities/ui/Spinner';
import useGetLanguages from '@features/hooks/users/useGetLanguages';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import { Language as LanguageInterface } from '@widgets/ui/users/types';

import AddLanguageModal from '../AddLanguageModal';
import Language from '../Language';
import { LanguagesContainer } from './languagesWidget.styles';

interface LanguagesWidgetProps {
  userId: string;
}

const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

const LanguagesWidget: React.FC<LanguagesWidgetProps> = ({ userId }) => {
  const { id } = authVar();
  const { data, loading: userLoading } = useGetUser(userId);
  const userLanguages = data?.user.profile.languages;

  const { data: languages, loading: languageLoading } = useGetLanguages();

  const filteredLanguages = languages?.languages.filter(
    (language: LanguageInterface) => {
      return !userLanguages?.some((userLanguage: LanguageInterface) => {
        return userLanguage.name === language.name;
      });
    },
  );

  return languageLoading || userLoading ? (
    <Spinner />
  ) : (
    <>
      {userId === id && (
        <AddLanguageModal
          languages={filteredLanguages}
          userId={userId}
          proficiencyLevels={proficiencyLevels}
        />
      )}
      {userLanguages?.length !== 0 && (
        <LanguagesContainer>
          {userLanguages?.map((language: LanguageInterface) => {
            return (
              <Language
                {...language}
                key={language.name}
                proficiencyLevels={proficiencyLevels}
                userId={userId}
              />
            );
          })}
        </LanguagesContainer>
      )}
    </>
  );
};
export default LanguagesWidget;
