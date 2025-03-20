import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';

import {
  StyledCvSkillsContainer,
  StyledPageContainer,
} from './cvskills.styles';

type CVSkillsPageProps = {
  cvId: string;
};

const CVSkillsPage: React.FC<CVSkillsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvSkillsContainer>
        <CVsHeader />
        <span>Skills of cv: {cvId}</span>
      </StyledCvSkillsContainer>
    </StyledPageContainer>
  );
};
export default CVSkillsPage;
