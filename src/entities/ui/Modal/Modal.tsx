import { Dialog, Portal } from '@chakra-ui/react';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './modal.styles';

interface ModalProps {
  open?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'cover' | 'full';
  onOpenChange?: (e: { open: boolean }) => void;
  titleText?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  confirmText: string;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  titleText,
  trigger,
  children,
  confirmText,
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
                <CancelButton variant="outline">Cancel</CancelButton>
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
