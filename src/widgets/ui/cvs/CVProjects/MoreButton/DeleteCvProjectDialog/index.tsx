import { Dialog, Portal } from '@chakra-ui/react';
import useRemoveCvProject from '@features/hooks/cvs/useRemoveCvProject';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';

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
  const [removeCvProject, { loading }] = useRemoveCvProject(onClose, cvId);

  const onSubmit = () => {
    removeCvProject({ variables: { project: { cvId, projectId } } });
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
                Remove project
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              Are you sure you want to remove project{' '}
              <strong>{projectName}?</strong>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton onClick={onSubmit} disabled={loading}>
                Confirm
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
