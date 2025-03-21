import { useReactiveVar } from '@apollo/client';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import useGetSkills from '@features/hooks/users/useGetSkills';
import { authVar } from '@shared/store/globalAuthState';
import groupSkillsByCategory from '@shared/utils/groupSkillsByCaregory';
import { CvProject } from 'cv-graphql';

import {
  CVPreviewContainer,
  ExportPdfButton,
  TopicTitle,
  TopicTitleContainer,
} from './cvpreview.styles';
import Overview from './Overview';
import ProfessionalSkills from './ProfessionalSkills';
import Projects from './Projects';

type CVPreviewProps = {
  cvId: string;
};

const CVPreview: React.FC<CVPreviewProps> = ({ cvId }) => {
  const { data: CVdata, loading: isCvLoading } = useGetCvById(cvId);
  const { data: skills, loading: skillLoading } = useGetSkills();

  console.log(CVdata);

  const { id } = useReactiveVar(authVar);
  const isOwner = CVdata?.cv?.user?.id === id;

  const cvDomains: CvProject['domain'][] = Array.from(
    new Set(CVdata?.cv?.projects.map((p: CvProject) => p.domain)),
  );

  const structuredSkills = groupSkillsByCategory(
    CVdata?.cv?.skills || [],
    skills?.skills,
  );

  if (isCvLoading || skillLoading) return <Spinner />;

  return (
    <CVPreviewContainer>
      <TopicTitleContainer>
        <TopicTitle></TopicTitle>
        {isOwner && (
          <ExportPdfButton variant="ghost">Export pdf</ExportPdfButton>
        )}
      </TopicTitleContainer>
      <Overview
        education={CVdata?.cv?.education}
        languageProficiency={CVdata?.cv?.languages}
        domains={cvDomains}
        cvName={CVdata?.cv?.name}
        cvDescription={CVdata?.cv?.description}
        cvSkills={structuredSkills}
      />
      <Projects projects={CVdata?.cv?.projects} role={CVdata?.cv?.user?.position?.name} />
      <ProfessionalSkills />
    </CVPreviewContainer>
  );
};

export default CVPreview;
