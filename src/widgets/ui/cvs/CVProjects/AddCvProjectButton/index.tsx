import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import { StyledAddCvProjectButton } from './addCvProjectButton';
import useCreateCvProjectDialog from './CreateCvProjectDialog';

type AddCvProjectButtonProps = {
  cvId: string;
  cvProjectIds: string[];
};

const AddCvProjectButton = ({ cvId, cvProjectIds }: AddCvProjectButtonProps) => {
  const [openCreateCvProjectDialog] = useCreateCvProjectDialog();

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      onClick={() =>
        openCreateCvProjectDialog({
          cvId,
          cvProjectIds,
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
