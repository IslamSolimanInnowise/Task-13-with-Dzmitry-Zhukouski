import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import useCvProjectDialog from '../CvProjectDialog';
import { TableCV } from '../index.d';
import { StyledAddCvProjectButton } from './addCvProjectButton';

type AddCvProjectButtonProps = {
  cvId: string;
  cvProjects: TableCV[];
};

const AddCvProjectButton = ({ cvId, cvProjects }: AddCvProjectButtonProps) => {
  const { t } = useTranslation('cvProjects');
  const [openCreateCvProjectDialog] = useCvProjectDialog();

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      onClick={() =>
        openCreateCvProjectDialog({
          cvId,
          cvProjects,
          title: t('cvProjectDialog.title'),
          submitText: t('cvProjectDialog.confirmButtonText'),
          onConfirm: () => {},
        })
      }
    >
      <Icon as={Plus} w={5} h={5} />
      {t('addCvProjectButtonText')}
    </StyledAddCvProjectButton>
  );
};

export default AddCvProjectButton;
