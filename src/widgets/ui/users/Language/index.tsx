import { Button, HStack } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import useDeleteLanguage from '@features/hooks/users/useDeleteLanguage';
import { authVar } from '@shared/store/globalAuthState';
import UpdateLanguageModal from '@widgets/ui/users/UpdateLanguageModal';
import { useTranslation } from 'react-i18next';

import { Language as LanguageInterface } from '../types';

interface LanguageProps extends LanguageInterface {
  proficiencyLevels: string[];
  userId: string;
}

const Language: React.FC<LanguageProps> = ({
  proficiencyLevels,
  proficiency,
  name,
  userId,
}) => {
  const { t } = useTranslation('users');
  const { id } = authVar();

  const levelIndex = proficiencyLevels.findIndex(
    (option) => option === proficiency,
  );
  const levelProgressValue =
    (levelIndex + 1) * (100 / proficiencyLevels.length);

  const colorPalette =
    levelProgressValue < 29
      ? 'yellow'
      : levelProgressValue < 58
        ? 'green'
        : levelProgressValue < 86
          ? 'red'
          : 'purple';

  const [deleteLanguage] = useDeleteLanguage();

  const handleDeleteLanguage = () => {
    deleteLanguage({
      variables: {
        language: {
          userId,
          name,
        },
      },
    });
  };

  return (
    <Progress.Root value={levelProgressValue} colorPalette={colorPalette}>
      <HStack gap="8">
        <Progress.Label>
          {name} - {proficiency}
        </Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        {id === userId && (
          <>
            <UpdateLanguageModal
              name={name}
              proficiency={proficiency}
              userId={userId}
              proficiencyLevels={proficiencyLevels}
            />
            <Button px="2" onClick={handleDeleteLanguage}>
              {t('languages.language.deleteButton')}
            </Button>
          </>
        )}
      </HStack>
    </Progress.Root>
  );
};
export default Language;
