import { Container } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import CVsHeader from '@entities/ui/CVsHeader';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import CVProjects from '@widgets/ui/cvs/CVProjects';

import {
  StyledCvProjectsContainer,
  StyledPageContainer,
} from './cvprojects.styles';

type CVProjectsPageProps = {
  cvId: string;
};

const CVProjectsPage: React.FC<CVProjectsPageProps> = ({ cvId }) => {
  const { data: cvData, loading } = useGetCvById(cvId);

  if (loading)
    return (
      <StyledPageContainer>
        <Aside />
        <StyledCvProjectsContainer>
          <Spinner />
        </StyledCvProjectsContainer>
      </StyledPageContainer>
    );

  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvProjectsContainer>
        <Container p="16px 0 0 20px">
          <Breadcrumb
            currentLink="Projects"
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
        <CVProjects cvId={cvId} />
      </StyledCvProjectsContainer>
    </StyledPageContainer>
  );
};
export default CVProjectsPage;
