import { Icon, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';

// import useDeleteCvDialog from './DeleteCvDialog';
import {
  StyledMenuButton,
  StyledMenuContent,
  StyledMoreButton,
} from './moreButton.styles';

type MoreButtonProps = {
  id: string;
};

const MoreButton = ({ id }: MoreButtonProps) => {
  // const [openDeleteCvDialog] = useDeleteCvDialog();

  const handleDeleteCvClick = () => {
    // openDeleteCvDialog({
    //   id,
    //   name,
    //   onConfirm: () => {},
    // });
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
