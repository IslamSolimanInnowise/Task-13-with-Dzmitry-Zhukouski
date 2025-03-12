import { Button, CloseButton, Dialog } from '@chakra-ui/react';
import styled from 'styled-components';

export const ModalContent = styled(Dialog.Content)`
  padding: 1rem;
  position: relative;
`;

export const ModalHeader = styled(Dialog.Header)`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalFooter = styled(Dialog.Footer)`
  margin-top: 1rem;
`;

export const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: 0.3s;
  width: 7rem;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: 0.3s;
  width: 7rem;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const StyledCloseButton = styled(CloseButton)`
  cursor: pointer;
  user-select: none;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
