import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import { StyledAddCvProjectButton } from './addCvProjectButton';
// import useCreateCvDialog from './CreateCvDialog';

const AddCvProjectButton = () => {
  // const [openCreateCvDialog] = useCreateCvDialog();

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      // onClick={() =>
      //   openCreateCvDialog({
      //     onConfirm: () => {},
      //   })
      // }
    >
      <Icon as={Plus} w={5} h={5} />
      Add Project
    </StyledAddCvProjectButton>
  );
};

export default AddCvProjectButton;
