import { Icon, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';

import useDeleteCvProjectDialog from './DeleteCvProjectDialog';
import {
  StyledMenuButton,
  StyledMenuContent,
  StyledMoreButton,
} from './moreButton.styles';

type MoreButtonProps = {
  cvId: string;
  projectId: string;
  projectName: string;
};

const MoreButton = ({ cvId, projectId, projectName }: MoreButtonProps) => {
  const [openRemoveCvProjectDialog] = useDeleteCvProjectDialog();

  const handleDeleteCvClick = () => {
    openRemoveCvProjectDialog({
      cvId,
      projectId,
      projectName,
      onConfirm: () => {},
    });
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <StyledMoreButton>
          <Icon as={EllipsisVertical} />
        </StyledMoreButton>
      </MenuTrigger>
      <StyledMenuContent>
        <MenuItem asChild value="cv">
          <StyledMenuButton>
            <Text>Update Project</Text>
          </StyledMenuButton>
        </MenuItem>
        <MenuItem asChild value="delete-cv">
          <StyledMenuButton onClick={handleDeleteCvClick}>
            <Text>Remove Project</Text>
          </StyledMenuButton>
        </MenuItem>
      </StyledMenuContent>
    </MenuRoot>
  );
};

export default MoreButton;
