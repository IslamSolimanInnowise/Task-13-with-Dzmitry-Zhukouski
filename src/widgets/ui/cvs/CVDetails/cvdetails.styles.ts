import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledForm = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const StyledInput = styled(Input)`
  padding: 0.75rem;
  background-color: transparent;
  width: 100%;
  border-width: 1.5px;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
`;

export const StyledTextArea = styled(Textarea)`
  padding: 0.75rem;
  background-color: transparent;
  width: 100%;
  border-width: 1.5px;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
`;

export const UpdateButton = styled(Button)`
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  transition: 0.3s;
  width: 7rem;
  align-self: flex-end;

  &:hover {
    background-color: ${({ theme }) => theme.darkPrimaryColor};
  }
`;
