import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';
import CVProjects from '@widgets/ui/cvs/CVProjects';

import {
  StyledCvProjectsContainer,
  StyledPageContainer,
} from './cvprojects.styles';

type CVProjectsPageProps = {
  cvId: string;
};

const CVProjectsPage: React.FC<CVProjectsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvProjectsContainer>
        <CVsHeader />
        <CVProjects cvId={cvId} />
      </StyledCvProjectsContainer>
    </StyledPageContainer>
  );
};
export default CVProjectsPage;
