import { Button } from '@chakra-ui/react';
import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import { authVar } from '@shared/store/globalAuthState';
import { Cv, SkillMastery } from 'cv-graphql';
import { useTranslation } from 'react-i18next';

import CVSkill from './CVSkill';
import useCVSkillDialog from './CVSkillDialog';
import { CVSkillsContainer } from './cvskills.styles';

type CVSkillsProps = {
  cvId: Cv['id'];
};

const CVSkills: React.FC<CVSkillsProps> = ({ cvId }) => {
  const { t } = useTranslation('cvs');

  const [openAddCVSkillDialog] = useCVSkillDialog();

  const { data: cvdata, loading: cvLoading } = useGetCvById(cvId);

  const { id } = authVar();
  const isOwner = cvdata?.cv?.user?.id === id;

  const handleAddCVSkillClick = () => {
    openAddCVSkillDialog({
      cvId,
      cvSkills: cvdata.cv?.skills,
      onConfirm: () => {},
    });
  };
  return (
    <>
      {isOwner && (
        <Button onClick={handleAddCVSkillClick} width="100%" mt={4}>
          {t('skills.addCVSkillButtonText')}
        </Button>
      )}
      {cvLoading ? (
        <Spinner />
      ) : (
        <CVSkillsContainer>
          {cvdata?.cv?.skills?.map((skillMastery: SkillMastery) => (
            <CVSkill
              key={skillMastery.categoryId}
              cvId={cvId}
              skillMastery={skillMastery}
              isOwner={isOwner}
            />
          ))}
        </CVSkillsContainer>
      )}
    </>
  );
};

export default CVSkills;
