import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/react';
import styled from 'styled-components';

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

export const StyledInput = styled(Input)`
  padding: 0.25rem;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.color};
  width: 100%;
  border-radius: 0.25rem;
`;

export const StyledErrorP = styled.p`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export const StyledSubmitButton = styled(Button)`
  background: ${({ theme }) => theme.primaryColor};
  border-radius: 40px;
  width: 220px;
  margin: 1rem auto;
  display: block;
`;

export const StyledLink = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-align: center;
`;
