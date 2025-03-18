import { Icon, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { EllipsisVertical } from 'lucide-react';

import useDeleteCvDialog from './DeleteCvDialog';
import {
  StyledMenuButton,
  StyledMenuContent,
  StyledMoreButton,
} from './moreButton.styles';

type MoreButtonProps = {
  id: string;
  name: string;
};

const MoreButton = ({ id, name }: MoreButtonProps) => {
  const [openDeleteCvDialog] = useDeleteCvDialog();

  const handleDeleteCvClick = () => {
    openDeleteCvDialog({
      id,
      name,
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
          <StyledMenuButton
            as={Link}
            to="/cvs/$cvId/details"
            params={{ cvId: id }}
          >
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
