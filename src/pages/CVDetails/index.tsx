import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import CVsHeader from '@entities/ui/CVsHeader';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import CVDetails from '@widgets/ui/cvs/CVDetails';
import { useTranslation } from 'react-i18next';

import {
  StyledCvDetailsContainer,
  StyledPageContainer,
} from './cvdetails.styles';

type CVDetailsPageProps = {
  cvId: string;
};

const CVDetailsPage: React.FC<CVDetailsPageProps> = ({ cvId }) => {
  const { t } = useTranslation('cvs');
  const { data: cvData, loading } = useGetCvById(cvId);

  if (loading)
    return (
      <StyledPageContainer>
        <Aside />
        <StyledCvDetailsContainer>
          <Spinner />
        </StyledCvDetailsContainer>
      </StyledPageContainer>
    );

  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvDetailsContainer>
        <Container p="16px 0 0 20px">
          <Breadcrumb
            currentLink={cvData.cv.name}
            breadCrumbItems={[{ name: t('cvsBreadcrumb.CVs'), path: '/cvs' }]}
          />
        </Container>
        <CVsHeader />
        <CVDetails cvId={cvId} />
      </StyledCvDetailsContainer>
    </StyledPageContainer>
  );
};
export default CVDetailsPage;
