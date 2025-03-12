import { Dialog, Portal } from '@chakra-ui/react';
import useDeleteCv from '@features/hooks/cvs/useDeleteCv';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './deleteCvDialog.styled';

type ConfirmationDialogProps = {
  id: string;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteCvDialog = ({
  id,
  name,
  onClose,
  onConfirm,
}: ConfirmationDialogProps) => {
  const [deleteCv, { loading }] = useDeleteCv(onClose);

  const onSubmit = () => {
    deleteCv({ variables: { cv: { cvId: id } } });
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
                Confirm Deletion
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              Are you sure you want to delete CV <strong>{name}?</strong>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton onClick={onSubmit} disabled={loading}>
                Delete
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useDeleteCvDialog = createDialogHook<ConfirmationDialogProps>((props) => (
  <DeleteCvDialog {...props} />
));

export default useDeleteCvDialog;
