import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';

import { StyledPageContainer } from './cvpreview.styles';

type CVPreviewPageProps = {
  cvId: string;
};

const CVPreviewPage: React.FC<CVPreviewPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <Container p="0 1.5rem 0 1.5rem">
        <CVsHeader />
        <span>Preview of cv: {cvId}</span>
      </Container>
    </StyledPageContainer>
  );
};
export default CVPreviewPage;
