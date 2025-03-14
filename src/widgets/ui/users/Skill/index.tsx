import { Button, HStack, Progress } from '@chakra-ui/react';
import useDeleteSkill from '@features/hooks/users/useDeleteSkill';

interface SkillProps {
  name: string;
  mastery: string;
  userId: string;
}

const Skill: React.FC<SkillProps> = ({ name, mastery, userId }) => {
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
        <Button onClick={handleDeleteSkill}>Delete</Button>
      </HStack>
    </Progress.Root>
  );
};

const masteryOptions = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];

export default Skill;
