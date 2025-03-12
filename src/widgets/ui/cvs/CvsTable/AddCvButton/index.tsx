import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import { StyledAddCvButton } from './addCvButton.styles';
import useCreateCvDialog from './CreateCvDialog';

const AddCvButton = () => {
  const [openCreateCvDialog] = useCreateCvDialog();

  const handleCreateCvClick = () => {
    openCreateCvDialog({
      onConfirm: () => {
        alert('Created CV');
      },
    });
  };

  return (
    <StyledAddCvButton variant="ghost" onClick={handleCreateCvClick}>
      <Icon as={Plus} w={5} h={5} />
      Create CV
    </StyledAddCvButton>
  );
};

export default AddCvButton;
