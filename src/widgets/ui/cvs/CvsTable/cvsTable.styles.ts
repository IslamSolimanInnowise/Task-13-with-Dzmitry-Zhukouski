import { Button, Table } from '@chakra-ui/react';
import { MenuContent } from '@shared/ui/menu';
import { ArrowUp } from 'lucide-react';
import styled from 'styled-components';

export const StyledTableContainer = styled(Table.ScrollArea)`
  grid-area: page;
  height: 100vh;
  overflow: auto;
  padding-left: 24px;
`;

export const StyledTableHeader = styled(Table.Header)`
  z-index: 5;
  position: sticky;
  top: 0;
`;

export const StyledTableHeaderRow = styled(Table.Row)`
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;

  &:nth-child(1) {
    padding: 8px 20px;
  }
`;

export const StyledTableHeaderCell = styled(Table.Cell)`
  flex: 1;
  border-width: 0;
`;

export const StyledTableContentCell = styled(Table.Cell)<{
  $isFirst: boolean;
  $isActions: boolean;
}>`
  padding: ${(props) => (props.$isFirst ? '8px 8px 8px 20px' : '8px')};
  flex: ${(props) => (props.$isActions ? '0 0 50px' : '1')};
  border-bottom: ${({ theme }) => `1px solid ${theme.backgroundColor}`};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  min-width: 100px;
`;
export const StyledTableBodyRow = styled(Table.Row)`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  background-color: #f5f5f7;
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
  appearance: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryColor};
  min-width: 220px;
  height: 40px;
  outline: 0;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: rgba(198, 48, 49, 0.04);
  }
`;

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

export const StyledSortButton = styled(Button)`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: inherit;
  background-color: transparent;

  &:hover ${StyledSortIcon} {
    opacity: 1;
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
    background-color: #f2f2f2;
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

  &:hover {
    background-color: #f2f2f2;
  }
`;
