import { Icon, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('cvProjects');
  const [openUpdatevProjectDialog] = useCvProjectDialog();
  const [openRemoveCvProjectDialog] = useDeleteCvProjectDialog();

  const updatingCvProject = cvProjects.find(
    (p: TableCV) => p.name === projectName,
  );

  const updatingFormValues = {
    id: updatingCvProject?.projectId || '',
    domain: updatingCvProject?.domain || '',
    start_date: updatingCvProject?.start_date || '',
    end_date: updatingCvProject?.end_date
      ? new Date().toISOString().split('T')[0]
      : updatingCvProject?.end_date || '',
    description: updatingCvProject?.description || '',
    responsibilities: updatingCvProject?.responsibilities?.join(', ') || '',
  };

  const handleUpdateCvClick = () => {
    openUpdatevProjectDialog({
      cvId,
      cvProjects,
      title: t('cvProjectDialog.title', {
        context: 'updatingMode',
      }),
      submitText: t('cvProjectDialog.confirmButtonText', {
        context: 'updatingMode',
      }),
      updatingMode: true,
      updatingCvProject,
      updatingFormValues,
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
            <Text>{t('moreButton.updateButtonText')}</Text>
          </StyledMenuButton>
        </MenuItem>
        <MenuItem asChild value="delete-cv">
          <StyledMenuButton onClick={handleDeleteCvClick}>
            <Text>{t('moreButton.deleteButtonText')}</Text>
          </StyledMenuButton>
        </MenuItem>
      </StyledMenuContent>
    </MenuRoot>
  );
};

export default MoreButton;
