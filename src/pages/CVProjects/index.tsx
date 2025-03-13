import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';

import { StyledPageContainer } from './cvprojects.styles';

type CVProjectsPageProps = {
  cvId: string;
}

const CVProjectsPage: React.FC<CVProjectsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <Container p="0 1.5rem 0 1.5rem">
        <CVsHeader />
        <span>Projects of cv: {cvId}</span>
      </Container>
    </StyledPageContainer>
  );
};
export default CVProjectsPage;
