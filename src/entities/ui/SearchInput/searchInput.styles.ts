import { Box } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { InputGroup } from '@shared/ui/input-group';
import { Search } from 'lucide-react';
import styled from 'styled-components';

export const StyledSearchIcon = styled(Search)`
  margin-left: 6px;
  margin-right: 12px;
`;

export const StyledXIconBox = styled(Box)`
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  padding: 8px;
  border-radius: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.lightGrey};
  }
`;

export const StyledInputGroup = styled(InputGroup)`
  position: relative;
  width: 100%;
  max-width: 320px;
`;

export const StyledInput = styled(Input)`
  border-radius: 40px;
  padding: 12px 48px 12px 12px;
  text-overflow: ellipsis;
  transition: 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.color};
  }

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const StyledEndElementContainer = styled(Box)`
  width: 48px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
