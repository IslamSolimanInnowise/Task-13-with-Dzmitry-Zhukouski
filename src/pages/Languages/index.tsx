import Aside from '@entities/ui/Aside';
import { authVar } from '@shared/store/globalAuthState';
import LanguagesWidget from '@widgets/ui/users/profile/LanguagesWidget';
import { useTranslation } from 'react-i18next';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './languages.styles';

const LanguagesPage: React.FC = () => {
  const { t } = useTranslation('users');
  const { id } = authVar();

  return (
    <StyledPageContainer>
      <Aside />
      <StyledPageContent>
        <Styledh2>{t('languages.pageHeading')}</Styledh2>
        <LanguagesWidget userId={id!} />
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default LanguagesPage;
