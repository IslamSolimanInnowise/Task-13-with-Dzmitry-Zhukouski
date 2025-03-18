import { Dialog, DialogRootProps, Portal } from '@chakra-ui/react';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './modal.styles';

interface ModalProps extends DialogRootProps {
  titleText?: string;
  trigger?: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  titleText,
  trigger,
  children,
  confirmText,
  cancelText,
  onConfirm,
  size,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      placement="center"
      size={size}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <ModalContent>
            {titleText && (
              <ModalHeader>
                <Dialog.Title>{titleText}</Dialog.Title>

                <Dialog.CloseTrigger asChild>
                  <StyledCloseButton />
                </Dialog.CloseTrigger>
              </ModalHeader>
            )}
            <Dialog.Body>{children}</Dialog.Body>
            <ModalFooter>
              <Dialog.ActionTrigger asChild>
                <CancelButton variant="outline">{cancelText}</CancelButton>
              </Dialog.ActionTrigger>
              <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
