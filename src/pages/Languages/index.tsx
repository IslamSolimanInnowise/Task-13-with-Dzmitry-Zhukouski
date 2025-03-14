import Aside from '@entities/ui/Aside';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import AddLanguageModal from '@widgets/ui/users/AddLanguageModal';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './languages.styles';

const LanguagesPage: React.FC = () => {
  const { id } = authVar();
  const { data } = useGetUser(id!);
  const userLanguages = data?.user.profile.languages;

  console.log(userLanguages);

  return (
    <StyledPageContainer>
      <Aside />
      <StyledPageContent>
        <Styledh2>Languages</Styledh2>
        <AddLanguageModal />
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default LanguagesPage;
