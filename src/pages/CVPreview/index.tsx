import Aside from '@entities/ui/Aside';
import CVsHeader from '@entities/ui/CVsHeader';
import CVPreview from '@widgets/ui/cvs/CVPreview';

import {
  StyledCvPreviewContainer,
  StyledPageContainer,
} from './cvpreview.styles';

type CVPreviewPageProps = {
  cvId: string;
};

const CVPreviewPage: React.FC<CVPreviewPageProps> = ({ cvId }) => {
  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvPreviewContainer>
        <CVsHeader />
        <CVPreview cvId={cvId} />
      </StyledCvPreviewContainer>
    </StyledPageContainer>
  );
};
export default CVPreviewPage;
