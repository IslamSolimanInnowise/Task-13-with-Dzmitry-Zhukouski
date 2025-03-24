import Aside from '@entities/ui/Aside';
import { authVar } from '@shared/store/globalAuthState';
import SkillsWidget from '@widgets/ui/users/profile/SkillsWidget';
import { useTranslation } from 'react-i18next';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './skills.styles';

const SkillsPage: React.FC = () => {
  const { t } = useTranslation('users');
  const { id } = authVar();

  return (
    <StyledPageContainer>
      <Aside />
      <StyledPageContent>
        <Styledh2>{t('skills.pageHeading')}</Styledh2>
        <SkillsWidget userId={id!} />
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default SkillsPage;
