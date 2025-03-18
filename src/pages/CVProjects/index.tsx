import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';
import CVProjects from '@widgets/ui/cvs/CVProjects';

import { StyledPageContainer } from './cvprojects.styles';

type CVProjectsPageProps = {
  cvId: string;
};

const CVProjectsPage: React.FC<CVProjectsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <Container p="0 0 0 1.5rem">
        <CVsHeader />
        <CVProjects cvId={cvId} />
      </Container>
    </StyledPageContainer>
  );
};
export default CVProjectsPage;
