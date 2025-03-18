import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';
import CVDetails from '@widgets/ui/cvs/CVDetails';

import { StyledPageContainer } from './cvdetails.styles';

type CVDetailsPageProps = {
  cvId: string;
};

const CVDetailsPage: React.FC<CVDetailsPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <Container p="0 1.5rem 0 1.5rem">
        <CVsHeader />
        <CVDetails cvId={cvId} />
      </Container>
    </StyledPageContainer>
  );
};
export default CVDetailsPage;
