import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import CVsHeader from '@entities/ui/CVsHeader';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import CVPreview from '@widgets/ui/cvs/CVPreview';
import { useTranslation } from 'react-i18next';

import {
  StyledCvPreviewContainer,
  StyledPageContainer,
} from './cvpreview.styles';

type CVPreviewPageProps = {
  cvId: string;
};

const CVPreviewPage: React.FC<CVPreviewPageProps> = ({ cvId }) => {
  const { t } = useTranslation('cvs');
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
            currentLink={t('cvsBreadcrumb.Preview')}
            breadCrumbItems={[
              { name: t('cvsBreadcrumb.CVs'), path: '/cvs' },
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
