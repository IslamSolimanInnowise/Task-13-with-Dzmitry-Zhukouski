import { Container, Spinner } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import Breadcrumb from '@entities/ui/Breadcrumb';
import CVsHeader from '@entities/ui/CVsHeader';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import CVSkills from '@widgets/ui/cvs/CVSkills';
import { useTranslation } from 'react-i18next';

import {
  StyledCvSkillsContainer,
  StyledPageContainer,
} from './cvskills.styles';

type CVSkillsPageProps = {
  cvId: string;
};

const CVSkillsPage: React.FC<CVSkillsPageProps> = ({ cvId }) => {
  const { t } = useTranslation('cvs');
  const { data: cvData, loading } = useGetCvById(cvId);

  if (loading)
    return (
      <StyledPageContainer>
        <Aside />
        <StyledCvSkillsContainer>
          <Spinner />
        </StyledCvSkillsContainer>
      </StyledPageContainer>
    );

  return (
    <StyledPageContainer>
      <Aside />
      <StyledCvSkillsContainer>
        <Container p="16px 0 0 20px">
          <Breadcrumb
            currentLink={t('cvsBreadcrumb.Skills')}
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
        <CVSkills cvId={cvId} />
      </StyledCvSkillsContainer>
    </StyledPageContainer>
  );
};
export default CVSkillsPage;
