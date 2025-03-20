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
  const { t } = useTranslation('cvs');
  const [openCreateCvProjectDialog] = useCvProjectDialog();

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      onClick={() =>
        openCreateCvProjectDialog({
          cvId,
          cvProjects,
          title: t('projects.cvProjectDialog.title'),
          submitText: t('projects.cvProjectDialog.confirmButtonText'),
          onConfirm: () => {},
        })
      }
    >
      <Icon as={Plus} w={5} h={5} />
      {t('projects.addCvProjectButtonText')}
    </StyledAddCvProjectButton>
  );
};

export default AddCvProjectButton;
