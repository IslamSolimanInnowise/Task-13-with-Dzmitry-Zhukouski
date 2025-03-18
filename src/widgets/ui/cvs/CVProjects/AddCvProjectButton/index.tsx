import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import useCvProjectDialog from '../CvProjectDialog';
import { TableCV } from '../index.d';
import { StyledAddCvProjectButton } from './addCvProjectButton';

type AddCvProjectButtonProps = {
  cvId: string;
  cvProjects: TableCV[];
};

const AddCvProjectButton = ({ cvId, cvProjects }: AddCvProjectButtonProps) => {
  const [openCreateCvProjectDialog] = useCvProjectDialog();

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      onClick={() =>
        openCreateCvProjectDialog({
          title: 'Add project',
          submitText: 'Create & Add',
          cvId,
          cvProjects,
          onConfirm: () => {},
        })
      }
    >
      <Icon as={Plus} w={5} h={5} />
      Add Project
    </StyledAddCvProjectButton>
  );
};

export default AddCvProjectButton;
