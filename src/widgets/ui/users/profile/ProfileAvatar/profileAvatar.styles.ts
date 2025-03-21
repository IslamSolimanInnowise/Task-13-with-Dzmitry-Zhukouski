import { Avatar, Button, Field } from '@chakra-ui/react';
import styled from 'styled-components';

export const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledAvatarRoot = styled(Avatar.Root)`
  width: 7rem;
  height: 7rem;
`;

export const RemoveAvatarBtn = styled(Button)`
  padding: 0 0.5rem;
`;

export const StyledFieldLabel = styled(Field.Label)`
  background-color: black;
  margin: auto;
  color: ${({ theme }) => theme.backgroundColor};
  padding: 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.backgroundColor};
    opacity: 0.9;
  }
`;

export const StyledFileInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;
