import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';

import { StyledPageContainer } from './cvskills.styles';

type CVSkillsPageProps = {
  cvId: string;
}

const CVSkillsPage: React.FC<CVSkillsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <Container p="0 1.5rem 0 1.5rem">
        <CVsHeader />
        <span>Skills of cv: {cvId}</span>
      </Container>
    </StyledPageContainer>
  );
};
export default CVSkillsPage;
