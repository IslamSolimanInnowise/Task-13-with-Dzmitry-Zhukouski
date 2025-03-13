import { ChevronRight } from 'lucide-react';
import styled from 'styled-components';

export const StyledIcon = styled(ChevronRight)`
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
  padding: 0.25rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;
