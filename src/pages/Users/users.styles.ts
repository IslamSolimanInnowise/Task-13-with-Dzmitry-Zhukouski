import { Box } from '@chakra-ui/react';
import { ArrowUp, ChevronRight } from 'lucide-react';
import styled from 'styled-components';

export const StyledPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 'navigation page' 1fr / max-content 1fr;
`;

export const StyledPageContent = styled.main`
  padding: 1rem;
  height: 100vh;
  overflow: auto;
`;

export const Styledh2 = styled.h2`
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15px;
  text-align: left;
  text-transform: capitalize;
  margin-bottom: 0.75rem;
`;

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

export const StyledAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: auto;
`;

export const StyledChvronRight = styled(ChevronRight)`
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
  padding: 0.25rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: lightgrey;
  }
`;
