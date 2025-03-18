import { Icon, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';

import useCvProjectDialog from '../CvProjectDialog';
import { TableCV } from '../index.d';
import useDeleteCvProjectDialog from './DeleteCvProjectDialog';
import {
  StyledMenuButton,
  StyledMenuContent,
  StyledMoreButton,
} from './moreButton.styles';

type MoreButtonProps = {
  cvId: string;
  projectId: string;
  cvProjects: TableCV[];
  projectName: string;
};

const MoreButton = ({
  cvId,
  projectId,
  cvProjects,
  projectName,
}: MoreButtonProps) => {
  const [openUpdatevProjectDialog] = useCvProjectDialog();
  const [openRemoveCvProjectDialog] = useDeleteCvProjectDialog();

  const updatingCvProject = cvProjects.find(
    (p: TableCV) => p.name === projectName,
  );
  const handleUpdateCvClick = () => {
    openUpdatevProjectDialog({
      cvId,
      cvProjects,
      title: 'Update project',
      submitText: 'Update',
      updatingMode: true,
      updatingCvProject,
      onConfirm: () => {},
    });
  };

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
          <StyledMenuButton onClick={handleUpdateCvClick}>
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
