import { Dialog, Portal } from '@chakra-ui/react';
import useRemoveCvProject from '@features/hooks/cvs/useRemoveCvProject';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { notify } from '@shared/Notifications/notify';
import { useTranslation } from 'react-i18next';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './deleteCvProjectDialog.styled';

type DeleteCvProjectDialogProps = {
  cvId: string;
  projectId: string;
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteCvProjectDialog = ({
  cvId,
  projectId,
  projectName,
  onClose,
  onConfirm,
}: DeleteCvProjectDialogProps) => {
  const { t } = useTranslation('cvs');

  const [removeCvProject, { loading }] = useRemoveCvProject(cvId);

  const onSubmit = () => {
    removeCvProject({
      variables: { project: { cvId, projectId } },
      onCompleted: () => {
        notify({
          type: 'info',
          title: t('notifications.useRemoveCvProject.success'),
        });
        onClose();
      },
    });
    onConfirm();
  };

  return (
    <Portal>
      <Dialog.Root
        open={true}
        onOpenChange={(isOpen) => {
          onClose();
          return !isOpen;
        }}
        trapFocus={true}
        motionPreset="scale"
        placement="center"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <ModalContent>
            <ModalHeader>
              <Dialog.Title fontSize="lg" fontWeight="600">
                {t('projects.deleteCvProjectDialog.title')}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              {t('projects.deleteCvProjectDialog.subTitle')}
              <strong>{projectName}?</strong>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>
                {t('projects.deleteCvProjectDialog.cancelButtonText')}
              </CancelButton>
              <ConfirmButton onClick={onSubmit} disabled={loading}>
                {t('projects.deleteCvProjectDialog.confirmButtonText')}
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useDeleteCvProjectDialog = createDialogHook<DeleteCvProjectDialogProps>(
  (props) => <DeleteCvProjectDialog {...props} />,
);

export default useDeleteCvProjectDialog;
