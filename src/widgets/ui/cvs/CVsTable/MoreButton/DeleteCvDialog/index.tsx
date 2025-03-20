import { Dialog, Portal } from '@chakra-ui/react';
import useDeleteCv from '@features/hooks/cvs/useDeleteCv';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { useTranslation } from 'react-i18next';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './deleteCvDialog.styled';

type DeleteCvDialogProps = {
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
}: DeleteCvDialogProps) => {
  const { t } = useTranslation('cvs');

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
                {t('table.deleteCvDialog.title')}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              {t('table.deleteCvDialog.subTitle')}
              <strong>{name}?</strong>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>
                {t('table.deleteCvDialog.cancelButtonText')}
              </CancelButton>
              <ConfirmButton onClick={onSubmit} disabled={loading}>
                {t('table.deleteCvDialog.confirmButtonText')}
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useDeleteCvDialog = createDialogHook<DeleteCvDialogProps>((props) => (
  <DeleteCvDialog {...props} />
));

export default useDeleteCvDialog;
