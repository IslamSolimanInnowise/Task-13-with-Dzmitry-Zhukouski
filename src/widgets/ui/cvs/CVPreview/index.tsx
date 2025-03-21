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
  return (
    <CVPreviewContainer>
      <TopicTitleContainer>
        <TopicTitle></TopicTitle>
        <ExportPdfButton variant="ghost">Export pdf</ExportPdfButton>
      </TopicTitleContainer>
      <Overview />
      <Projects />
      <ProfessionalSkills />
    </CVPreviewContainer>
  );
};

export default CVPreview;
