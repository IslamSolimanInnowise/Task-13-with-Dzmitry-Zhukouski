import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import { StyledAddCvProjectButton } from './addCvProjectButton';
import useCreateCvProjectDialog from './CreateCvProjectDialog';

type AddCvProjectButtonProps = {
  cvId: string;
};

const AddCvProjectButton = ({ cvId }: AddCvProjectButtonProps) => {
  const [openCreateCvProjectDialog] = useCreateCvProjectDialog(cvId);

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      onClick={() =>
        openCreateCvProjectDialog({
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
