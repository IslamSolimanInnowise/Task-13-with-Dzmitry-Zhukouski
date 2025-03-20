import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';

import { StyledCvPreviewContainer, StyledPageContainer } from './cvpreview.styles';

type CVPreviewPageProps = {
  cvId: string;
};

const CVPreviewPage: React.FC<CVPreviewPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvPreviewContainer>
        <CVsHeader />
        <span>Preview of cv: {cvId}</span>
      </StyledCvPreviewContainer>
    </StyledPageContainer>
  );
};
export default CVPreviewPage;
