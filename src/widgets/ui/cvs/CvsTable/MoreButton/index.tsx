import { Icon, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';

import useDeleteCvDialog from './DeleteCvDialog';
import {
  StyledMenuButton,
  StyledMenuContent,
  StyledMoreButton,
} from './moreButton.styles';

type MoreButtonProps = {
  name: string;
};

const MoreButton = ({ name }: MoreButtonProps) => {
  const [openDeleteCvDialog] = useDeleteCvDialog();

  const handleDeleteCvClick = () => {
    openDeleteCvDialog({
      name,
      onConfirm: () => {
        alert('Deleted CV');
      },
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
            <Text>Details</Text>
          </StyledMenuButton>
        </MenuItem>
        <MenuItem asChild value="delete-cv">
          <StyledMenuButton onClick={handleDeleteCvClick}>
            <Text>Delete CV</Text>
          </StyledMenuButton>
        </MenuItem>
      </StyledMenuContent>
    </MenuRoot>
  );
};

export default MoreButton;
