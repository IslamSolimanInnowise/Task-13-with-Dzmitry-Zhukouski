import { useReactiveVar } from '@apollo/client';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import useGetSkills from '@features/hooks/users/useGetSkills';
import { pdf } from '@react-pdf/renderer';
import { notify } from '@shared/Notifications/notify';
import { authVar } from '@shared/store/globalAuthState';
import calculateSkillExperience from '@shared/utils/calculateSkillExperience';
import getSkillLastUsedYear from '@shared/utils/getSkillLastUsedYear';
import groupSkillsByCategory from '@shared/utils/groupSkillsByCaregory';
import { CvProject } from 'cv-graphql';
import { useState } from 'react';

import CVPdfDocument from './CVPdfDocument';
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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { data: CVdata, loading: isCvLoading } = useGetCvById(cvId);
  const { data: skills, loading: skillLoading } = useGetSkills();

  const { id } = useReactiveVar(authVar);
  const isOwner = CVdata?.cv?.user?.id === id;

  const cvDomains: CvProject['domain'][] = Array.from(
    new Set(CVdata?.cv?.projects.map((p: CvProject) => p.domain)),
  );

  const structuredSkills = groupSkillsByCategory(
    CVdata?.cv?.skills ?? [],
    skills?.skills,
  );

  const skillsTableData = structuredClone(structuredSkills).map((category) => ({
    ...category,
    skills: category.skills.map((skill) => {
      const name = skill.name ?? '';
      const projects = CVdata?.cv?.projects ?? [];

      return {
        ...skill,
        experienceYears: calculateSkillExperience(name, projects),
        lastUsed: getSkillLastUsedYear(name, projects),
      };
    }),
  }));

  const handleExportPdf = async () => {
    if (!CVdata?.cv) return;

    try {
      setIsGeneratingPdf(true);
      const pdfData = {
        ...CVdata.cv,
        domains: cvDomains,
        structuredSkills: structuredSkills,
        skillsTableData: skillsTableData,
      };

      const blob = await pdf(<CVPdfDocument cvData={pdfData} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${CVdata.cv.name || 'cv'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: unknown) {
      notify({
        type: 'error',
        title: 'Error generating PDF',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (isCvLoading || skillLoading) return <Spinner />;

  return (
    <CVPreviewContainer>
      <TopicTitleContainer>
        <TopicTitle></TopicTitle>
        {isOwner && (
          <ExportPdfButton
            variant="ghost"
            onClick={handleExportPdf}
            disabled={isGeneratingPdf}
          >
            Export pdf
          </ExportPdfButton>
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
      <Projects
        projects={CVdata?.cv?.projects}
        role={CVdata?.cv?.user?.position?.name}
      />
      <ProfessionalSkills skillsData={skillsTableData} />
    </CVPreviewContainer>
  );
};

export default CVPreview;
