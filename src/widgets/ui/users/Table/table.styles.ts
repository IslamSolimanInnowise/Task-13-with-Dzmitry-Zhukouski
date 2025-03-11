import { Box } from '@chakra-ui/react';
import { ArrowUp } from 'lucide-react';
import styled from 'styled-components';

export const StyledTable = styled(Box)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const TableHead = styled(Box)`
  height: 3.5rem;
  border-bottom: 1px solid lightgrey;
  padding: 0.5rem;
`;

export const TableHeadRow = styled(Box)`
  display: grid;
  grid-template-columns: 3rem 7rem 7rem 8rem 7rem 7rem 3rem;
  justify-content: space-between;
  height: 100%;
`;

export const TableHeadCell = styled(Box)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
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

export const TableBodyRow = styled(Box)`
  border-bottom: 1px solid lightgrey;
  padding: 1rem;
  min-height: 5rem;
  display: grid;
  grid-template-columns: 3rem 7rem 7rem 8rem 7rem 7rem 3rem;
  justify-content: space-between;
`;

export const TableBodyCell = styled(Box)`
  height: 100%;
`;
