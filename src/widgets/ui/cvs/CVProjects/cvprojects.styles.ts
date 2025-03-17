import { Box, Button, Span, Table, Text } from '@chakra-ui/react';
import { ArrowUp } from 'lucide-react';
import styled from 'styled-components';

export const StyledTableContainer = styled(Table.ScrollArea)`
  grid-area: page;
  height: 85vh;
  overflow: auto;
  margin: 1rem 0 1rem 1.5rem;
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

export const StyledTableTopHeaderCell = styled(Table.Cell)`
  flex: 1;
  border-width: 0;
`;

export const StyledTableBottomHeaderCell = styled(Table.Cell)<{
  $isFirst: boolean;
  $isActions: boolean;
}>`
  padding: ${(props) => (props.$isFirst ? '8px 8px 8px 20px' : '8px')};
  flex: ${(props) => (props.$isActions ? '0 0 50px' : '1')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  min-width: 100px;
`;

export const StyledTableNoContentCell = styled(Table.Cell)`
  padding: 128px 8px 8px 20px;
  flex: 1;
  border-width: 0;
  font-size: 1.5rem;
  text-align: center;
`;

export const StyledTableContentCell = styled(Table.Cell)<{
  $isFirst: boolean;
  $isActions: boolean;
}>`
  padding: ${(props) => (props.$isFirst ? '8px 8px 8px 20px' : '8px')};
  flex: ${(props) => (props.$isActions ? '0 0 50px' : '1')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  min-width: 100px;
  border-width: 0;
`;

export const StyledTableContentDescriptionCell = styled(Table.Cell)`
  padding: 8px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 100px;
  color: ${({ theme }) => theme.grey};
`;

export const StyledTableContentDescriptionText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  word-wrap: break-word;
  color: ${({ theme }) => theme.grey};
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const StyledTableContentResponsibilitiesTextContainer = styled(Box)`
  max-width: 300px;
  font-size: 0.8125rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  color: rgb(46, 46, 46);
  background-color: rgba(0, 0, 0, 0.08);
  cursor: unset;
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: 16px;
  white-space: nowrap;
  transition:
    background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: 0px;
  text-decoration: none;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  padding: 0px;
`;

export const StyledTableContentResponsibilitiesText = styled(Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
`;

export const StyledTableBodyRow = styled(Table.Row)`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor};
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
