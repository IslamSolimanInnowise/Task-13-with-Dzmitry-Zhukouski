import { Icon } from '@chakra-ui/react';
import { CvProject } from 'cv-graphql';
import { Plus } from 'lucide-react';

import useCvProjectDialog from '../CvProjectDialog';
import { StyledAddCvProjectButton } from './addCvProjectButton';

type AddCvProjectButtonProps = {
  cvId: string;
  cvProjects: CvProject[];
};

const AddCvProjectButton = ({ cvId, cvProjects }: AddCvProjectButtonProps) => {
  const [openCreateCvProjectDialog] = useCvProjectDialog();

  return (
    <StyledAddCvProjectButton
      variant="ghost"
      onClick={() =>
        openCreateCvProjectDialog({
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
