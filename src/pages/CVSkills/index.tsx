import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';
import CVSkills from '@widgets/ui/cvs/CVSkills';

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
        <CVSkills cvId={cvId} />
      </StyledCvSkillsContainer>
    </StyledPageContainer>
  );
};
export default CVSkillsPage;
