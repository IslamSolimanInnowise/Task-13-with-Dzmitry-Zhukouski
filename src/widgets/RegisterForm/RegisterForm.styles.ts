import { Input, InputRightElement } from '@chakra-ui/input';
import { Button, IconButton } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

interface StyledInputProps {
  hasError?: boolean;
}

export const FormBox = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 560px;
  margin: 1rem auto;
`;

export const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

export const StyledP = styled.p`
  margin: 0.5rem auto 2rem;
  text-align: center;
`;

export const StyledInput = styled(Input)<StyledInputProps>`
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.primaryColor : theme.color)};
  width: 100%;
  border-radius: 0.25rem;
  transition: border-color 0.2s;
`;

export const StyledErrorP = styled.p`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export const StyledInputRightElement = styled(InputRightElement)`
  height: 100%;
`;

export const StyledEyeButton = styled(IconButton)`
  display: flex;
  justify-content: center;
`;

export const StyledSubmitButton = styled(Button)`
  background: ${({ theme }) => theme.primaryColor};
  border-radius: 40px;
  width: 220px;
  margin: 1rem auto;
  display: block;
`;

export const StyledLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-align: center;
`;
