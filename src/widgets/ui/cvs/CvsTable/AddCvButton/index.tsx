import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import { StyledAddCvButton } from './addCvButton.styles';
import useCreateCvDialog from './CreateCvDialog';

const AddCvButton = () => {
  const [openCreateCvDialog] = useCreateCvDialog();

  return (
    <StyledAddCvButton
      variant="ghost"
      onClick={() =>
        openCreateCvDialog({
          onConfirm: () => {},
        })
      }
    >
      <Icon as={Plus} w={5} h={5} />
      Create CV
    </StyledAddCvButton>
  );
};

export default AddCvButton;
