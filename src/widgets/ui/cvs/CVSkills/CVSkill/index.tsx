import { Button, HStack, Progress } from '@chakra-ui/react';
import { Cv, SkillMastery } from 'cv-graphql';
import { useTranslation } from 'react-i18next';

import useCVSkillDialog from '../CVSkillDialog';
import DeleteCvSkillDialog from './DeleteCvSkillDialog';

type CVSkillProps = {
  cvId: Cv['id'];
  skillMastery: SkillMastery;
  isOwner?: boolean;
};

const CVSkill: React.FC<CVSkillProps> = ({
  cvId,
  skillMastery,
  isOwner = false,
}) => {
  const { t } = useTranslation('cvs');

  const [openUpdateCVSkillDialog] = useCVSkillDialog();

  const [openDeleteCvSkillDialog] = DeleteCvSkillDialog();

  const masteryMapping: Record<string, { index: number; color: string }> = {
    Novice: { index: 0, color: 'gray' },
    Advanced: { index: 1, color: 'blue' },
    Competent: { index: 2, color: 'green' },
    Proficient: { index: 3, color: 'yellow' },
    Expert: { index: 4, color: 'red' },
  };

  const { index: masteryIndex, color: colorPalette } = masteryMapping[
    skillMastery.mastery
  ] || { index: 0, color: 'gray' };

  const masteryValue = (masteryIndex + 1) * 20;

  const handleUpdateSkill = () => {
    openUpdateCVSkillDialog({
      cvId,
      cvSkills: [skillMastery],
      updatingMode: true,
      onConfirm: () => {},
    });
  };

  const handleDeleteSkill = () => {
    openDeleteCvSkillDialog({
      cvId,
      skillName: skillMastery.name,
      onConfirm: () => {},
    });
  };

  return (
    <Progress.Root value={masteryValue} colorPalette={colorPalette} mt={4}>
      <HStack gap="4">
        <Progress.Label>{skillMastery.name}</Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        {isOwner && (
          <Button onClick={handleUpdateSkill} px="2">
            {t('skills.CVSkill.updateButtonText')}
          </Button>
        )}
        {isOwner && (
          <Button onClick={handleDeleteSkill} px="2">
            {t('skills.CVSkill.deleteButtonText')}
          </Button>
        )}
      </HStack>
    </Progress.Root>
  );
};

export default CVSkill;
