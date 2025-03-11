import { Button } from '@chakra-ui/react';
import { MenuContent } from '@shared/ui/menu';
import { ArrowUp } from 'lucide-react';
import styled from 'styled-components';

export const StyledSortIcon = styled(ArrowUp)<{
  $isSorted: false | 'asc' | 'desc';
}>`
  opacity: ${(props) => (props.$isSorted ? 1 : 0.3)};
  transform: ${(props) => {
    if (!props.$isSorted) return 'rotate(90deg)';
    if (props.$isSorted === 'asc') return 'rotate(180deg)';
    return '';
  }};
  transition: 0.3s;
`;

export const StyledAddCvButton = styled(Button)`
  padding: 6px 8px;
  text-decoration: none;
  float: right;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryColor};
  min-width: 220px;
  height: 40px;
  outline: 0;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 40px;

  &:hover {
    background-color: rgba(198, 48, 49, 0.04);
  }
`;
export const StyledSortButton = styled(Button)`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #000000;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
  &:active {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }

  &:hover ${StyledSortIcon} {
    opacity: 1;
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
  gap: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledMoreButton = styled(Button)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
