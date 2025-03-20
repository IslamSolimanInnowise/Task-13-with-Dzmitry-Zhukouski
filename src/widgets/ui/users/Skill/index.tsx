import { Button, HStack, Progress } from '@chakra-ui/react';
import useDeleteSkill from '@features/hooks/users/useDeleteSkill';
import { useTranslation } from 'react-i18next';

import { type Skill as SkillInterface } from '../types';
import UpdateSkillModal from '../UpdateSkillModal';

interface SkillProps {
  name: string;
  mastery: string;
  userId: string;
  categories: {
    skillCategories: SkillInterface[];
  };
  masteryOptions: string[];
}

const Skill: React.FC<SkillProps> = ({
  name,
  mastery,
  userId,
  masteryOptions,
  categories,
}) => {
  const { t } = useTranslation('users');
  const [deleteSkill] = useDeleteSkill();

  const masteryIndex = masteryOptions.findIndex((option) => option === mastery);
  const masteryValue = (masteryIndex + 1) * 20;
  const colorPalette =
    masteryValue === 20
      ? 'gray'
      : masteryValue === 40
        ? 'blue'
        : masteryValue === 60
          ? 'green'
          : masteryValue === 80
            ? 'yellow'
            : 'red';

  const categoryId = categories?.skillCategories?.find(
    (category: { name: string }) => category.name === name,
  )?.id;

  const handleDeleteSkill = () => {
    deleteSkill({
      variables: {
        skill: {
          userId,
          name,
        },
      },
    });
  };

  return (
    <Progress.Root value={masteryValue} colorPalette={colorPalette}>
      <HStack gap="8">
        <Progress.Label>{name}</Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <UpdateSkillModal
          userId={userId}
          masteryOptions={masteryOptions}
          name={name}
          oldMastery={mastery}
          categoryId={categoryId!}
        />
        <Button onClick={handleDeleteSkill} px="2">
          {t('skills.skill.deleteButton')}
        </Button>
      </HStack>
    </Progress.Root>
  );
};

export default Skill;
