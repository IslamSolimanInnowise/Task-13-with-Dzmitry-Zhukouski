import { Button, HStack, Progress } from '@chakra-ui/react';

interface SkillProps {
  name: string;
  mastery: string;
}

const Skill: React.FC<SkillProps> = ({ name, mastery }) => {
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

  return (
    <Progress.Root value={masteryValue} colorPalette={colorPalette}>
      <HStack gap="8">
        <Progress.Label>{name}</Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <Button>Delete</Button>
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
