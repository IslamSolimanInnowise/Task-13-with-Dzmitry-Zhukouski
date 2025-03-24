import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import CVsHeader from '@entities/ui/CVsHeader';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import CVPreview from '@widgets/ui/cvs/CVPreview';

import {
  StyledCvPreviewContainer,
  StyledPageContainer,
} from './cvpreview.styles';

type CVPreviewPageProps = {
  cvId: string;
};

const CVPreviewPage: React.FC<CVPreviewPageProps> = ({ cvId }) => {
  const { data: cvData, loading } = useGetCvById(cvId);

  if (loading)
    return (
      <StyledPageContainer>
        <Aside />
        <StyledCvPreviewContainer>
          <Spinner />
        </StyledCvPreviewContainer>
      </StyledPageContainer>
    );

  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvPreviewContainer>
        <Container p="16px 0 0 20px">
          <Breadcrumb
            currentLink="Preview"
            breadCrumbItems={[
              { name: 'CVs', path: '/cvs' },
              {
                name: cvData.cv.name,
                path: '/cvs/$cvId/details',
                params: { cvId },
              },
            ]}
          />
        </Container>
        <CVsHeader />
        <CVPreview cvId={cvId} />
      </StyledCvPreviewContainer>
    </StyledPageContainer>
  );
};
export default CVPreviewPage;
