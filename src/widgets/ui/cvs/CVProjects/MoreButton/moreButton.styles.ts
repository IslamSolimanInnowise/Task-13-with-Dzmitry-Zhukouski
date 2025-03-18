import { Button,  } from '@chakra-ui/react';
import { MenuContent } from '@shared/ui/menu';
import styled from 'styled-components';

export const StyledMoreButton = styled(Button)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;
  border-radius: 100%;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;

export const StyledMenuContent = styled(MenuContent)`
  width: fit-content;
  padding: 8px 0;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
    rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
`;

export const StyledMenuButton = styled(Button)`
  padding: 6px 16px;
  background-color: transparent;
  color: inherit;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;
