import { Button } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledAddCvProjectButton = styled(Button)`
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
  border-radius: 40px;

  &:hover {
    background-color: rgba(198, 48, 49, 0.04);
  }
`;
